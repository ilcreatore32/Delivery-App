import React from "react";
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

function Vehiculos({ admin }) {
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

  const [MinYear, setMinYear] = useState(minYears[0]);
  const [MaxYear, setMaxYear] = useState(maxYears[0]);
  const handleMinYearChange = (e) => {
    setMinYear(e.target.value);
  };
  const handleMaxYearChange = (e) => {
    setMaxYear(e.target.value);
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
              Vehiculo
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <TextField
                id=""
                label="Tipo"
                variant="filled"
                color="secondary"
              />
              <TextField
                id=""
                label="Marca"
                variant="filled"
                color="secondary"
              />
              <TextField
                id=""
                label="Modelo"
                variant="filled"
                color="secondary"
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
              <TextField
                id=""
                select
                label="Estado del Envío"
                value={MinYear}
                onChange={handleMinYearChange}
                variant="filled"
                color="secondary"
              >
                {minYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id=""
                select
                label="Estado del Envío"
                value={MaxYear}
                onChange={handleMaxYearChange}
                variant="filled"
                color="secondary"
              >
                {maxYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
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
                id=""
                label="Mínimos"
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
              />
              <TextField
                id=""
                label="Maximos"
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
                id=""
                label="Mínimos"
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
              />
              <TextField
                id=""
                label="Maximos"
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
                id=""
                label="Matricula"
                variant="filled"
                color="secondary"
              />
            </Box>
          </Paper>
          {admin === "A"? (
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
                    id=""
                    label="Nombres"
                    variant="filled"
                    color="secondary"
                  />
                  <TextField
                    id=""
                    label="Apellidos"
                    variant="filled"
                    color="secondary"
                  />
                  <TextField
                    id=""
                    label="Cedula"
                    variant="filled"
                    color="secondary"
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
