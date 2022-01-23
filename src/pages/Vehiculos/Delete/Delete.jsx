import { useState, forwardRef, useEffect, useContext } from "react";
import { useHistory } from "react-router";

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
  InputAdornment,
} from "@mui/material";
import { DesktopDatePicker, LoadingButton } from "@mui/lab";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import Spinner from "../../../components/Spinner/Spinner";
import { GetConveyances, GetOneVehicle } from "../../../api/Get";
import { PostVehiculo } from "../../../api/Post";
import { OpenEditContext } from "../../../context/openEditContext";
import { PutVehiculo } from "../../../api/Put";
import { UserContext } from "../../../context/UserContextT";
import { DeleteContext } from "../../../context/deleteContext";
import { DeleteOneVehiculo } from "../../../api/Delete";

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
function Delete() {
  const {
    vehicleToDelete,
    openDeleteVehicle,
    setVehicleToDelete,
    setOpenDeleteVehicle
  } = useContext(DeleteContext);

  const { view_type } = useContext(UserContext);

  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

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
    setVehicleToDelete("")
    setOpenDeleteVehicle(false)
    setVehicle({});
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

  const handleDeleteVehicle = (e) => {
    e.preventDefault();
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
    if (
      !vehicle["Vehiculo_CapacidadCarga"] ||
      vehicle["Vehiculo_CapacidadCarga"] < 1
    ) {
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
    if (openDeleteVehicle && vehicleToDelete) {
      (async function () {
        try {
          const response = await DeleteOneVehiculo(vehicleToDelete);
          if (response.status === 200) {
            setSuccessMessage("Vehículo eliminado correctamente");
            setSending(false);
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = "/Vehiculos";
            }, 2000);
            setSending(false);
          } else {
            setErrorMessage(
              "Error al eliminar el Vehículo"
            );
            setSending(false);
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
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

  useEffect(async () => {
    if (!vehicleToDelete || !openDeleteVehicle) return;
    try {
      setLoading(true);
      let vehicleDetails = await GetOneVehicle(vehicleToDelete);
      await setVehicle(() => vehicleDetails);
      await getConveyanceTypes();
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setErrorMessage("Hubo un error al obtener los datos del vehículo");
      setTimeout(() => {
        setErrorMessage("");
        setOpenDeleteVehicle(false);
        setVehicleToDelete("")
        setLoading(false);
      }, 3000);
    }
  }, [vehicleToDelete, openDeleteVehicle]);

  return (
    <>
      <Dialog
        open={openDeleteVehicle}
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
        {openDeleteVehicle && vehicleToDelete && "¿Deseas eliminar el siguiente Vehículo?"}
        </DialogTitle>

        {(loading || sending) ? (
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
                  Datos del vehículo a eliminar.
                </Typography>
              </DialogContentText>
              <Grid>
                <CustomStack>
                  <TextField
                    id="Vehiculo_MTId"
                    name="Vehiculo_MTId"
                    select
                    label="Tipo de Vehículo"
                    onChange={handleVehicleChange}
                    variant="filled"
                    SelectProps={{
                      onOpen: getConveyanceTypes,
                    }}
                    
                    InputProps={{
                      disabled: true
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
                    value={(vehicle && vehicle.Vehiculo_Marca) || ""}
                    onChange={handleVehicleChange}
                    
                    InputProps={{
                      disabled: true
                    }}
                  />
                  <TextField
                    id="Vehiculo_Modelo"
                    name="Vehiculo_Modelo"
                    label="Modelo"
                    variant="filled"
                    fullWidth
                    value={(vehicle && vehicle.Vehiculo_Modelo) || ""}
                    onChange={handleVehicleChange}
                    
                    InputProps={{
                      disabled: true
                    }}
                  />
                </CustomStack>
                <CustomStack>
                  <DesktopDatePicker
                    id="Vehiculo_Anio"
                    name="Vehiculo_Anio"
                    label="Año del Vehículo"
                    fullWidth
                    views={["year"]}
                    minDate={new Date("1951-01-01")}
                    maxDate={new Date()}
                    inputFormat="yyyy"
                    value={
                      (vehicle &&
                        (() => {
                          let date = new Date(vehicle.Vehiculo_Anio, 0);
                          console.log(date);
                          return date;
                        })()) ||
                      ""
                    }
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
                    disabled
                  />
                  <TextField
                    id="Vehiculo_Matricula"
                    name="Vehiculo_Matricula"
                    label="Matricula"
                    variant="filled"
                    fullWidth
                    value={(vehicle && vehicle.Vehiculo_Matricula) || ""}
                    onChange={handleVehicleChange}
                    inputProps={{
                      maxLength: 7,
                    }}
                    
                    InputProps={{
                      disabled: true
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
                    value={(vehicle && vehicle.Vehiculo_Pasajeros) || ""}
                    onChange={handleVehicleChange}
                    fullWidth
                    
                    InputProps={{
                      disabled: true
                    }}
                  />
                  <TextField
                    id="Vehiculo_CapacidadCarga"
                    name="Vehiculo_CapacidadCarga"
                    type="number"
                    label="Máximo de Carga"
                    variant="filled"
                    onChange={handleVehicleChange}
                    fullWidth
                    value={(vehicle && vehicle.Vehiculo_CapacidadCarga) || ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">kg</InputAdornment>
                      ),
                      disabled: true
                    }}
                  />
                  {openDeleteVehicle && vehicleToDelete && view_type === "A"&& <TextField
                    id="Vehiculo_PersonaId"
                    name="Vehiculo_PersonaId"
                    type="number"
                    label="Persona"
                    variant="filled"
                    fullWidth
                    value={(vehicle && vehicle.Vehiculo_PersonaId) || ""}
                    disabled={true}
                  />}
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
                onClick={handleDeleteVehicle}
              >
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
