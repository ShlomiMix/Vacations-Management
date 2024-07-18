import { ThemeProvider } from "@emotion/react";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRegister } from "../hooks/useRegister";
import "./Register.css";
import useTitle from "../../../Utils/UseTitle";

function Register(): JSX.Element {
    
  const { defaultTheme, handleSubmit, onSubmit, register } = useRegister();

  useTitle("Register")

  return (
    <div className="Register">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}></Avatar>
            <Typography component="h1" color={"white"} variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              width={400}
              height={425}
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    name="firstName"
                    fullWidth
                    label="First Name"
                    autoFocus
                    inputProps={{ minLength: 2, maxLength: 35 }}
                    {...register("firstName")}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    inputProps={{ minLength: 2, maxLength: 35 }}
                    {...register("lastName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputProps={{
                      endAdornment: <AlternateEmailRoundedIcon />,
                    }}
                    inputProps={{
                      minLength: 7,
                      maxLength: 55,
                      pattern:
                        "([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(.?[A-Za-z0-9]){2}.(com?|net|org)+(.[A-Za-z0-9]{2,4})?",
                    }}
                    {...register("email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: <VisibilityOffRoundedIcon />,
                    }}
                    inputProps={{ minLength: 4, maxLength: 40 }}
                    {...register("password")}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login">
                    <Button
                      color="secondary"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                    >
                      Login
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Register;
