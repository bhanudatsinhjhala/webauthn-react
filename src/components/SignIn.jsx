import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, verifyAuthentication } from '../api';
import { useNavigate } from 'react-router-dom';
import { startAuthentication } from '@simplewebauthn/browser';
import SimpleSnackbar from './Snackbar';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [toggleSnackbar, setToggleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const formSchema = z.object({
    email: z.string().regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, { message: 'Email address in invalid'}),
    password: z.union([z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: 'Password should contain 1 special character, 1 number ,1 uppercase letter, 1 lowercase letter and min 8 characters of length.'}).nullish(), z.literal("")]),
    isLoginWithWebAuthn: z.boolean({message: 'Tick to register with Web Authn'}),
  }).required({ email: true});

  const { register, handleSubmit, control,  formState: {errors}} =useForm({ resolver: zodResolver(formSchema), defaultValues:{
    isLoginWithWebAuthn: false,
    email: "",
    password: ""
  }});
  


  const onSubmit = async (data) => {
      try{
        const response = await login(data);
        const { data: responseData } = response.data;
            if (data.password) {
              return navigate("/home")
            }
        const attResp = await startAuthentication(responseData.options);
  
        const verifyAuthOptions = await verifyAuthentication({
              attResp,
              id: response.data.data.id,
            });
            if(verifyAuthOptions.status === 200){
              navigate("/home")
            }
      }catch(error){
        const { data } = error.response;
        handleSnackbar(data.message);
      }

    
  };

  const handleSnackbar = (message) => {
    if(!toggleSnackbar){
      setSnackbarMessage(message);
    }
    setToggleSnackbar(!toggleSnackbar);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              error= {Boolean(errors.email)}
              helperText= { errors.email ? errors.email.message : null}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
              error= {Boolean(errors.password)}
              helperText= { errors.password ? errors.password.message : null}
            />
            <Controller
            name="isLoginWithWebAuthn"
        control={control}
        render={({ field }) => (
          <FormControl>

            <FormControlLabel
              control={<Checkbox 
              inputRef={field.ref}
              checked= {field.value}
              onChange={field.onChange}
               value="true" color="primary" />} 
              label="Login with web-authn"
            />
            </FormControl>
        )}
      />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <SimpleSnackbar snackbarMessage= {snackbarMessage} handleSnackbar = {handleSnackbar} toggleSnackbar={toggleSnackbar}/>
    </ThemeProvider>
  );
}