import React from "react";

/* Font-Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

/* Material UI */
import {
  TextField,
  Box,
  InputAdornment,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";

function Pagos() {
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
              Método
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField label="Método" variant="filled" color="secondary" />
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
              <TextField label="Desde" variant="filled" color="secondary" />
              <TextField label="Hasta" variant="filled" color="secondary" />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Monto
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
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
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Estado
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField type="text" variant="filled" color="secondary" />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Referencia
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField variant="filled" color="secondary" />
            </Box>
          </Paper>

          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Usuario
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateRows: "repeat(3, 1fr)",
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
        </Box>
      </Form>
    </>
  );
}

export default Pagos;
