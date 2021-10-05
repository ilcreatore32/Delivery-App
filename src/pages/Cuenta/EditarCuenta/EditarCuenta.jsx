import React from "react";

/* Material UI */
import { Grid, Box, Typography, Button, TextField, Stack } from "@mui/material";

/* CSS */
import "./EditarCuenta.css";

function EditarCuenta() {
  return (
    <>
      <Grid className="account-page">
        <Grid align="center">
          <Box sx={{ margin: ".5rem 0" }}>
            <Typography variant="h4" component="h2">
              Editar Cuenta
            </Typography>
            <Box component="form" sx={{ margin: "1rem 0" }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <TextField
                  label="Cédula"
                  variant="filled"
                  color="secondary"
                  size="small"
                  type="number"
                />
                <TextField
                  label="Nombre"
                  variant="filled"
                  color="secondary"
                  size="small"
                />
                <TextField
                  label="Apellido"
                  variant="filled"
                  color="secondary"
                  size="small"
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <TextField
                  label="Correo Electronico"
                  variant="filled"
                  color="secondary"
                  size="small"
                  type="email"
                />
                <TextField
                  label="Nombre"
                  variant="filled"
                  color="secondary"
                  size="small"
                />
                <TextField
                  label="Apellido"
                  variant="filled"
                  color="secondary"
                  size="small"
                />
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem 2rem",
            }}
          >
            <Button color="error" variant="outlined">
              Cancel
            </Button>
            <Button color="success" variant="outlined">
              Guardar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default EditarCuenta;
