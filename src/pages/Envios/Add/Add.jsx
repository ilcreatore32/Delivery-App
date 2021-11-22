import React, { useState } from "react";

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
  Divider,
  Typography,
  TextField,
  Autocomplete,
  Stack,
  Grid,
  Badge,
  Chip,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} />;
});

const options = ["harina", "res", "pan", "agua"];

function Add() {
  const [open, setOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenFile = () => {
    setOpenFile(true);
  };

  const handleCloseFile = () => {
    setOpenFile(false);
  };

  const handleAddProduct = (e) => {
    let value = document.getElementsByName("quantity")[0].value;
    let product = {
      name: inputValue,
      quantity: value[0],
    };
    setProducts([...products, product]);
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
        maxWidth="sm"
        onClose={handleClose}
        component="form"
      >
        <DialogTitle>{"Creación de Envio"}</DialogTitle>
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
              Por favor, ingrese los datos del envío.
            </Typography>
            <Divider orientation="vertical" flexItem />
            <IconButton onClick={handleClickOpenFile}>
              <UploadFileTwoToneIcon size="large" />
            </IconButton>
          </DialogContentText>
          <Grid>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{ padding: "1rem 0" }}
            >
              <TextField label="Ciudad" variant="filled"></TextField>
              <TextField label="Municipio" variant="filled"></TextField>
              <TextField label="Parroquia" variant="filled"></TextField>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{ padding: "1rem 0" }}
            >
              <TextField
                label="Valor"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              ></TextField>
              <TextField
                label="Precio"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              ></TextField>
            </Stack>
          </Grid>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            sx={{ padding: "1rem 0" }}
          >
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={options}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Producto"
                  variant="filled"
                  type="text"
                  id="productToSave"
                  name="productToSave"
                />
              )}
            />
            <TextField
              label="Cantidad"
              variant="filled"
              type="number"
              id="quantity"
              name="quantity"
            />
            <IconButton>
              <AddCircleTwoToneIcon
                size="large"
                onClick={handleAddProduct}
                color="primary"
              />
            </IconButton>
          </Stack>
          <Box
            sx={{
              gap: "1rem",
              display: "flex",
              justifyContent: "center",
              margin: ".7rem",
            }}
          >
            <Typography variant="subtitle2" component="h3">
              Productos agregados al Envio
            </Typography>
            <Badge badgeContent={products.length} color="primary" />
          </Box>
          <Grid
            sx={{ margin: "1rem auto", flexWrap: "wrap", gap: ".3rem" }}
            container
          >
            {products.map((product, index) => {
              return (
                <Chip
                  label={`${product.name} ${product.quantity}`}
                  deleteIcon={<DeleteTwoToneIcon color="primary" />}
                  variant="outlined"
                  onDelete={() => {
                    products.splice(index, 1);
                    console.log(product.quantity)
                    setProducts([...products]);
                  }}
                />
              );
            })}
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
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
          <Button variant="outlined" type="submit">
            Guardar
          </Button>
        </Box>
      </Dialog>
      {/* File Upload */}
      <Dialog
        open={openFile}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        onClose={handleCloseFile}
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
          <Button onClick={handleCloseFile} variant="text">
            Cancelar
          </Button>
          <Button variant="text">Guardar</Button>
        </Box>
      </Dialog>
    </>
  );
}

export default Add;
