import { useState, forwardRef } from "react";

/* Material UI */
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Fade,
  Typography,
  TextField,
  Stack,
  Grid,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} />;
});

function Add() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <AddCircleTwoToneIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        onClose={handleClose}
        component="form"
      >
        <DialogTitle>{"Creación de Vehiculo"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignContent: "center",
              gap: "1rem",
              margin: "1rem 0",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" component="h2" sx={{ flexGrow: 1 }}>
              Por favor, ingrese los datos del Vehiculo.
            </Typography>
          </DialogContentText>
          <Grid>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{ padding: "1rem 0" }}
            >
              <TextField
                label="Monto"
                type="number"
                variant="filled"
              ></TextField>
              <TextField label="Fecha" type="date" variant="filled"></TextField>
              <TextField label="Metodo de Pago" variant="filled"></TextField>
            </Stack>
          </Grid>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
            gap: "1rem",
            margin: "1rem 0",
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="outlined" type="submit">
            Guardar
          </Button>
        </Box>
      </Dialog>
    </>
  );
}

export default Add;
