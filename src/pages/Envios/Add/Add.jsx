import React from "react";

/* Material UI */
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Input,
  Fade,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} />;
});

function Add() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <AddCircleTwoToneIcon size="large" color="primary" />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        onClose={handleClose}
      >
        <DialogTitle>{"¿ Desea Agregar un Envio ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, seleccione un Archivo con los datos de los envios que
            desea agregar.
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                sx={{ display: "none" }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <UploadFileTwoToneIcon size="large" />
              </IconButton>
            </label>
          </Box>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
            margin: "1rem 0",
          }}
        >
          <Button onClick={handleClose} variant="text">
            Cancelar
          </Button>
          <Button variant="text">
            Guardar
          </Button>
        </Box>
      </Dialog>
    </>
  );
}

export default Add;
