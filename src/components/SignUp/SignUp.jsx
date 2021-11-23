import React, { useState } from "react";

/* Formik */
import { useFormik } from "formik";
import * as yup from "yup";

/* API */
import { Login as loginPersonal } from "../../api/Login";

/* Material UI */
import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

/* Material UI Icons */
import CloseIcon from "@mui/icons-material/CloseTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";

/* CSS */
import "./SignUp.css";
import logo from "../../assets/logo.png";

const validationSchema = yup.object({
  person_id: yup
  .string("algo")
  .required("Complete este Campo"),
  type_id: yup
    .string("Enter your password")
    .min(4, "Minimum 4 characters")
    .required("Complete este Campo"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Complete este Campo"),
  password: yup
    .string("Enter your password")
    .min(4, "Minimum 4 characters")
    .required("Complete este Campo"),
  name: yup
    .string("Introduzca Nombre")
    .min(4, "Minimum 4 characters")
    .required("Complete este Campo"),
  lastname: yup
    .string("Introduzca su Apellido")
    .min(4, "Minimum 4 characters")
    .required("Complete este Campo"),
  file: yup.string("Enter your file"),
});

function SignUp() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  return (
    <>
      <Button onClick={handleToggle} variant="outlined" color="secondary">
        Sign Up
      </Button>
      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="md" scroll="paper">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <IconButton edge="start" onClick={handleClose} aria-label="Cerrar">
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogTitle align="center">
            <Box>
              <img alt="Logo" src={logo} className="logo" />
              <Typography variant="h4" component="h2">
                Welcome
              </Typography>
              <Typography variant="h6" component="h3">
                Please, Sign Up
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent dividers="paper">
            <DialogContentText tabIndex={-1}>
              <Box component="form" sx={{ margin: ".5rem 0" }}>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ margin: ".5rem 0" }}
                >
                  <Table>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label="Cédula"
                          variant="filled"
                          type="text"
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label="Nombre"
                          variant="filled"
                          type="text"
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label="Apellido"
                          variant="filled"
                          type="text"
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label="Correo Electronico"
                          variant="filled"
                          type="email"
                          fullWidth
                          value={formik.values.email}
                          placeholder="something@example.com"
                          onChange={formik.handleChange}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label="Contraseña"
                          variant="filled"
                          type="password"
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label="Confirmar Contraseña"
                          variant="filled"
                          type="email"
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContend: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle2" component="span">
                          Comprobante Documento de Identidad
                        </Typography>
                        <label htmlFor="file">
                          <Input
                            accept="image/*"
                            id="file"
                            type="file"
                            sx={{ display: "none" }}
                          />
                          <IconButton
                            aria-label="Subir Archivo"
                            component="span"
                          >
                            <UploadFileTwoToneIcon size="large" />
                          </IconButton>
                        </label>
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
              </Box>
              <Box className="signup-links">
                <Typography className="signup-link" variant="h4" component="h4">
                  Already registered ? <Button>Sign In Here</Button>
                </Typography>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(2, 1fr)",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Registrar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default SignUp;
