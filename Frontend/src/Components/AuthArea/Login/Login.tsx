import { ThemeProvider } from "@emotion/react";
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
import { useLogin } from "../hooks/useLogin";
import "./Login.css";
import useTitle from "../../../Utils/UseTitle";

function Login(): JSX.Element {
    
  const { defaultTheme, handleSubmit, onSubmit, register } = useLogin();
   
  useTitle("Login")

  return (
    <div className="Login">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}></Avatar>
            <Typography color={"white"} component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                inputProps={{
                  minLength: 7,
                  maxLength: 55,
                  pattern:
                    "([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(.?[A-Za-z0-9]){2}.(com?|net|org)+(.[A-Za-z0-9]{2,4})?",
                }}
                required
                {...register("email")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                inputProps={{ minLength: 4, maxLength: 40 }}
                {...register("password")}
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
                  <Link href="/register">
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      sx={{ mt: 1, mb: 2 }}
                    >
                      Register
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

export default Login;
