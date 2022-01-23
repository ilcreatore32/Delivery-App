import {
  useState,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
} from "react";

/* API */
import {
  GetConveyances,
  GetOneServiceToEdit,
  GetUbication,
  GetVehiclesOption,
} from "../../../api/Get";

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
  InputAdornment,
  Collapse,
  Alert,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/* Components */
import Spinner from "../../../components/Spinner/Spinner";
import { AreasColumns, AreasDisabled } from "../../../models/DataTableColums";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteContext } from "../../../context/deleteContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { PostServicio } from "../../../api/Post";
import { OpenEditContext } from "../../../context/openEditContext";
import { PutServicio } from "../../../api/Put";
import { DeleteOneServicio } from "../../../api/Delete";

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
    removeAreaService, 
    setRemoveAreaService,
    serviceToDelete,
    openDeleteService,
    setServiceToDelete,
    setOpenDeleteService
  } = useContext(DeleteContext);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [service, setService] = useState({});

  const [federalEntities, setFederalEntities] = useState([]);
  const [loadingFederalEntities, setLoadingFederalEntities] = useState(false);

  const [municipalities, setMunicipalities] = useState([]);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  const [parishes, setParishes] = useState([]);
  const [loadingParishes, setLoadingParishes] = useState(false);

  const [conveyanceTypes, setConveyanceTypes] = useState([]);
  const [loadingConveyanceTypes, setLoadingConveyanceTypes] = useState(false);

  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState("");
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState({
    EF_Id: "",
    EF_Nombre: "",
    Municipio_Id: "",
    Municipio_Nombre: "",
    Parroquia_Id: "",
    Parroquia_Nombre: "",
  });

  const getFederalEntities = () => {
    setLoadingFederalEntities(true);
    GetUbication("federal_entity").then((res) => {
      setFederalEntities(res);
      setLoadingFederalEntities(false);
    });
  };

  const getMunicipities = (federal_entity) => {
    if (!federal_entity) return;
    setLoadingMunicipalities(true);
    GetUbication("municipality", federal_entity).then((res) => {
      setMunicipalities(res);
      setLoadingMunicipalities(false);
    });
  };

  const getParishes = (municipality) => {
    if (!municipality) return;
    setLoadingParishes(true);
    GetUbication("parish", null, municipality).then((res) => {
      setParishes(res);
      setLoadingParishes(false);
    });
  };

  const getConveyanceTypes = () => {
    setLoadingConveyanceTypes(true);
    GetConveyances().then((res) => {
      setConveyanceTypes(res);
      setLoadingConveyanceTypes(false);
    });
  };

  const getVehicles = () => {
    if (!service.ST_MTId || service.ST_MT === 1) return;
    if (serviceToDelete && openDeleteService && service.ST_PersonaId) {
      setLoadingVehicles(true);
      console.log(service.ST_PersonaId);
      GetVehiclesOption(service.ST_MTId, service.ST_PersonaId).then((res) => {
        setVehicles(res);
        setLoadingVehicles(false);
      });
    } else if (open) {
      console.log(open);
      setLoadingVehicles(true);
      GetVehiclesOption(service.ST_MTId).then((res) => {
        setVehicles(res);
        setLoadingVehicles(false);
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const checkAreas = useCallback(async () => {
    try {
      let areasCheck = [];

      if (area.EF_Id && !area.Municipio_Id && !area.Parroquia_Id) {
        if (areas.length > 0) {
          areasCheck = await areas.filter((a) => {
            return a.EF_Id !== area.EF_Id;
          });
          areasCheck = [...areasCheck, area];
          await setAreas(areasCheck);
        } else {
          await setAreas([...areas, area]);
        }
      }

      if (area.EF_Id && area.Municipio_Id && !area.Parroquia_Id) {
        if (areas.length > 0) {
          areasCheck = areas.filter((a) => {
            return a.Municipio_Id !== area.Municipio_Id;
          });
          areasCheck = areasCheck.filter(
            (a) =>
              a.EF_Id !== area.EF_Id ||
              (a.EF_Id === area.EF_Id && a.Municipio_Id)
          );
          await setAreas([...areasCheck, area]);
        } else {
          await setAreas([...areas, area]);
        }
      }

      if (area.EF_Id && area.Municipio_Id && area.Parroquia_Id) {
        if (areas.length > 0) {
          areasCheck = areas.filter(
            (a) => a.Parroquia_Id !== area.Parroquia_Id
          );
          areasCheck = areasCheck.filter(
            (a) =>
              a.EF_Id !== area.EF_Id ||
              (a.EF_Id === area.EF_Id && a.Municipio_Id)
          );
          areasCheck = areasCheck.filter(
            (a) =>
              a.Municipio_Id !== area.Municipio_Id ||
              (a.Municipio_Id === area.Municipio_Id && a.Parroquia_Id)
          );
          await setAreas([...areasCheck, area]);
        } else {
          await setAreas([...areas, area]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [area]);

  const handleClose = () => {
    setOpen(false);
    setOpenDeleteService(false);
    setServiceToDelete("");
    setService({});
    setFederalEntities([]);
    setMunicipalities([]);
    setParishes([]);
    setVehicles([]);
    setAreas([]);
    setArea({
      EF_Id: "",
      EF_Nombre: "",
      Municipio_Id: "",
      Municipio_Nombre: "",
      Parroquia_Id: "",
      Parroquia_Nombre: "",
    });
  };

  const handleServiceChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleAreaChange = (e, type) => {
    switch (type) {
      case "EF_Id":
        let index = federalEntities.findIndex(
          (p) => p.EF_Id === e.target.value
        );
        console.log(index);
        if (index > -1) {
          setArea({
            ...area,
            EF_Id: e.target.value,
            EF_Nombre: federalEntities[index].EF_Nombre,
          });
        }
        break;
      case "Municipio_Id":
        let index2 = municipalities.findIndex(
          (p) => p.Municipio_Id === e.target.value
        );
        if (index2 > -1) {
          setArea({
            ...area,
            Municipio_Id: e.target.value,
            Municipio_Nombre: municipalities[index2].Municipio_Nombre,
          });
        }
        break;
      case "Parroquia_Id":
        let index3 = parishes.findIndex(
          (p) => p.Parroquia_Id === e.target.value
        );
        if (index3 > -1) {
          setArea({
            ...area,
            Parroquia_Id: e.target.value,
            Parroquia_Nombre: parishes[index3].Parroquia_Nombre,
          });
        }
        break;
      default:
        break;
    }
  };

  const handleAddArea = async () => {
    await checkAreas();
    setArea({
      EF_Id: "",
      EF_Nombre: "",
      Municipio_Id: "",
      Municipio_Nombre: "",
      Parroquia_Id: "",
      Parroquia_Nombre: "",
    });
  };

  const handleDeleteService = (e) => {
    e.preventDefault();
    setSending(true);
  };

  useEffect(() => {
    if (!sending || !serviceToDelete || !openDeleteService) return;
    if (openDeleteService && serviceToDelete) {
      (async function () {
        try {
          const response = await DeleteOneServicio(serviceToDelete);
          console.debug(response);
          if (response.status === 200) {
            setSuccessMessage("Servicio eliminado correctamente");
            setSending(false);
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = "/Servicios";
            }, 2000);
          } else {
            setErrorMessage(
              "Error al eliminar el Servicio"
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
  }, [serviceToDelete,sending, openDeleteService]);

  useEffect(() => {
    if (removeAreaService && removeAreaService.EF_Id) {
      let areasCheck = [...areas];
      let index = areasCheck.findIndex(
        (x) =>
          x.EF_Id === removeAreaService.EF_Id &&
          x.Municipio_Id === removeAreaService.Municipio_Id &&
          x.Parroquia_Id === removeAreaService.Parroquia_Id
      );
      if (index > -1) {
        areasCheck.splice(index, 1);
        setAreas(areasCheck);
      }
    }
  }, [removeAreaService]);

  useEffect(async () => {
    if (!serviceToDelete || !openDeleteService) return;
    try {
      setLoading(true);
      let serviceDetails = await (() => GetOneServiceToEdit(serviceToDelete))();
      await setService(() => serviceDetails);
      await getConveyanceTypes();
      await setAreas(serviceDetails.areasList);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setErrorMessage("Hubo un error al obtener los datos del envío");
      setTimeout(() => {
        setErrorMessage("");
        setOpenDeleteService(false);
        setLoading(false);
      }, 3000);
    }
  }, [serviceToDelete, openDeleteService]);

  useEffect(() => {
    if (serviceToDelete && open) {
      setService({});
      setAreas([]);
    }
  }, [serviceToDelete, open]);

  useEffect(() => {
    if (!service.ST_PersonaId || !service.ST_MTId) return;
    if (service.ST_MTId === 1 && service.ST_VehiculoId) {
      let serviceCheck = { ...service };
      delete serviceCheck.ST_VehiculoId;
      setService(serviceCheck);
    }
    if (service.ST_PersonaId) {
      getVehicles();
    }
  }, [service]);

  return (
    <>
      <Dialog
        open={openDeleteService}
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
          {openDeleteService && serviceToDelete && "¿Deseas eliminar el siguiente Servicio?"}
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
                  Datos del servicio a eliminar
                </Typography>
              </DialogContentText>
              <Grid>
                <CustomStack>
                  <TextField
                    id="ST_MTId"
                    name="ST_MTId"
                    select
                    label="Medio de transporte"
                    value={
                      (service &&
                        conveyanceTypes.length > 0 &&
                        service.ST_MTId) ||
                      ""
                    }
                    onChange={handleServiceChange}
                    variant="filled"
                    
                    InputProps={{
                      disabled: true
                    }}
                    SelectProps={{
                      onOpen: getConveyanceTypes,
                    }}
                    sx={{ minWidth: "40%" }}
                  >
                    {conveyanceTypes ? (
                      conveyanceTypes.map((conveyance) => (
                        <MenuItem
                          key={conveyance.MT_Id}
                          value={conveyance.MT_Id}
                        >
                          {conveyance.MT_Nombre}
                        </MenuItem>
                      ))
                    ) : loadingConveyanceTypes ? (
                      <MenuItem>
                        <Spinner loading={loadingConveyanceTypes} />
                      </MenuItem>
                    ) : (
                      <MenuItem value={0}>Hubo un error</MenuItem>
                    )}
                  </TextField>
                  <TextField
                    id="ST_VehiculoId"
                    name="ST_VehiculoId"
                    select
                    label="Vehículos"
                    value={service && service.ST_VehiculoId}
                    onChange={handleServiceChange}
                    variant="filled"
                    
                    InputProps={{
                      disabled: true
                    }}
                    SelectProps={{
                      onOpen: getVehicles,
                    }}
                    fullWidth
                    {...(service.ST_MTId !== 1
                      ? {
                          disabled: false,
                        }
                      : { disabled: true })}
                  >
                    {vehicles ? (
                      vehicles.map((vehicle) => (
                        <MenuItem
                          key={vehicle.Vehiculo_Id}
                          value={vehicle.Vehiculo_Id}
                        >
                          {`${vehicle.Vehiculo_Marca} ${vehicle.Vehiculo_Modelo} ${vehicle.Vehiculo_Anio} ${vehicle.Vehiculo_Matricula}`}
                        </MenuItem>
                      ))
                    ) : loadingVehicles ? (
                      <MenuItem>
                        <Spinner loading={loadingVehicles} />
                      </MenuItem>
                    ) : (
                      <MenuItem value={0}>
                        No se pudieron obtener vehículos de este usuario
                      </MenuItem>
                    )}
                  </TextField>
                </CustomStack>
                <CustomStack>
                  <TextField
                    id="ST_Status"
                    name="ST_Status"
                    select
                    label="Status"
                    value={service && service.ST_Status}
                    onChange={handleServiceChange}
                    variant="filled"
                    sx={{ display: "flex", flex: 0.4 }}
                    
                    InputProps={{
                      disabled: true
                    }}
                  >
                    {[
                      { value: "D", name: "Disponible" },
                      { value: "N", name: "No Disponible" },
                      { value: "E", name: "Eliminado" },
                    ].map((Option) => (
                      <MenuItem key={Option.value} value={Option.value}>
                        {Option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="ST_Horarioini"
                    name="ST_Horarioini"
                    label="Inicio"
                    type="time"
                    value={(service && service.ST_Horarioini) || ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleServiceChange}
                    variant="filled"
                    color="primary"
                    sx={{ display: "flex", flex: 0.4 }}
                    
                    InputProps={{
                      disabled: true
                    }}
                  />
                  <TextField
                    id="ST_Horariofin"
                    name="ST_Horariofin"
                    label="Cierre"
                    type="time"
                    value={(service && service.ST_Horariofin) || ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleServiceChange}
                    variant="filled"
                    color="primary"
                    sx={{ display: "flex", flex: 0.4 }}
                    
                    InputProps={{
                      disabled: true
                    }}
                  />
                  <TextField
                    id="ST_Precio"
                    name="ST_Precio"
                    label="Precio"
                    type="number"
                    value={(service && service.ST_Precio) || ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleServiceChange}
                    variant="filled"
                    color="primary"
                    sx={{ display: "flex", flex: 1 }}
                    
                    InputProps={{
                      disabled: true
                    }}
                  />
                </CustomStack>
                <CustomStack>
                  <TextField
                    id="ST_Descripcion"
                    name="ST_Descripcion"
                    label="Descripcion"
                    onChange={handleServiceChange}
                    value={(service && service.ST_Descripcion) || ""}
                    multiline
                    rows={4}
                    fullWidth
                    variant="filled"
                    
                    InputProps={{
                      disabled: true
                    }}
                  />
                </CustomStack>
                <CustomStack>
                  <Box sx={{ display: "flex", flex: 1, height: 600 }}>
                    <DataGrid
                      rows={areas && areas}
                      columns={AreasDisabled && AreasDisabled}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      autoWidth
                      autoHeight
                      getRowId={(row) => {
                        return `${row.EF_Id}-${row.Municipio_Id}-${row.Parroquia_Id}`;
                      }}
                    />
                  </Box>
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
              <Button onClick={handleClose} variant="outlined">
                Cancelar
              </Button>
              <LoadingButton
                loading={sending}
                variant="outlined"
                onClick={handleDeleteService}
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
