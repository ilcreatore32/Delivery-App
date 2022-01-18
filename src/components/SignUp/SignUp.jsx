import { useState } from "react";

/* Formik */
import { useFormik } from "formik";
import * as yup from "yup";

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
  Tooltip,
  MenuItem,
  Alert,
  CardMedia,
  Snackbar,
} from "@mui/material";

/* Material UI Icons */
import CloseIcon from "@mui/icons-material/CloseTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import CreateUser from "@mui/icons-material/AppRegistrationRounded";

/* CSS */
import "./SignUp.css";
import logo from "../../assets/logo.png";
import { LoadingButton } from "@mui/lab";
import { RegisterUser } from "../../api/Post";

const validationSchema = yup.object({
  type_id: yup
    .string("Ingrese el tipo de cédula")
    .required("Complete este Campo"),
  person_id: yup.number("Ingrese solo numeros").required("Complete este Campo"),
  name: yup
    .string("Introduzca Nombre")
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
      "Nombre Invalido"
    )
    .required("Complete este Campo"),
  lastname: yup
    .string("Introduzca su Apellido")
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
      "Apellido Invalido"
    )
    .required("Complete este Campo"),
  email: yup
    .string("Ingrese su email")
    .email("Ingrese un email valido")
    .required("Complete este Campo"),
  password: yup
    .string("Ingrese su contraseña")
    .min(4, "Mínimo 4 caracteres")
    .required("Complete este Campo"),
  passwordConfirm: yup
    .string("Confirme su contraseña")
    .min(4, "Mínimo 4 caracteres")
    .oneOf([yup.ref("password"), null], "Las contraseña deben coincidir")
    .required("Complete este Campo"),
  file: yup.string("Enter your file"),
});

function SignUp() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [file, setFile] = useState({});

  const handleToggle = () => {
    setOpen(!open);
  };

  const onFileChange = (e) => {
    if (e.target.files[0].size / 1024 / 1024 > 16) {
      setErrorMessage("La imagen es demasiado grande");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else {
      setFile(e.target.files[0]);
    }
  };
  const formik = useFormik({
    initialValues: {
      type_id: "",
      person_id: "",
      name: "",
      email: "",
      password: "",
      lastname: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSending(true);
      let form = new FormData();
      Object.keys(values).forEach((key) => form.append(key, values[key]));
      if (file["name"]){
        form.append("Persona_Archivo", file, file.name);
      }
      try {
        const response = await RegisterUser(form);
        if (response.status === 200) {
          setSuccessMessage("Usuario creado, puede iniciar sesión");
        } else if (response.response.status === 460) {
          setErrorMessage("Hay un usuario con esta cédula o correo");
        } else {
          setErrorMessage("Error al crear el usuario");
        }
        setSending(false);
      } catch (e) {
        if (e) {
          setErrorMessage(
            "Hubo un error al enviar los datos"
          );
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
          setSending(false);
        }
      }
    },
  });

  return (
    <>
      <Tooltip title="Registrar" arrow>
        <IconButton onClick={handleToggle} color="primary">
          <CreateUser />
        </IconButton>
      </Tooltip>
      <div>
        <Snackbar
          open={errorMessage}
          autoHideDuration={6000}
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        >
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={successMessage}
          autoHideDuration={6000}
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        >
          <Alert severity="success" onClose={() => setSuccessMessage("")}>
            {successMessage}
          </Alert>
        </Snackbar>
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
          <form onSubmit={formik.handleSubmit}>
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
                            id="type_id"
                            name="type_id"
                            select
                            label="Tipo"
                            value={formik.values.type_id}
                            onChange={formik.handleChange}
                            required
                            defaultValue=""
                            error={
                              formik.touched.type_id &&
                              Boolean(formik.errors.type_id)
                            }
                            helperText={
                              formik.touched.type_id && formik.errors.type_id
                            }
                            variant="filled"
                            sx={{ minWidth: 80, marginRight: 1 }}
                          >
                            {["V", "E", "J"].map((tipo) => (
                              <MenuItem key={tipo} value={tipo}>
                                {tipo}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            id="person_id"
                            name="person_id"
                            label="Cédula"
                            variant="filled"
                            type="number"
                            value={formik.values.person_id}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.person_id &&
                              Boolean(formik.errors.person_id)
                            }
                            helperText={
                              formik.touched.person_id &&
                              formik.errors.person_id
                            }
                            required
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="name"
                            name="name"
                            label="Nombre"
                            variant="filled"
                            type="text"
                            fullWidth
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.name && Boolean(formik.errors.name)
                            }
                            helperText={
                              formik.touched.name && formik.errors.name
                            }
                            required
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="lastname"
                            name="lastname"
                            label="Apellido"
                            variant="filled"
                            type="text"
                            fullWidth
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.lastname &&
                              Boolean(formik.errors.lastname)
                            }
                            helperText={
                              formik.touched.lastname && formik.errors.lastname
                            }
                            required
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="email"
                            name="email"
                            label="Correo Electronico"
                            variant="filled"
                            type="email"
                            fullWidth
                            value={formik.values.email}
                            placeholder="something@example.com"
                            onChange={formik.handleChange}
                            error={
                              formik.touched.email &&
                              Boolean(formik.errors.email)
                            }
                            helperText={
                              formik.touched.email && formik.errors.email
                            }
                            required
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="password"
                            name="password"
                            label="Contraseña"
                            variant="filled"
                            type="password"
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.password &&
                              Boolean(formik.errors.password)
                            }
                            helperText={
                              formik.touched.password && formik.errors.password
                            }
                            required
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="passwordConfirm"
                            name="passwordConfirm"
                            label="Confirmar Contraseña"
                            variant="filled"
                            type="password"
                            fullWidth
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.passwordConfirm &&
                              Boolean(formik.errors.passwordConfirm)
                            }
                            helperText={
                              formik.touched.passwordConfirm &&
                              formik.errors.passwordConfirm
                            }
                            required
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
                              id="file"
                              type="file"
                              onChange={onFileChange}
                              sx={{ display: "none" }}
                              inputProps={{
                                accept: "image/*",
                              }}
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
                      <TableRow>
                        <TableCell>
                          {file["name"] && (
                            <CardMedia
                              component="img"
                              height="140"
                              width="140"
                              {...(file.name && {
                                image: URL.createObjectURL(file),
                              })}
                              title="material"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </TableContainer>
                </Box>
                <Box className="signup-links">
                  <Typography
                    className="signup-link"
                    variant="h4"
                    component="h4"
                  >
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
              <Button onClick={handleClose}>Cancelar</Button>
              <LoadingButton loading={sending} type="submit">
                Guardar
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default SignUp;
