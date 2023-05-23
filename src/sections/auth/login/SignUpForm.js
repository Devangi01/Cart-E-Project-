import { useState } from 'react';
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

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };
  

  const handleChange = (event)=>{
   
   const name = event.target.name;
   const value = event.target.value;
   console.log(name,value);
    setMainState({...mainState,name :value})
  }

  return (
    <>
      <Stack spacing={3} sx={{mb:2}}>
        <TextField name="email" label="Email address" onChange={(e)=> handleChange(e)} value={mainState.email}/>

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
