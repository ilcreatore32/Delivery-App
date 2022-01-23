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
import { AreasColumns } from "../../../models/DataTableColums";
import { DataGrid, esES } from "@mui/x-data-grid";
import { DeleteContext } from "../../../context/deleteContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { PostServicio } from "../../../api/Post";
import { OpenEditContext } from "../../../context/openEditContext";
import { PutServicio } from "../../../api/Put";
import { UserContext } from "../../../context/UserContextT";

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
  const { removeAreaService, setRemoveAreaService } = useContext(DeleteContext);
  const { view_type } = useContext(UserContext);
  const {
    serviceToEdit,
    openEditService,
    setServiceToEdit,
    setOpenEditService,
  } = useContext(OpenEditContext);

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
    if (serviceToEdit && openEditService && service.ST_PersonaId) {
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
    setOpenEditService(false);
    setServiceToEdit("");
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

  const handleSubmitService = (e) => {
    e.preventDefault();
    if (areas.length === 0) {
      setErrorMessage("Debe ingresar al menos un area de operaciones");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!service["ST_Horarioini"]) {
      setErrorMessage("Debe ingresar un horario de comienzo");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!service["ST_Horariofin"]) {
      setErrorMessage("Debe ingresar un horario de finalizacion");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!service["ST_Status"]) {
      setErrorMessage("Debe ingresar un estado del envío");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!service["ST_MTId"]) {
      setErrorMessage("Debe ingresar un tipo de medio de transporte");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!service["ST_VehiculoId"] && service["ST_MTId"] !== 1) {
      setErrorMessage("Debe ingresar un vehiculo");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!service["ST_Precio"] || service["ST_Precio"] < 1) {
      setErrorMessage("Debe ingresar un precio válido");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    if (!service["ST_Descripcion"]) {
      setErrorMessage("Debe ingresar una descripción");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      setSending(false);
      return;
    }
    let areasList = [];

    areas.forEach((Area) => {
      areasList.push([Area.EF_Id, Area.Municipio_Id, Area.Parroquia_Id]);
    });

    setService({
      ...service,
      areasList,
    });

    setSending(true);
  };

  useEffect(() => {
    if (!sending) return;
    let { areasList } = service;
    if (areasList.length === 0) {
      setSending(false);
      return;
    }
    let serviceDetails = { ...service };
    if (openEditService && serviceToEdit) {
      (async function () {
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
      })();
    } else {
      (async function () {
        try {
          const response = await PostServicio(serviceDetails);
          if (response.status === 200) {
            setSuccessMessage("Servicio creado correctamente");
            setTimeout(() => {
              setSuccessMessage("");
              window.location.href = "/Servicios";
            }, 2000);
            setSending(false);
          } else {
            setErrorMessage("Error al crear el servicio");
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
  }, [service, sending]);

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
    if (!serviceToEdit || !openEditService) return;
    try {
      setLoading(true);
      let serviceDetails = await (() => GetOneServiceToEdit(serviceToEdit))();
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
        setOpenEditService(false);
        setLoading(false);
      }, 3000);
    }
  }, [serviceToEdit, openEditService]);

  useEffect(() => {
    if (serviceToEdit && open) {
      setService({});
      setAreas([]);
    }
  }, [serviceToEdit, open]);

  useEffect(() => {
    if (!service?.ST_PersonaId || !service?.ST_MTId) return;
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
      <IconButton onClick={handleClickOpen}>
        <AddCircleTwoToneIcon color="primary" />
      </IconButton>
      <Dialog
        open={open || openEditService}
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
          {openEditService && serviceToEdit
            ? "Edición del Servicio"
            : "Creación de Servicio"}
        </DialogTitle>
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
                  Por favor, ingrese los datos del Servicio.
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
                    SelectProps={{
                      onOpen: getVehicles,
                    }}
                    fullWidth
                    {...(service?.ST_MTId && service.ST_MTId !== 1
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
                    label="Estatus"
                    value={service && service.ST_Status}
                    onChange={handleServiceChange}
                    variant="filled"
                    sx={{ display: "flex", flex: 0.4 }}
                  >
                    {[
                      { value: "D", name: "Disponible" },
                      { value: "N", name: "No Disponible" },
                      { value: "E", name: "Eliminado" },
                    ].map((Option) => {
                      if (view_type !== "A" && Option.value === "E") return;
                      return (
                        <MenuItem key={Option.value} value={Option.value}>
                          {Option.name}
                        </MenuItem>
                      );
                    })}
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
                  />
                </CustomStack>
                <CustomStack>
                  <TextField
                    id="EF_Id"
                    name="EF_Id"
                    select
                    label="Entidad Federal"
                    value={area.EF_Id || ""}
                    onChange={(e) => handleAreaChange(e, "EF_Id")}
                    variant="filled"
                    SelectProps={{
                      onOpen: getFederalEntities,
                    }}
                    fullWidth
                  >
                    {federalEntities ? (
                      federalEntities.map((federalEntity) => federalEntity.EF_Id && (
                        <MenuItem
                          key={federalEntity.EF_Id}
                          value={federalEntity.EF_Id}
                        >
                          {federalEntity.EF_Nombre}
                        </MenuItem>
                      ))
                    ) : loadingFederalEntities ? (
                      <MenuItem>
                        <Spinner loading={loadingFederalEntities} />
                      </MenuItem>
                    ) : (
                      <MenuItem value={0}>Hubo un error</MenuItem>
                    )}
                  </TextField>
                  <TextField
                    id="Municipio_Id"
                    name="Municipio_Id"
                    select
                    label="Municipio"
                    value={area.Municipio_Id || ""}
                    onChange={(e) => handleAreaChange(e, "Municipio_Id")}
                    variant="filled"
                    SelectProps={{
                      onOpen: () => getMunicipities(area.EF_Id),
                    }}
                    fullWidth
                    {...(area.EF_Id
                      ? {
                          disabled: false,
                        }
                      : { disabled: true })}
                  >
                    {municipalities ? (
                      municipalities.map((municipality) => (
                        <MenuItem
                          key={municipality.Municipio_Id}
                          value={municipality.Municipio_Id}
                        >
                          {municipality.Municipio_Nombre}
                        </MenuItem>
                      ))
                    ) : loadingMunicipalities ? (
                      <MenuItem>
                        <Spinner loading={loadingMunicipalities} />
                      </MenuItem>
                    ) : (
                      <MenuItem value={0}>Hubo un error</MenuItem>
                    )}
                  </TextField>
                  <TextField
                    id="Parroquia_Id"
                    name="Parroquia_Id"
                    select
                    label="Parroquia"
                    value={area.Parroquia_Id || ""}
                    onChange={(e) => handleAreaChange(e, "Parroquia_Id")}
                    variant="filled"
                    SelectProps={{
                      onOpen: () => getParishes(area.Municipio_Id),
                    }}
                    fullWidth
                    {...(area.Municipio_Id
                      ? {
                          disabled: false,
                        }
                      : { disabled: true })}
                  >
                    {parishes ? (
                      parishes.map((parish) => (
                        <MenuItem
                          key={parish.Parroquia_Id}
                          value={parish.Parroquia_Id}
                        >
                          {parish.Parroquia_Nombre}
                        </MenuItem>
                      ))
                    ) : loadingParishes ? (
                      <MenuItem>
                        <Spinner loading={loadingParishes} />
                      </MenuItem>
                    ) : (
                      <MenuItem value={0}>Hubo un error</MenuItem>
                    )}
                  </TextField>
                  <IconButton>
                    <AddCircleTwoToneIcon
                      size="large"
                      onClick={handleAddArea}
                      color="primary"
                    />
                  </IconButton>
                </CustomStack>
                <CustomStack>
                  <Box sx={{ display: "flex", flex: 1, height: 600 }}>
                    <DataGrid
                      disableColumnMenu={true}
                      rows={areas && areas}
                      columns={AreasColumns && AreasColumns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      autoWidth
                      localeText={esES.props.MuiDataGrid.localeText}
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
                onClick={handleSubmitService}
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
