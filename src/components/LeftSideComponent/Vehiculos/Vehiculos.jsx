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
import MenuItem from "@mui/material/MenuItem";

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
            <TextField id="" label="Tipo" variant="filled" />
            <TextField id="" label="Marca" variant="filled" />
            <TextField id="" label="Modelo" variant="filled" />
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
              select
              label="Estado del Envio"
              value={MinYear}
              onChange={handleMinYearChange}
              variant="filled"
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
              label="Estado del Envio"
              value={MaxYear}
              onChange={handleMaxYearChange}
              variant="filled"
            >
              {maxYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
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
            />
          </Box>

          <Box
            sx={{
              display: "grid",
            }}
          >
            <TextField id="" label="Matricula" variant="filled" />
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

export default Vehiculos;
