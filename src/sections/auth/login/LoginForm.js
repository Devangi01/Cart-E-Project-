import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';




// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [mainState, setMainState] = useState({
    email: "",
    password: "",
    showPassword: false,
  })
 

  const handleChange = (event) => {
    
   setMainState({...mainState, [event.target.name]: event.target.value})
  }
  const encodedToken = localStorage.getItem("token");
  console.log(encodedToken)
  const handleClick = async () => {
    
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: mainState.email,
        password: mainState.password,
        headers: {
          authorization: encodedToken, // passing token as an authorization header
        },
        
      });
      console.log(response)
      // saving the encodedToken in the localStorage
      // if(response.status){
      //   alert(response.status);
      //   localStorage.setItem("token", response.data.encodedToken);
       
      // }
      
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(event)=> handleChange(event)} value={mainState.email}/>

        <TextField
          name="password"
          label="Password"
          value= {mainState.password}
          onChange={(event)=> handleChange(event)}
          type={mainState.showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setMainState({...mainState, showPassword:!mainState.showPassword})} edge="end">
                  <Iconify icon={mainState.showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>


      <Stack direction="row" spacing={2}>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login as guest
      </LoadingButton>
  
</Stack>
    </>
  );
}
