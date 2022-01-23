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
  Input,
  MenuItem,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";

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
      {/* <IconButton onClick={handleClickOpen}>
        <AddCircleTwoToneIcon color="primary" />
      </IconButton> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        onClose={handleClose}
        component="form"
      >
        <DialogTitle>{"Creación de Usuario"}</DialogTitle>
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
              Por favor, ingrese los datos del Usuario.
            </Typography>
          </DialogContentText>
          <Grid>
            <CustomStack>
              <TextField label="Cédula" variant="filled" fullWidth />
              <TextField label="Nombre" variant="filled" fullWidth />
              <TextField label="Apellido" variant="filled" fullWidth />
            </CustomStack>
            <CustomStack>
              <TextField
                label="Correo Electronico"
                variant="filled"
                type="email"
                fullWidth
                placeholder="something@example.com"
              />
              <TextField
                label="Contraseña"
                variant="filled"
                type="password"
                fullWidth
              />
              <TextField
                label="Confirmar Contraseña"
                variant="filled"
                type="password"
                fullWidth
              />
            </CustomStack>
            <CustomStack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" component="span">
                  Comprobante Documento de Identidad
                </Typography>
                <label htmlFor="file">
                  <Input
                    accept="image/*"
                    id="file"
                    type="file"
                    sx={{ display: "none" }}
                  />
                  <IconButton aria-label="Subir Archivo" component="span">
                    <UploadFileTwoToneIcon size="large" />
                  </IconButton>
                </label>
              </Box>
              <TextField
                id=""
                name=""
                select
                label="Tipo de Usuario"
                variant="filled"
                fullWidth
              >
                {["Cliente", "Transportista", "Administrador"].map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
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
