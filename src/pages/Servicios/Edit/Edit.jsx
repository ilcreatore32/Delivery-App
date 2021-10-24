import React from "react";

import { Box, Paper, Typography, TextField } from "@mui/material";

function Edit() {
  return (
    <>
      <Box
        component={Paper}
        variant="outlined"
        sx={{
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <Typography align="center">Editar Servicio de Transporte</Typography>

        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h6" component="span">
            Horario
          </Typography>
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
      </Box>
    </>
  );
}

export default Edit;
