import React from "react";
import { useState } from "react";

/* Material UI */
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
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
            rowGap: 3,
            margin: "1rem",
            padding: "1rem 0",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <TextField id="" label="Estado" variant="filled" />
            <TextField id="" label="Municipio" variant="filled" />
            <TextField id="" label="Parroquia" variant="filled" />
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 2,
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
            />
            <TextField
              id=""
              label="Cierre"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 2,
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
            />
          </Box>

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
            >
              {mediums.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

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
            >
              {disponibilities.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {admin ? (
            <>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                <TextField id="" label="Nombres" variant="filled" />
                <TextField id="" label="Apellidos" variant="filled" />
                <TextField id="" label="Cedula" variant="filled" />
              </Box>
            </>
          ) : null}
        </Box>
      </Form>
    </>
  );
}

export default Servicios;
