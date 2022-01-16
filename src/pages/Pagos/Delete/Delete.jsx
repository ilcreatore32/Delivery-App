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
import Spinner from "../../../components/Spinner/Spinner";
import { GetOnePayment } from "../../../api/Get";
import { OpenEditContext } from "../../../context/openEditContext";
import { PutPago } from "../../../api/Put";
import { LoadingButton } from "@mui/lab";

import { UserContext } from "../../../context/UserContextT";
import { DeleteContext } from "../../../context/deleteContext";
import { DeleteOnePago } from "../../../api/Delete";

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
function Delete({AddButton, openAccount, setOpenAccount, redirect}) {
  const [open, setOpen] = useState(false);
  const {
    paymentToDelete,
    openDeletePayment,
    setPaymentToDelete,
    setOpenDeletePayment,
  } = useContext(DeleteContext);
  const { view_type, logged_user } = useContext(UserContext);

  const [payment, setPayment] = useState({});

  const [loading, setLoading] = useState(false);

  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onFileChange = (e) => {
    if (!e.target.files[0]?.size) return
    if (e.target.files[0].size / 1024 / 1024 > 16) {
      setErrorMessage("La imagen es demasiado grande");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    } else {
      setPayment({ ...payment, PS_ArchivoReferencia: e.target.files[0] });
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
    if(setOpenAccount) setOpenAccount(false);
    setPaymentToDelete("")
    setOpenDeletePayment(false)
    setPayment({});
  };
  
  useEffect(() =>{
    setOpen(openAccount)
  }, [openAccount])

  const handleDeletePayment = (e) => {
    e.preventDefault();
    setSending(true);
  };

  useEffect(() => {
    if (!sending || !paymentToDelete || !openDeletePayment) return;
    if (openDeletePayment && paymentToDelete) {
      (async function () {
        try {
          const response = await DeleteOnePago(paymentToDelete);
          console.debug(response);
          if (response.status === 200) {
            setSuccessMessage("Pago eliminado correctamente");
            setSending(false);
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = redirect || "/Pagos";
            }, 2000);
          } else {
            setErrorMessage(
              "Error al eliminar el Pago"
            );
            setSending(false);
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          }
        } catch (e) {
          if (e) {
            setErrorMessage("Hubo un error al enviar los datos");
            setSending(false);
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          }
        }
      })();
    } 
    setSending(false);
  }, [paymentToDelete,sending, openDeletePayment]);
  
  useEffect(() => {
    if (paymentToDelete || openDeletePayment || Object.keys(payment).length > 0) return;
    setPayment({
      ...payment,
      PS_SuscripcionId: logged_user?.Suscripcion_Id,
    });
  }, [logged_user, payment]);

  useEffect(async () => {
    if (!paymentToDelete || !openDeletePayment) return;
    try {
      setLoading(true);
      let paymentDetails = await GetOnePayment(paymentToDelete);
      await setPayment(() => paymentDetails);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setErrorMessage("Hubo un error al obtener los datos del pago");
      setTimeout(() => {
        setErrorMessage("");
        setOpenDeletePayment(false);
        setPaymentToDelete("")
        setLoading(false);
      }, 3000);
    }
  }, [paymentToDelete, openDeletePayment]);

  return (
    <>
      <Dialog
        open={openDeletePayment}
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
        <DialogTitle>
          {openDeletePayment && paymentToDelete && "¿Deseas eliminar el siguiente Pago?"}
        </DialogTitle>
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
                  Datos del pago a eliminar.
                </Typography>
              </DialogContentText>
              <Grid>
                <CustomStack>
                  <TextField
                    id="PS_Metodo"
                    name="PS_Metodo"
                    select
                    InputProps={{
                      disabled:true
                    }}
                    label="Método de Pago"
                    variant="filled"
                    fullWidth
                    value={payment.PS_Metodo || ""}
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
                    InputProps={{
                      disabled:true
                    }}
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
                    InputProps={{
                      disabled:true
                    }}
                    label="Monto"
                    variant="filled"
                    fullWidth
                    onChange={handlePaymentChange}
                    value={payment.PS_Monto || ""}
                  />
                </CustomStack>
                <CustomStack>
                  <TextField
                    id="PS_Referencia"
                    name="PS_Referencia"
                    label="Referencia"
                    InputProps={{
                      disabled:true
                    }}
                    variant="filled"
                    onChange={handlePaymentChange}
                    value={payment.PS_Referencia || ""}
                    fullWidth
                  />
                  {view_type === "A" && (
                  <TextField
                    id="PS_Status"
                    name="PS_Status"
                    select
                    InputProps={{
                      disabled:true
                    }}
                    label="Estatus"
                    value={payment.PS_Status || ""}
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
                  )}
                  <TextField
                    value={payment.PS_SuscripcionId || ""}
                    disabled={true && true}
                    label="Suscripción"
                    InputProps={{
                      disabled:true
                    }}
                    variant="filled"
                    fullWidth
                  />
                </CustomStack>
                <CustomStack>
                  {payment["PS_ArchivoReferencia"] && (
                  <CardMedia
                      component="img"
                      height="140"
                      width="140"
                      {...(payment["PS_ArchivoReferencia"].name ? {
                        image: URL.createObjectURL(payment["PS_ArchivoReferencia"]),
                        }
                      : {
                        src: `data:image/jpeg;base64,${payment.PS_ArchivoReferencia}`
                      }
                      )}
                      title="material"
                    />
                  )}
                </CustomStack>
              </Grid>
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
              <LoadingButton loading={sending} variant="outlined" onClick={handleDeletePayment}>
                Confirmar
              </LoadingButton>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
}

export default Delete;
