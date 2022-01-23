import React, { useContext } from "react";
import { useState } from "react";

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
  Paper,
  Typography,
} from "@mui/material";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";
import { FilterContext } from "../../../context/FilterContext";
import { DesktopDatePicker } from "@mui/lab";
import { GetConveyances } from "../../../api/Get";
import Spinner from "../../Spinner/Spinner";

function Vehiculos({ admin }) {
  const { vehicleFilter, setVehicleFilter } = useContext(FilterContext);
  const [conveyanceTypes, setConveyanceTypes] = useState([]);
  const [loadingConveyanceTypes, setLoadingConveyanceTypes] = useState(false);

  var today = new Date();
  var year = today.getFullYear();
  var minYears = [];
  var maxYears = [];

  for (let x = 1950; x <= year; x++) {
    minYears.push(x);
  }
  for (let x = year; x >= 1950; x--) {
    maxYears.push(x);
  }

  const handleChange = (e) => {
    setVehicleFilter({
      ...vehicleFilter,
      [e.target.name]: e.target.value,
    });
  };
  const getConveyanceTypes = () => {
    setLoadingConveyanceTypes(true);
    GetConveyances().then((res) => {
      setConveyanceTypes(res);
      setLoadingConveyanceTypes(false);
    });
  };

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
              Vehículo
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <TextField
                id="conveyance"
                name="conveyance"
                select
                label="Tipo"
                onChange={handleChange}
                color="primary"
                variant="filled"
                SelectProps={{
                  onOpen: getConveyanceTypes,
                }}
                value={(vehicleFilter && vehicleFilter.conveyance) || ""}
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
                id="brand"
                name="brand"
                label="Marca"
                color="primary"
                variant="filled"
                fullWidth
                value={(vehicleFilter && vehicleFilter.brand) || ""}
                onChange={handleChange}
              />
              <TextField
                id="model"
                name="model"
                label="Modelo"
                variant="filled"
                color="primary"
                fullWidth
                value={(vehicleFilter && vehicleFilter.model) || ""}
                onChange={handleChange}
              />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Año
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <DesktopDatePicker
                id="min_year"
                name="min_year"
                label="Mínimo"
                color="primary"
                fullWidth
                views={["year"]}
                minDate={new Date("1951-01-01")}
                maxDate={new Date()}
                inputFormat="yyyy"
                value={
                  (vehicleFilter &&
                    (() => {
                      let date = new Date(vehicleFilter.min_year, 0);
                      console.log(date);
                      return date;
                    })()) ||
                  ""
                }
                onChange={(date) => {
                  let year = new Date(date);
                  console.log(year.getFullYear());
                  return setVehicleFilter({
                    ...vehicleFilter,
                    min_year: year.getFullYear(),
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="primary"
                    variant="filled"
                    error={false}
                  />
                )}
              />
              <DesktopDatePicker
                id="max_year"
                name="max_year"
                label="Máximo"
                fullWidth
                views={["year"]}
                minDate={new Date("1951-01-01")}
                maxDate={new Date()}
                inputFormat="yyyy"
                value={
                  (vehicleFilter &&
                    (() => {
                      let date = new Date(vehicleFilter.max_year, 0);
                      console.log(date);
                      return date;
                    })()) ||
                  ""
                }
                onChange={(date) => {
                  let year = new Date(date);
                  console.log(year.getFullYear());
                  return setVehicleFilter({
                    ...vehicleFilter,
                    max_year: year.getFullYear(),
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="primary"
                    variant="filled"
                    error={false}
                  />
                )}
              />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Pasajeros
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                id="min_passengers"
                name="min_passengers"
                label="Mínimos"
                type="number"
                value={(vehicleFilter && vehicleFilter.min_passengers) || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                variant="filled"
                color="primary"
              />
              <TextField
                id="max_passengers"
                name="max_passengers"
                label="Máximos"
                type="number"
                value={(vehicleFilter && vehicleFilter.max_passengers) || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                variant="filled"
                color="primary"
              />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Carga
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
                color="primary"
                onChange={handleChange}
                value={vehicleFilter?.min_weight}
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
                color="primary"
                onChange={handleChange}
                value={vehicleFilter?.max_weight}
              />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Matricula
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField
                id="plate"
                name="plate"
                label="Matrícula"
                variant="filled"
                color="primary"
                onChange={handleChange}
                value={(vehicleFilter && vehicleFilter.plate) || ""}
                {...(vehicleFilter &&
                  vehicleFilter.plate && {
                    InputLabelProps: {
                      shrink: true,
                    },
                  })}
              />
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
                    color="primary"
                    onChange={handleChange}
                    value={(vehicleFilter && vehicleFilter.person_name) || ""}
                    {...(vehicleFilter && vehicleFilter.person_name && {
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
                    color="primary"
                    onChange={handleChange}
                    value={(vehicleFilter && vehicleFilter.person_lastname) || ""}
                    {...(vehicleFilter && vehicleFilter.person_lastname && {
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
                    color="primary"
                    type="number"
                    value={(vehicleFilter && vehicleFilter.person_id) || ""}
                    onChange={handleChange}
                    {...(vehicleFilter && vehicleFilter.person_id && {
                      InputLabelProps: {
                        shrink: true,
                      },
                    })}
                  />
                </Box>
              </Paper>
            </>
          ) : null}
        </Box>
      </Form>
    </>
  );
}

export default Vehiculos;
