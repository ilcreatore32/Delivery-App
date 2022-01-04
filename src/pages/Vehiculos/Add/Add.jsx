import { useState, forwardRef, useEffect } from "react";
import { useHistory } from 'react-router'

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
  Collapse,
  Alert,
  InputAdornment
} from "@mui/material";
import { DesktopDatePicker, LoadingButton } from "@mui/lab";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import Spinner from "../../../components/Spinner/Spinner";
import { GetConveyances } from "../../../api/Get";
import { PostVehiculo } from "../../../api/Post";

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
  const history = useHistory()
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false)

  const [vehicle, setVehicle] = useState({});

  const [conveyanceTypes, setConveyanceTypes] = useState([]);
  const [loadingConveyanceTypes, setLoadingConveyanceTypes] = useState(false);

  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getConveyanceTypes = () => {
    setLoadingConveyanceTypes(true);
    GetConveyances().then((res) => {
      setConveyanceTypes(res);
      setLoadingConveyanceTypes(false);
    });
  };

  const handleVehicleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmitVehicle = (e) => {
    e.preventDefault();
    console.log(!vehicle["Vehiculo_MTId"])
    if (!vehicle["Vehiculo_MTId"]) {
      setErrorMessage("Debe ingresar el tipo de vehículo");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!vehicle["Vehiculo_Marca"]) {
      setErrorMessage("Debe ingresar la marca del vehículo");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!vehicle["Vehiculo_Modelo"]) {
      setErrorMessage("Debe ingresar el modelo del vehículo");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!vehicle["Vehiculo_Anio"]) {
      setErrorMessage("Debe ingresar el año del vehículo");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!vehicle["Vehiculo_Pasajeros"] || vehicle["Vehiculo_Pasajeros"] < 1) {
      setErrorMessage("Debe ingresar la cantidad máxima de pasajeros");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!vehicle["Vehiculo_CapacidadCarga"] || vehicle["Vehiculo_CapacidadCarga"] < 1) {
      setErrorMessage("Debe ingresar capacidad de carga del vehículo");
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
    let openEditService, serviceToEdit
    if (openEditService && serviceToEdit) {
      /* (async function () {
        try {
          const response = await PutServicio(serviceToEdit, serviceDetails);
          if (response.status === 200) {
            setSuccessMessage("Servicio editado correctamente");
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = "/Servicios";
            }, 2000);
            setSending(false);
          } else {
            setErrorMessage("Error al editar el servicio");
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);
          }
        } catch (e) {
          if (e) {
            setErrorMessage("Hubo un error al enviar los datos");
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
          const response = await PostVehiculo(vehicle);
          if (response.status === 200) {
            setSuccessMessage("Vehículo creado correctamente");
            setTimeout(() => {
              setSuccessMessage("");
              history.go(0)
            }, 2000);
            setSending(false);
          } else if (response.errno === 1062) {
            setErrorMessage("Error matrícula repetida");
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);
          } else {
            setErrorMessage("Error matrícula repetida");
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            setSending(false);     
          }
        } catch (e) {
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
  }, [sending, vehicle]);

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
        <DialogTitle>{"Creación de Vehiculo"}</DialogTitle>
        {loading ? (
          <Box
            sx={{
              width: "auto",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner loading={loading} />
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
                  Por favor, ingrese los datos del Vehiculo.
                </Typography>
              </DialogContentText>
              <Grid>
                <CustomStack>
                  <TextField
                    id="Vehiculo_MTId"
                    name="Vehiculo_MTId"
                    select
                    label="Tipo de Vehiculo"
                    onChange={handleVehicleChange}
                    variant="filled"
                    SelectProps={{
                      onOpen: getConveyanceTypes,
                    }}
                    value={(vehicle && vehicle.Vehiculo_MTId) || ""}
                    sx={{ minWidth: "40%" }}
                  >
                    {conveyanceTypes ? (
                      conveyanceTypes.map(
                        (conveyance) =>
                          conveyance.MT_Id !== 1 && (
                            <MenuItem
                              key={conveyance.MT_Id}
                              value={conveyance.MT_Id}
                            >
                              {conveyance.MT_Nombre}
                            </MenuItem>
                          )
                      )
                    ) : loadingConveyanceTypes ? (
                      <MenuItem>
                        <Spinner loading={loadingConveyanceTypes} />
                      </MenuItem>
                    ) : (
                      <MenuItem value={0}>Hubo un error</MenuItem>
                    )}
                  </TextField>
                  <TextField
                    id="Vehiculo_Marca"
                    name="Vehiculo_Marca"
                    label="Marca"
                    variant="filled"
                    fullWidth
                    onChange={handleVehicleChange}
                  />
                  <TextField
                    id="Vehiculo_Modelo"
                    name="Vehiculo_Modelo"
                    label="Modelo"
                    variant="filled"
                    fullWidth
                    onChange={handleVehicleChange}
                  />
                </CustomStack>
                <CustomStack>
                  <DesktopDatePicker
                    id="Vehiculo_Anio"
                    name="Vehiculo_Anio"
                    label="Año del Vehiculo"
                    fullWidth
                    views={["year"]}
                    minDate={new Date("1901-01-01")}
                    inputFormat="yyyy"
                    value={(vehicle && (() => {
                      let date = new Date(vehicle.Vehiculo_Anio,0);
                      console.log(date);
                      return date;
                    })()) || ""}
                    onChange={(date) => {
                      let year = new Date(date);
                      console.log(year.getFullYear());
                      return setVehicle({
                        ...vehicle,
                        Vehiculo_Anio: year.getFullYear(),
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="filled" error={false} />
                    )}
                  />
                  <TextField
                    id="Vehiculo_Matricula"
                    name="Vehiculo_Matricula"
                    label="Matricula"
                    variant="filled"
                    fullWidth
                    onChange={handleVehicleChange}
                    inputProps={{
                      maxLength: 7,
                    }}
                  />
                </CustomStack>
                <CustomStack>
                  <TextField
                    id="Vehiculo_Pasajeros"
                    name="Vehiculo_Pasajeros"
                    type="number"
                    label="Máximo de Pasajeros"
                    variant="filled"
                    onChange={handleVehicleChange}
                    fullWidth
                  />
                  <TextField
                    id="Vehiculo_CapacidadCarga"
                    name="Vehiculo_CapacidadCarga"
                    type="number"
                    label="Máximo de Carga"
                    variant="filled"
                    onChange={handleVehicleChange}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                  />
                  <TextField
                    id="Vehiculo_PersonaId"
                    name="Vehiculo_PersonaId"
                    type="number"
                    label="Persona"
                    variant="filled"
                    fullWidth
                    disabled={true}
                  />
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
              <LoadingButton
                loading={sending}
                variant="outlined"
                onClick={handleSubmitVehicle}
              >
                Guardar
              </LoadingButton>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
}

export default Add;
