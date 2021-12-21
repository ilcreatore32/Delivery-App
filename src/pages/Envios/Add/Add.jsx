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
  Tooltip,
  MenuItem,
  Paper,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

/* Components */
import Spinner from "../../../components/Spinner/Spinner";
import { GetProducts, GetUbication } from "../../../api/Get";

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

  const [productsTypes, setProductsTypes] = useState([]);
  const [loadingProductsTypes, setLoadingProductsTypes] = useState(false);
  const [productType, setProductType] = useState("");
  const [productTypeInput, setProductTypeInput] = useState("");

  const [productsList, setProductsList] = useState([])
  const [loadingProductsList, setLoadingProductsList] = useState(false);
  const [productSelected, setProductSelected] = useState("");
  const [productSelectedInput, setProductSelectedInput] = useState("");

  const [federalEntities, setFederalEntities] = useState([]);
  const [federalEntity, setFederalEntity] = useState("");
  const [loadingFederalEntities, setLoadingFederalEntities] = useState(false);

  const [municipalities, setMunicipalities] = useState([]);
  const [municipality, setMunicipality] = useState("");
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  const [parishes, setParishes] = useState([]);
  const [parish, setParish] = useState("");
  const [loadingParishes, setLoadingParishes] = useState(false);

  const [shippmentDetails, setShippmentDetails] = useState({});

  const getFederalEntities = () => {
    setLoadingFederalEntities(true);
    GetUbication("federal_entity").then((res) => {
      setFederalEntities(res);
      setLoadingFederalEntities(false);
    });
  };

  const getMunicipities = (federal_entity) => {
    if (!federal_entity) return;
    setLoadingMunicipalities(true);
    GetUbication("municipality", federal_entity).then((res) => {
      setMunicipalities(res);
      setLoadingMunicipalities(false);
    });
  };

  const getParishes = (municipality) => {
    if (!municipality) return;
    setLoadingParishes(true);
    GetUbication("parish", null, municipality).then((res) => {
      setParishes(res);
      setLoadingParishes(false);
    });
  };

  const getProductsTypes = async () => {
    if (productsTypes && productsTypes.length > 0) return;
    setLoadingProductsTypes(true);
    let prod = await GetProducts("type_product");
    setProductsTypes(prod);
    setLoadingProductsTypes(false);
  };

  const getProductsList = async (type_product) => {
    if (productsList && productsList.length > 0) return;
    setLoadingProductsList(true);
    let prod = await GetProducts("product", type_product);
    setProductsList(prod);
    setLoadingProductsList(false);
  };

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
      quantity: value,
    };
    setProducts([...products, product]);
  };

  const handleDeleteProduct = () => {
    setProducts([]);
  };

  const handleFederalEntityChange = (e) => {
    setFederalEntity(e.target.value);
    setMunicipalities([]);
    setParishes([]);
  };

  const handleMunicipalityChange = (e) => {
    setMunicipality(e.target.value);
    setParishes([]);
  };

  const handleParishChange = (e) => {
    setParish(e.target.value);
    setShippmentDetails({
      ...shippmentDetails,
      [e.target.name]: e.target.value,
    });
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
            <Tooltip
              title="Proximamente estara disponible la opcion de archivo"
              arrow
            >
              <span>
                <IconButton disabled onClick={handleClickOpenFile}>
                  <UploadFileTwoToneIcon size="large" />
                </IconButton>
              </span>
            </Tooltip>
          </DialogContentText>
          <Grid>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{ padding: "1rem 0" }}
            >
              <TextField
                id="federal_entity"
                select
                label="Entidad Federal"
                value={federalEntity}
                onChange={handleFederalEntityChange}
                variant="filled"
                SelectProps={{
                  onOpen: getFederalEntities,
                }}
                fullWidth
              >
                {federalEntities ? (
                  federalEntities.map((federalEntity) => (
                    <MenuItem
                      key={federalEntity.EF_Id}
                      value={federalEntity.EF_Id}
                    >
                      {federalEntity.EF_Nombre}
                    </MenuItem>
                  ))
                ) : loadingFederalEntities ? (
                  <MenuItem>
                    <Spinner loading={loadingFederalEntities} />
                  </MenuItem>
                ) : (
                  <MenuItem value={0}>Hubo un error</MenuItem>
                )}
              </TextField>
              <TextField
                id="municipality"
                select
                label="Municipio"
                value={municipality}
                onChange={handleMunicipalityChange}
                variant="filled"
                SelectProps={{
                  onOpen: () => getMunicipities(federalEntity),
                }}
                fullWidth
                {...(federalEntity
                  ? {
                      disabled: false,
                    }
                  : { disabled: true })}
              >
                {municipalities ? (
                  municipalities.map((municipality) => (
                    <MenuItem
                      key={municipality.Municipio_Id}
                      value={municipality.Municipio_Id}
                    >
                      {municipality.Municipio_Nombre}
                    </MenuItem>
                  ))
                ) : loadingMunicipalities ? (
                  <MenuItem>
                    <Spinner loading={loadingMunicipalities} />
                  </MenuItem>
                ) : (
                  <MenuItem value={0}>Hubo un error</MenuItem>
                )}
              </TextField>
              <TextField
                id="SE_ParroquiaId"
                select
                label="Parroquia"
                name="SE_ParroquiaId"
                value={parish}
                onChange={handleParishChange}
                variant="filled"
                SelectProps={{
                  onOpen: () => getParishes(municipality),
                }}
                fullWidth
                {...(municipality
                  ? {
                      disabled: false,
                    }
                  : { disabled: true })}
              >
                {parishes ? (
                  parishes.map((parish) => (
                    <MenuItem
                      key={parish.Parroquia_Id}
                      value={parish.Parroquia_Id}
                    >
                      {parish.Parroquia_Nombre}
                    </MenuItem>
                  ))
                ) : loadingParishes ? (
                  <MenuItem>
                    <Spinner loading={loadingParishes} />
                  </MenuItem>
                ) : (
                  <MenuItem value={0}>Hubo un error</MenuItem>
                )}
              </TextField>
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
              value={productType}
              inputValue={productTypeInput}
              options={productsTypes && productsTypes}
              openOnFocus={true}
              onOpen={() => {
                getProductsTypes();
              }}
              isOptionEqualToValue={(option, value) => option.Producto_Tipo === value.Producto_Tipo}
              onChange={(event, newValue) => {
                setProductSelected("");
                setProductsList([]);
                if (newValue === undefined || newValue === null)
                  return setProductType("");
                if (Object.keys(newValue).length === 0)
                  return setProductType("");
                setProductType(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setProductTypeInput(newInputValue);
              }}
              getOptionLabel={(option) => option.Producto_Tipo || ""}
              loading={loadingProductsTypes}
              loadingText={
                <Box sx={{ textAlign: "center" }}>
                  <Spinner loading={loadingProductsTypes} />
                </Box>
              }
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Producto"
                  variant="filled"
                  type="text"
                  id="product_type"
                  name="product_type"
                />
              )}
            />
            <Autocomplete
              value={productSelected}
              inputValue={productSelectedInput}
              options={productsList && productsList}
              openOnFocus={true}
              onOpen={() => {
                getProductsList(productType.Producto_Tipo);
              }}
              onChange={(event, newValue) => {
                if (newValue === undefined || newValue === null)
                  return setProductSelected("");
                if (Object.keys(newValue).length === 0)
                  return setProductSelected("");
                setProductSelected(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setProductSelectedInput(newInputValue);
              }}
              getOptionLabel={(option) => option.Producto_Nombre || ""} 
              loading={loadingProductsList}
              loadingText={
                <Box sx={{ textAlign: "center" }}>
                  <Spinner loading={loadingProductsList} />
                </Box>
              }
              {...(productType
                ? {
                    disabled: false,
                  }
                : { disabled: true })}
              sx={{ width: "100%" }}
              renderOption={(props, option) => (
                <li {...props}>
                  {option.Producto_Nombre}
                </li>
              )}
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
              justifyContent: "space-between",
              margin: ".7rem",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                gap: "1rem",
                display: "flex",
                margin: ".7rem",
              }}
            >
              <Typography variant="subtitle2" component="h3">
                Productos agregados al Envio
              </Typography>
              <Badge badgeContent={products.length} color="primary" />
            </Box>
            <Chip label="Vaciar Envio" onClick={handleDeleteProduct} />
          </Box>
          <Grid
            sx={{ margin: "1rem auto", flexWrap: "wrap", gap: ".3rem" }}
            container
          >
            {products.map((product, index) => {
              console.log(product);
              return (
                <Tooltip title={product.quantity} arrow>
                  <Chip
                    label={`${product.name}`}
                    deleteIcon={<DeleteTwoToneIcon />}
                    variant="outlined"
                    onDelete={() => {
                      products.splice(index, 1);
                      setProducts([...products]);
                    }}
                  />
                </Tooltip>
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
