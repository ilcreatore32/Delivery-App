import { useState, forwardRef, useContext, useEffect } from "react";

/* Material UI */
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Fade,
  Typography,
  TextField,
  Stack,
  Grid,
  MenuItem,
  Input,
  CardMedia,
  Collapse,
  Alert,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import Api from "../../../config/axiosClient";
import { PostPago } from "../../../api/Post";
import { userContext } from "../../../context/userContext";
import Spinner from "../../../components/Spinner/Spinner";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} />;
});

const CustomStack = (props) => {
  return (
    <Stack
      {...props}
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 2 }}
      sx={{ padding: "1rem 0" }}
    >
      {props.children}
    </Stack>
  );
};
/* PS_Status
 */
function Add() {
  const [open, setOpen] = useState(false);
  const UserContext = useContext(userContext);

  const [payment, setPayment] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const [monto, setMonto] = useState("");

  const [loading, setLoading] = useState(false);

  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onFileChange = (e) => {
    if (e.target.files[0].size  / 1024 / 1024 > 16) {
      setErrorMessage("La imagen es demasiado grande");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePaymentChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!selectedFile["name"] && !payment["PS_Referencia"]) {
      setErrorMessage("Debe ingresar una referencia o imagen de prueba");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!payment["PS_Metodo"]) {
      setErrorMessage("Debe ingresar el método");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!payment["PS_Fecha"]) {
      setErrorMessage("Debe ingresar la fecha del pago");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!payment["PS_Monto"]) {
      setErrorMessage("Debe ingresar el monto pagado");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }

    setSending(true);
  };
  useEffect(() => {
    if (!sending) return;
    let openEditShippment, shippmentToEdit;
    if (openEditShippment && shippmentToEdit) {
      /* (async function () {
        try {
          const response = await PutEnvio(shippmentToEdit, shippmentDetails);
          if (response.status === 200) {
            setSuccessMessage("Envío editado correctamente");
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = "/Envios"
            }, 2000);
            setSending(false);
          } else {
            setErrorMessage(
              "Error al editar el envío, puede que el ID ya exista"
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);
          }
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
      })(); */
    } else {
      (async function () {
        try {
          let form = new FormData();
          Object.keys(payment).forEach((key) => {
            form.append(key, payment[key]);
          });
          if (selectedFile["name"]) {
            form.append(
              "PS_ArchivoReferencia",
              selectedFile,
              selectedFile.name
            );
          }
          const response = await PostPago(form, {
            "Content-Type": "multipart/form-data",
          });
          if (response.status === 200) {
            setSuccessMessage("Pago envíado correctamente");
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = "/Pagos";
            }, 2000);
            setSending(false);
          } else {
            setErrorMessage(
              "Error al crear el Pago"
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);
          }
        } catch (e) {
          console.log(e)
          if (e) {
            setErrorMessage("Hubo un error al enviar los datos");
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);
          }
        }
      })();
    }
  }, [sending]);

  useEffect(() => {
    setPayment({...payment,
      PS_SuscripcionId: UserContext?.user?.Suscripcion_Id
    })
  },[UserContext])

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <AddCircleTwoToneIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        onClose={handleClose}
        component="form"
      >
        <Collapse in={errorMessage}>
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        </Collapse>
        <Collapse in={successMessage}>
          <Alert severity="success" onClose={() => setSuccessMessage("")}>
            {successMessage}
          </Alert>
        </Collapse>
        <DialogTitle>{"Creación de Pago"}</DialogTitle>
        {loading || sending ? (
          <Box
            sx={{
              width: "auto",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner loading={loading || sending} />
          </Box>
        ) : (
          <>
            <DialogContent>
              <DialogContentText
                sx={{
                  display: "flex",
                  alignContent: "center",
                  gap: "1rem",
                  margin: "1rem 0",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ flexGrow: 1 }}
                >
                  Por favor, ingrese los datos del Pago.
                </Typography>
              </DialogContentText>
              <Grid>
                <CustomStack>
                  <TextField
                    id="PS_Metodo"
                    name="PS_Metodo"
                    select
                    label="Metodo de Pago"
                    variant="filled"
                    fullWidth
                    value={payment.PS_Metodo}
                    onChange={handlePaymentChange}
                  >
                    {[
                      { name: "Transferencia", value: "T" },
                      { name: "Efectivo", value: "E" },
                      { name: "Pago Movil", value: "P" },
                    ].map(({ name, value }) => (
                      <MenuItem key={value} value={value}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="PS_Fecha"
                    name="PS_Fecha"
                    type="date"
                    label="Fecha del Pago"
                    variant="filled"
                    fullWidth
                    onChange={handlePaymentChange}
                    value={
                      (payment.PS_Fecha && payment.PS_Fecha.split("T")[0]) || ""
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="PS_Monto"
                    name="PS_Monto"
                    type="number"
                    label="Monto"
                    variant="filled"
                    fullWidth
                    onChange={handlePaymentChange}
                    value={payment.PS_Monto}
                  />
                </CustomStack>
                <CustomStack>
                  <TextField
                    id="PS_Referencia"
                    name="PS_Referencia"
                    label="Referencia"
                    variant="filled"
                    onChange={handlePaymentChange}
                    value={payment.PS_Referencia}
                    fullWidth
                  />
                  <TextField
                    id="PS_Status"
                    name="PS_Status"
                    select
                    label="Status"
                    value={payment.PS_Status}
                    onChange={handlePaymentChange}
                    variant="filled"
                    fullWidth
                  >
                    {[
                      { value: "P", name: "Pendiente" },
                      { value: "A", name: "Aprobado" },
                      { value: "R", name: "Rechazado" },
                    ].map((Option) => (
                      <MenuItem key={Option.value} value={Option.value}>
                        {Option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    value={UserContext?.user?.Suscripcion_Id}
                    disabled={true && true}
                    label="Suscripcion"
                    variant="filled"
                    fullWidth
                  />
                </CustomStack>
                <CustomStack>
                  {selectedFile?.name && (
                    <CardMedia
                      component="img"
                      height="140"
                      width="140"
                      image={URL.createObjectURL(selectedFile)}
                      title="material"
                    />
                  )}
                </CustomStack>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Typography variant="h5">
                  Da clic para ingresar una imagen:
                </Typography>
                <label htmlFor="icon-button-file">
                  <Input
                    id="icon-button-file"
                    type="file"
                    sx={{ display: "none" }}
                    onChange={onFileChange}
                    inputProps={{
                      accept: "image/*",
                    }}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <UploadFileTwoToneIcon size="large" />
                  </IconButton>
                </label>
              </Box>
            </DialogContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
                gap: "1rem",
                margin: "1rem 0",
              }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="outlined" onClick={handleSubmitPayment}>
                Guardar
              </Button>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
}

export default Add;
