import React from "react";

/* Material UI */
import { Paper, Box, Typography } from "@mui/material";

function Add() {
  return (
    <>
      <Box component={Paper} sx={{ margin: "1rem" }}>
        <Typography>Nuevo Servicio de Transporte</Typography>
      </Box>
    </>
  );
}

export default Add;
