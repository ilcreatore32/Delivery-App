import React from "react";
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
} from "@mui/material";

/* Material UI Icons */
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";

function Servicios({ admin }) {
  const [Disponibility, setDisponibility] = useState("");
  const [Medium, setMedium] = useState("");

  const handleMediumChange = (e) => {
    setMedium(e.target.value);
  };

  const handleDisponibilityChange = (e) => {
    setDisponibility(e.target.value);
  };

  const mediums = [
    {
      value: "1",
      label: "Carro",
    },
    {
      value: "2",
      label: "Moto",
    },
  ];

  const disponibilities = [
    {
      value: "1",
      label: "Inmediata",
    },
    {
      value: "2",
      label: "No Disponible",
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
                id=""
                label="Inicio"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                color="secondary"
              />
              <TextField
                id=""
                label="Cierre"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
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
                id=""
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
              Medio
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField
                id=""
                select
                label="Medio"
                value={Medium}
                onChange={handleMediumChange}
                variant="filled"
                color="secondary"
              >
                {mediums.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
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
                id=""
                select
                label="Disponibilidad"
                value={Disponibility}
                onChange={handleDisponibilityChange}
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

export default Servicios;
