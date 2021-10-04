import React from "react";
import { useState } from "react";

/* Material UI */
import {
  Grid,
  Paper,
  Typography,
  Backdrop,
  Button,
  TextField,
  Box,
  IconButton,
} from "@mui/material";

/* Material UI Icons */
import CloseIcon from "@mui/icons-material/CloseTwoTone";

/* CSS */
import "./Login.css";
import logo from "../../assets/logo.png";

function Login() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={handleToggle}>Sign In</Button>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <Grid className="login-component">
            <Paper elevation={0} className="paper-style">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className=""></div>
                <IconButton
                  edge="start"
                  color="error"
                  onClick={handleClose}
                  aria-label="Cerrar"
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <Grid align="center">
                <Box>
                  <img alt="Logo" src={logo} className="logo" />
                  <Typography variant="h4" component="h2">
                    Welcome
                  </Typography>
                </Box>
                <Grid>
                  <Typography variant="h6" component="h3">
                    Please, Sign In
                  </Typography>
                  <Box
                    className="login-inputs"
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: "repeat(2, 1fr)",
                    }}
                  >
                    <TextField
                      label="Correo Electronico"
                      variant="filled"
                      type="email"
                    />
                    <TextField
                      label="Contraseña"
                      variant="filled"
                      type="password"
                    />
                  </Box>
                  <Box className="login-links">
                    <Typography
                      className="login-link"
                      variant="h4"
                      component="h4"
                    >
                      Forgot Password ? <Button>Password Recover</Button>
                    </Typography>
                    <Typography
                      className="login-link"
                      variant="h4"
                      component="h4"
                    >
                      Don't have an account ?{" "}
                      <Button>Sign Up Here</Button>
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: "repeat(2, 1fr)",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button color="error" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button color="success">Acceder</Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Backdrop>
      </div>
    </>
  );
}

export default Login;
