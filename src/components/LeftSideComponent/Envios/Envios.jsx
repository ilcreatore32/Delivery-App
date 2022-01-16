import React, { useState, useEffect, useContext } from "react";

/* API */
import { GetUbication } from "../../../api/Get";

/* Font-Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

/* Material UI */
import {
  TextField,
  Box,
  InputAdornment,
  MenuItem,
  Divider,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";

/* Material UI Icons */
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/* Context */
import { FilterContext } from "../../../context/FilterContext";
import Spinner from "../../Spinner/Spinner";

function Envios({ asumidos, admin }) {
  const { shippmentFilter, setShippmentFilter } = useContext(FilterContext);

  const [federalEntities, setFederalEntities] = useState([]);
  const [loadingFederalEntities, setLoadingFederalEntities] = useState(false);

  const [municipalities, setMunicipalities] = useState([]);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  const [parishes, setParishes] = useState([]);
  const [loadingParishes, setLoadingParishes] = useState(false);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    let optionStatus = [
      { value: "E", label: "Eliminado" },
      { value: "P", label: "Pendiente de servicio transporte" },
      { value: "S", label: "Servicio de transporte activo" },
      { value: "T", label: "Producto entregado al transportista" },
      { value: "C", label: "Producto entregado al cliente" },
      { value: "F", label: "Transporte finalizado con exito" },
      { value: "X", label: "Problemas con el transporte" },
    ];
    if (admin !== "A") {
      delete optionStatus[0];
      setOptions(optionStatus);
    } else {
      setOptions(optionStatus);
    }
  }, [asumidos,admin]);

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

  const handleChange = (e) => {
    setShippmentFilter({ ...shippmentFilter, [e.target.name]: e.target.value });
  };

  const handleFederalEntityChange = (e) => {
    setMunicipalities([]);
    setParishes([]);
    setShippmentFilter((prevData) => {
      let newState = { ...prevData };
      newState.federal_entity = e.target.value;
      delete newState.municipality;
      delete newState.parish;
      return newState;
    });
  };

  const handleMunicipalityChange = (e) => {
    setParishes([]);
    setShippmentFilter((prevData) => {
      let newState = { ...prevData };
      newState.municipality = e.target.value;
      delete newState.parish;
      return newState;
    });
  };

  return (
    <>
      <form>
        <Box
          sx={{
            display: "grid",
            rowGap: 1,
            margin: "1rem",
            padding: "1rem 0",
            borderRadius: ".5rem",
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
                value={
                  (shippmentFilter && shippmentFilter.federal_entity) || ""
                }
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
                value={(shippmentFilter && shippmentFilter.municipality) || ""}
                onChange={handleMunicipalityChange}
                variant="filled"
                color="secondary"
                SelectProps={{
                  onOpen: () =>
                    getMunicipities(shippmentFilter?.federal_entity),
                }}
                fullWidth
                {...(shippmentFilter?.federal_entity
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
                value={(shippmentFilter && shippmentFilter.parish) || ""}
                onChange={handleChange}
                variant="filled"
                color="secondary"
                SelectProps={{
                  onOpen: () => getParishes(shippmentFilter?.municipality),
                }}
                fullWidth
                {...(shippmentFilter?.municipality
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
              Fecha
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                id="min_date"
                name="min_date"
                label="Mínima"
                type="date"
                variant="filled"
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={
                  (shippmentFilter &&
                    shippmentFilter.min_date &&
                    shippmentFilter.min_date.split("T")[0]) ||
                  ""
                }
                size="small"
                fullWidth
              />
              <TextField
                id="max_date"
                name="max_date"
                label="Máxima"
                type="date"
                variant="filled"
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={
                  (shippmentFilter &&
                    shippmentFilter.max_date &&
                    shippmentFilter.max_date.split("T")[0]) ||
                  ""
                }
                size="small"
                fullWidth
              />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Valor
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
                value={shippmentFilter?.min_value}
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
                value={shippmentFilter?.max_value}
              />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Peso
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                id="min_weight"
                name="min_weight"
                label="Mínimo"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                color="secondary"
                onChange={handleChange}
                value={shippmentFilter?.min_weight}
              />
              <TextField
                id="max_weight"
                name="max_weight"
                label="Maximo"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faAngleUp} />
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                color="secondary"
                onChange={handleChange}
                value={shippmentFilter?.max_weight}
              />
            </Box>
          </Paper>
          {asumidos ? (
            <>
              <Divider variant="middle" />
              <Paper
                variant="outlined"
                sx={{ display: "grid", rowGap: 1, padding: "1rem" }}
              >
                <Typography variant="h6" component="span">
                  Estado del Envío
                </Typography>
                <TextField
                  id="status"
                  name="status"
                  select
                  label="Estado del Envío"
                  value={(shippmentFilter && shippmentFilter.status) || ""}
                  onChange={handleChange}
                  helperText="Selecciona el Estado"
                  variant="filled"
                  color="secondary"
                >
                  {options &&
                    options.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                </TextField>
              </Paper>
            </>
          ) : null}
          {admin === "A" ? (
            <>
              <Divider variant="middle" />
              <Paper
                variant="outlined"
                sx={{ display: "grid", rowGap: 1, padding: "1rem" }}
              >
                <Typography variant="h6" component="span">
                  Estado del Envío
                </Typography>
                <TextField
                  id="status"
                  name="status"
                  select
                  label="Estado del Envío"
                  value={(shippmentFilter && shippmentFilter.status) || ""}
                  onChange={handleChange}
                  helperText="Selecciona el Estado"
                  variant="filled"
                  color="secondary"
                >
                  {options &&
                    options.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                </TextField>
              </Paper>
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
                    value={
                      (shippmentFilter && shippmentFilter.person_name) || ""
                    }
                    {...(shippmentFilter &&
                      shippmentFilter.person_name && {
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
                    value={
                      (shippmentFilter && shippmentFilter.person_lastname) || ""
                    }
                    {...(shippmentFilter &&
                      shippmentFilter.person_lastname && {
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
                    value={(shippmentFilter && shippmentFilter.person_id) || ""}
                    onChange={handleChange}
                    {...(shippmentFilter &&
                      shippmentFilter.person_id && {
                        InputLabelProps: {
                          shrink: true,
                        },
                      })}
                  />
                </Box>
              </Paper>
            </>
          ) : null}
          {shippmentFilter && Object.keys(shippmentFilter).length !== 0 && (
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
                onClick={() => setShippmentFilter({})}
              >
                Limpiar
              </Button>
            </Stack>
          )}
        </Box>
      </form>
    </>
  );
}

export default Envios;
