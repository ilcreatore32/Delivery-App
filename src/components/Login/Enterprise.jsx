import React, { useContext } from "react";
import { useState } from "react";

/* Formik */
import { useFormik } from "formik";
import * as yup from "yup";

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
  Alert as MuiAlert,
  Tooltip,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
/* API */
import { Login as loginAdmin } from "../../api/Login";

/* Material UI Icons */
import CloseIcon from "@mui/icons-material/CloseTwoTone";
import StoreAccess from "@mui/icons-material/StoreRounded";

/* CSS */
import "./Login.css";
import logo from "../../assets/logo.png";

/* Components */
import Alert from "../Alert/Alert";

/* Context */
import { UserContext } from "../../context/UserContextT";
import Api from "../../config/axiosClient";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Minimum 4 characters")
    .required("Password is required"),
});

function Login({ shop }) {
  const [open, setOpen] = useState(false);
  const { setToken, setView_type } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const validateUser = async (token) => {
    if (!token) return;
    Api.defaults.headers.common["x-auth-token"] = token;
    try {
      let user = await Api.get("/auth");
      if (user && user.status === 200) {
        let { Usuario_Permisos } = user.data;
        if (Usuario_Permisos === "A") {
          setToken(token);
          setView_type("A");
          Alert.loginSuccess();
          handleClose();
        } else {
          Alert.loginError();
          delete Api.defaults.headers.common["x-auth-token"];
          setErrorMessage("No tiene permisos para acceder a esta sección");
        }
      } else {
        delete Api.defaults.headers.common["x-auth-token"];
        Alert.loginError();
      }
    } catch (error) {
      delete Api.defaults.headers.common["x-auth-token"];
      Alert.loginError();
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const auth = await loginAdmin(values);
      (await auth) ? validateUser(auth?.token) : Alert.loginError();
    },
  });

  return (
    <>
      <Snackbar
        open={errorMessage}
        autoHideDuration={6000}
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      >
        <MuiAlert severity="error" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
      <Tooltip title="Accesso de Tienda" arrow>
        <IconButton onClick={handleToggle} color="primary">
          <StoreAccess />
        </IconButton>
      </Tooltip>
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
                  <form onSubmit={formik.handleSubmit}>
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
                        id="email"
                        name="email"
                        value={formik.values.email}
                        placeholder="something@example.com"
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                      <TextField
                        label="Contraseña"
                        variant="filled"
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        placeholder="****"
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
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
                      <Button color="success" type="submit">
                        Acceder
                      </Button>
                    </Box>
                  </form>
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
