import { useContext, useState, useRef } from "react";

/* Formik */
import { useFormik } from "formik";
import * as yup from "yup";

/* API */
import { Login as loginPersonal } from "../../api/Login";
import { GetAuthenticatedUser } from "../../api/Get";

/* Context */
import { authContext } from "../../context/authContext";

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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
} from "@mui/material";

/* Material UI Icons */
import CloseIcon from "@mui/icons-material/CloseTwoTone";
import PersonalAccess from "@mui/icons-material/FaceRetouchingNaturalRounded";

/* Material UI Styles */
import { useTheme } from "@mui/material/styles";

/* CSS */
import "./Login.css";
import logo from "../../assets/logo.png";

/* Components */
import Alert from "../Alert/Alert";
import { UserContext } from "../../context/UserContextT";

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
  const [selectedView, setSelectedView] = useState("C")
  const theme = useTheme();
  const mode = useRef(theme.palette.mode);
/*   const AuthContext = useContext(authContext); */
  const { setToken, setView_type } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const auth = await loginPersonal(values);
      (await auth?.token) ? Alert.loginSuccess() : Alert.loginError();
      if (auth?.token) {
        setToken(auth.token);
        setView_type(selectedView);
        await handleClose();
      }
    },
  });


  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleViewTypeChange = (e) => {
    setSelectedView(e.target.value);
  }

  return (
    <>
      <Tooltip title="Acceso Personal" arrow>
        <IconButton onClick={handleToggle} color="primary">
          <PersonalAccess />
        </IconButton>
      </Tooltip>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <Grid
            component="form"
            className="login-component"
            onSubmit={formik.handleSubmit}
          >
            <Paper elevation={0} className={`paper-style ${mode}`}>
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <Typography variant="subtitle2" component="span">
                        ¿De Qué Forma Desea Ingresar?
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          value={selectedView}
                          name="radios"
                          onChange={handleViewTypeChange}
                          row
                          sx={{
                            display: "flex",
                            justifyContend: "center",
                          }}
                        >
                          <FormControlLabel
                            value="C"
                            control={<Radio />}
                            label="Cliente"
                          />
                          <FormControlLabel
                            value="T"
                            control={<Radio />}
                            label="Transportista"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
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
                      Don't have an account ? <Button>Sign Up Here</Button>
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Acceder</Button>
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