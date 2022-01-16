import React, { useContext } from "react";
import { useState } from "react";

/* Material UI */
import {
  TextField,
  Box,
  InputAdornment,
  MenuItem,
  Divider,
  Paper,
  Typography,
  Stack,
  Button,
} from "@mui/material";

/* Material UI Icons */
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";
import { FilterContext } from "../../../context/FilterContext";
import { GetConveyances, GetUbication } from "../../../api/Get";
import Spinner from "../../Spinner/Spinner";

function Servicios({ admin }) {
  const { serviceFilter, setServiceFilter } = useContext(FilterContext);

  const [federalEntities, setFederalEntities] = useState([]);
  const [loadingFederalEntities, setLoadingFederalEntities] = useState(false);

  const [municipalities, setMunicipalities] = useState([]);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  const [parishes, setParishes] = useState([]);
  const [loadingParishes, setLoadingParishes] = useState(false);

  const [conveyanceTypes, setConveyanceTypes] = useState([]);
  const [loadingConveyanceTypes, setLoadingConveyanceTypes] = useState(false);

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

  const handleChange = (e) => {
    setServiceFilter({ ...serviceFilter, [e.target.name]: e.target.value });
  };

  const handleFederalEntityChange = (e) => {
    setMunicipalities([]);
    setParishes([]);
    setServiceFilter((prevData) => {
      let newState = { ...prevData };
      newState.federal_entity = e.target.value;
      delete newState.municipality;
      delete newState.parish;
      return newState;
    });
  };

  const handleMunicipalityChange = (e) => {
    setParishes([]);
    setServiceFilter((prevData) => {
      let newState = { ...prevData };
      newState.municipality = e.target.value;
      delete newState.parish;
      return newState;
    });
  };

  const disponibilities = [
    {
      value: "D",
      label: "Disponible",
    },
    {
      value: "N",
      label: "No Disponible",
    },
    {
      value: "E",
      label: "Eliminado",
    },
  ];

  return (
    <>
      <Form>
        <Box
          sx={{
            display: "grid",
            rowGap: 1,
            margin: "1rem",
            padding: "1rem 0",
          }}
        >
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Ubicación
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <TextField
                id="federal_entity"
                name="federal_entity"
                select
                label="Entidad Federal"
                value={(serviceFilter && serviceFilter.federal_entity) || ""}
                onChange={handleFederalEntityChange}
                variant="filled"
                color="secondary"
                SelectProps={{
                  onOpen: getFederalEntities,
                }}
                fullWidth
              >
                {federalEntities ? (
                  federalEntities.map((federalEntity) => (
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
                id="municipality"
                name="municipality"
                select
                label="Municipio"
                value={(serviceFilter && serviceFilter.municipality) || ""}
                onChange={handleMunicipalityChange}
                variant="filled"
                color="secondary"
                SelectProps={{
                  onOpen: () => getMunicipities(serviceFilter?.federal_entity),
                }}
                fullWidth
                {...(serviceFilter?.federal_entity
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
                id="parish"
                name="parish"
                select
                label="Parroquia"
                value={(serviceFilter && serviceFilter.parish) || ""}
                onChange={handleChange}
                variant="filled"
                color="secondary"
                SelectProps={{
                  onOpen: () => getParishes(serviceFilter?.municipality),
                }}
                fullWidth
                {...(serviceFilter?.municipality
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
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Horario
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                id="min_hour"
                name="min_hour"
                label="Inicio"
                type="time"
                value={(serviceFilter && serviceFilter.min_hour) || ""}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                variant="filled"
                color="secondary"
              />
              <TextField
                id="max_hour"
                name="max_hour"
                label="Inicio"
                type="time"
                value={(serviceFilter && serviceFilter.max_hour) || ""}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                variant="filled"
                color="secondary"
              />
            </Box>
          </Paper>

          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Precio
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                id="min_value"
                name="min_value"
                label="Mínimo"
                type="number"
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
                variant="filled"
                color="secondary"
                onChange={handleChange}
                value={serviceFilter?.min_value}
              />
              <TextField
                id="max_value"
                name="max_value"
                label="Máximo"
                type="number"
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
                variant="filled"
                color="secondary"
                onChange={handleChange}
                value={serviceFilter?.max_value}
              />
            </Box>
          </Paper>

          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Medio
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField
                id="conveyance"
                name="conveyance"
                select
                label="Medio de transporte"
                value={
                  (serviceFilter && conveyanceTypes.length > 0 && serviceFilter.conveyance) ||
                  ""
                }
                onChange={handleChange}
                variant="filled"
                SelectProps={{
                  onOpen: getConveyanceTypes,
                }}
                sx={{ minWidth: "40%" }}
              >
                {conveyanceTypes ? (
                  conveyanceTypes.map((conveyance) => (
                    <MenuItem key={conveyance.MT_Id} value={conveyance.MT_Id}>
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
            </Box>
          </Paper>

          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Disponibilidad
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField
                id="availability"
                name="availability"
                select
                label="Disponibilidad"
                value={serviceFilter?.availability || ""}
                onChange={handleChange}
                variant="filled"
                color="secondary"
              >
                {disponibilities.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Paper>
          {admin === "A" ? (
            <>
              <Divider variant="middle" />
              <Paper variant="outlined" sx={{ padding: "1rem" }}>
                <Typography variant="h6" component="span">
                  Usuario
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gap: 1,
                    gridTemplateColumns: "repeat(3, 1fr)",
                  }}
                >
                  <TextField
                    id="person_name"
                    name="person_name"
                    label="Nombres"
                    variant="filled"
                    color="secondary"
                    onChange={handleChange}
                    value={(serviceFilter && serviceFilter.person_name) || ""}
                    {...(serviceFilter && serviceFilter.person_name && {
                        InputLabelProps: {
                          shrink: true,
                        },
                      })}
                  />
                  <TextField
                    id="person_lastname"
                    name="person_lastname"
                    label="Apellidos"
                    variant="filled"
                    color="secondary"
                    onChange={handleChange}
                    value={(serviceFilter && serviceFilter.person_lastname) || ""}
                    {...(serviceFilter && serviceFilter.person_lastname && {
                      InputLabelProps: {
                        shrink: true,
                      },
                    })}
                  />
                  <TextField
                    id="person_id"
                    name="person_id"
                    label="Cedula"
                    variant="filled"
                    color="secondary"
                    type="number"
                    value={(serviceFilter && serviceFilter.person_id) || ""}
                    onChange={handleChange}
                    {...(serviceFilter && serviceFilter.person_id && {
                      InputLabelProps: {
                        shrink: true,
                      },
                    })}
                  />
                </Box>
              </Paper>
            </>
          ) : null}
          {serviceFilter && Object.keys(serviceFilter).length !== 0 && (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    paddingTop: 3,
                  }}
                >
                  <Button
                    variant="filled"
                    color="info"
                    onClick={() => setServiceFilter({})}
                  >
                    Limpiar
                  </Button>
                </Stack>
              )}
        </Box>
      </Form>
    </>
  );
}

export default Servicios;
