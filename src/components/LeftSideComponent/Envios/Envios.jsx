import React from "react";
import { useState } from "react";

/* Font-Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

/* Material UI */
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuItem from "@mui/material/MenuItem";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";

function Envios({ asumidos, admin }) {
  const [Status, setStatus] = useState("Activo");

  const options = [
    {
      value: "1",
      label: "Activo",
    },
    {
      value: "2",
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
              label="Mínima"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
            <TextField
              id=""
              label="Maxima"
              type="date"
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
                    <FontAwesomeIcon icon={faAngleDown} />
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
                    <FontAwesomeIcon icon={faAngleUp} />
                  </InputAdornment>
                ),
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
                    <FontAwesomeIcon icon={faAngleDown} />
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
                    <FontAwesomeIcon icon={faAngleUp} />
                  </InputAdornment>
                ),
              }}
              variant="filled"
            />
          </Box>
          {asumidos ? (
            <>
              <TextField
                id=""
                select
                label="Estado del Envio"
                value={Status}
                onChange={handleChange}
                helperText="Selecciona el Estado"
                variant="filled"
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : null}
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

export default Envios;
