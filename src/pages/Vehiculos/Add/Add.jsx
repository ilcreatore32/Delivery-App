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
  MenuItem,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} />;
});

const CustomStack = (props) => {
  return (
    <Stack
      {...props}
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 2 }}
      sx={{ padding: "1rem 0" }}
    >
      {props.children}
    </Stack>
  );
};

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
        maxWidth="md"
        fullWidth
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
            <CustomStack>
              <TextField
                id=""
                name=""
                select
                label="Tipo de Vehiculo"
                variant="filled"
                fullWidth
              >
                {["Carro", "Camion", "Moto"].map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id=""
                name=""
                select
                label="Marca"
                variant="filled"
                fullWidth
              >
                {["Ford", "Audi", "Toyota"].map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id=""
                name=""
                select
                label="Modelo"
                variant="filled"
                fullWidth
              >
                {["Fiesta", "Fost", "Highlander"].map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
            </CustomStack>
            <CustomStack>
              <TextField
                id=""
                name=""
                select
                label="Año del Vehiculo"
                variant="filled"
                fullWidth
              >
                {["1899", "2000", "2021"].map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
              <TextField id="" label="Matricula" variant="filled" />
            </CustomStack>
            <CustomStack>
              <TextField
                id=""
                name=""
                type="number"
                label="Minimo de Pasajeros"
                variant="filled"
                fullWidth
              />
              <TextField
                id=""
                name=""
                type="number"
                label="Maximo de Pasajeros"
                variant="filled"
                fullWidth
              />
            </CustomStack>
            <CustomStack>
              <TextField
                id=""
                name=""
                type="number"
                label="Minimo de Carga"
                variant="filled"
                fullWidth
              />
              <TextField
                id=""
                name=""
                type="number"
                label="Maximo de Carga"
                variant="filled"
                fullWidth
              />
            </CustomStack>
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
