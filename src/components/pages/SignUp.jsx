import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signup, verifyRegistration } from "../../api";
import { startRegistration } from "@simplewebauthn/browser";
import { useNavigate } from "react-router-dom";
import { FormControl, Grid } from "@mui/material";
import SimpleSnackbar from "../Snackbar";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const navigate = useNavigate();
  const [toggleSnackbar, setToggleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const formSchema = z
    .object({
      email: z.string().regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
        message: "Email address in invalid",
      }),
      password: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          {
            message:
              "Password should contain 1 special character, 1 number ,1 uppercase letter, 1 lowercase letter and min 8 characters of length.",
          }
        ),
      isWebAuthnReg: z.boolean({ message: "Tick to register with Web Authn" }),
      name: z
        .string()
        .min(2, { message: "Name should contain atleast 2 characters" })
        .max(20, { message: "Name should not exceed more than 20 characters" }),
    })
    .required({ email: true, password: true });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isWebAuthnReg: false,
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const response = await signup(data);
      const { data: responseData } = response.data;
      if (!responseData.options) {
        return navigate("/signin");
      }
      const attResp = await startRegistration(responseData.options);
      const verifyRegResponse = await verifyRegistration({
        attResp,
        id: responseData.id,
      });
      const { data: verifyRegData } = verifyRegResponse.data;
      if (verifyRegData.verified) {
        return navigate("/signin");
      }
    } catch (error) {
      const { data } = error.response;
      handleSnackbar(data.message);
    }
  };

  const handleSnackbar = (message) => {
    if (!toggleSnackbar) {
      setSnackbarMessage(message);
    }
    setToggleSnackbar(!toggleSnackbar);
  };

  return (
    <>
      <Container component="main" sx={{ margin: "auto" }} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email ? errors.email.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password ? errors.password.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              {...register("name")}
              error={Boolean(errors.name)}
              helperText={errors.name ? errors.name.message : null}
            />
            <Controller
              name="isWebAuthnReg"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormControlLabel
                    // inputRef={register}
                    control={
                      <Checkbox
                        inputRef={field.ref}
                        checked={field.value}
                        onChange={field.onChange}
                        value="true"
                        color="primary"
                      />
                    }
                    label="Register also with Webauthn"
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
              Sign Up
            </Button>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <SimpleSnackbar
        handleSnackbar={handleSnackbar}
        toggleSnackbar={toggleSnackbar}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
