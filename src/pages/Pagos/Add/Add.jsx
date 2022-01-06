import { useState, forwardRef } from "react";

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
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import Api from "../../../config/axiosClient";
import { PostPago } from "../../../api/Post";


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

function Add() {
  const [open, setOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState({})
  const [monto, setMonto] = useState("");

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("PS_ArchivoReferencia", selectedFile, selectedFile.name)
    form.append("PS_Monto", monto)
    let result = await PostPago(form, {"Content-Type": "multipart/form-data"})
    console.log(result)
  };

/*   useEffect(() => {
    if (!sending) return;
    let { productsList, ContactInformation } = shippmentDetails;
    if (
      !productsList ||
      !ContactInformation ||
      productsList.length === 0 ||
      ContactInformation.length === 0
    ) {
      setSending(false);
      return;
    }
    if (openEditShippment && shippmentToEdit) {
      (async function () {
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
      })();
    } else {
      (async function () {
        try {
          const response = await PostEnvio(shippmentDetails);
          if (response.status === 200) {
            setSuccessMessage("Envío creado correctamente");
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = "/Envios"
            }, 2000);
            setSending(false);
          } else {
            setErrorMessage(
              "Error al crear el envío, puede que el ID ya exista"
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
      })();
    }
  }, [shippmentDetails]); */

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
        <DialogTitle>{"Creación de Pago"}</DialogTitle>
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
            <Typography variant="subtitle1" component="h2" sx={{ flexGrow: 1 }}>
              Por favor, ingrese los datos del Pago.
            </Typography>
          </DialogContentText>
          <Grid>
            <CustomStack>
              <TextField
                id=""
                name=""
                select
                label="Metodo de Pago"
                variant="filled"
                fullWidth
              >
                {["Transferencia", "Efectivo", "Pago Movil"].map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id=""
                name=""
                type="date"
                label="Fecha del Pago"
                variant="filled"
                fullWidth
              />
              <TextField
                id=""
                name=""
                type="number"
                label="Monto"
                variant="filled"
                fullWidth
                onChange={(e) => setMonto(e.target.value)}
                value={monto}
              />
              <TextField
                id=""
                name=""
                label="Referencia"
                variant="filled"
                fullWidth
              />
            </CustomStack>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {selectedFile && selectedFile.name && <CardMedia
            component="img"
            height="140"
            width="140"
            image={URL.createObjectURL(selectedFile)}
            title="material"
          />}
            <p>{selectedFile && selectedFile.name }</p>
            <label htmlFor="icon-button-file">
              <Input
                id="icon-button-file"
                type="file"
                sx={{ display: "none" }}
                onChange={onFileChange}
                inputProps={{
                  accept:"image/*"
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
      </Dialog>
    </>
  );
}

export default Add;
