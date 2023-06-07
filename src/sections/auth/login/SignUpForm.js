import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();

  const [mainState,setMainState] = useState({
    showPassword : false,
    showConfirmPassword: false,
    email:"",
    password:"",
    confirmpassword:""
  })

  const handleClick = async () => {
    
    try {
      const response = await axios.post(`/api/auth/signup`, {
        email: mainState.email,
        password: mainState.password
      });
      console.log(response)
      // saving the encodedToken in the localStorage
    
      if(response.status===201){
   
        localStorage.setItem("token", response.data.encodedToken);
        navigate('/login', { replace: true });
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleChange = (event)=>{
   

      const value = event.target.value;
     setMainState({...mainState, [event.target.name]:value})
  }

  return (
    <>
      <Stack spacing={3} sx={{mb:2}}>
        <TextField name="email" label="Email address" onChange={(event)=> handleChange(event)} value={mainState.email}/>

        <TextField
          name="password"
          label="Password"
          value={mainState.password}
          type={mainState.showPassword ? 'text' : 'password'}
          onChange={(e)=> handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setMainState({...mainState,showPassword:!mainState.showPassword})} edge="end">
                  <Iconify icon={mainState.showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirmpassword"
          label="Confrim Password"
          onChange={(e)=> handleChange(e)}
          value={mainState.confirmpassword}
          type={mainState.showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setMainState({...mainState,showConfirmPassword:!mainState.showConfirmPassword})} edge="end">
                  <Iconify icon={mainState.showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Sign Up
      </LoadingButton>
    </>
  );
}
