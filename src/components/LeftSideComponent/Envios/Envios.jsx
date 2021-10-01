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
  Typography,
  Paper,
} from "@mui/material";

/* Material UI Icons */
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";

function Envios({ asumidos, admin }) {
  const [Status, setStatus] = useState("Activo");

  const options = [
    {
      id: 1,
      value: "Activo",
      label: "Activo",
    },
    {
      id: 2,
      value: "Pendiente",
      label: "Pendiente",
    },
  ];

  const handleChange = (e) => {
    setStatus(e.target.value);
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
                id=""
                label="Estado"
                variant="filled"
                color="secondary"
              />
              <TextField
                id=""
                label="Municipio"
                variant="filled"
                color="secondary"
              />
              <TextField
                id=""
                label="Parroquia"
                variant="filled"
                color="secondary"
              />
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
                id=""
                label="Mínima"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                color="secondary"
                size="small"
              />
              <TextField
                id=""
                label="Maxima"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                color="secondary"
                size="small"
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
                id=""
                label="Mínima"
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
              />
              <TextField
                id=""
                label="Maxima"
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
                id=""
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
              />
              <TextField
                id=""
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
                  Estado del Envio
                </Typography>
                <TextField
                  id=""
                  select
                  label="Estado del Envio"
                  value={Status}
                  onChange={handleChange}
                  helperText="Selecciona el Estado"
                  variant="filled"
                  color="secondary"
                >
                  {options.map(({ id, value, label }) => (
                    <MenuItem key={id} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </TextField>
              </Paper>
            </>
          ) : null}
          {admin ? (
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

export default Envios;
