import { useState, forwardRef } from "react";

/* API */
import { GetUbication } from "../../../api/Get";

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
  InputAdornment,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/* Components */
import Spinner from "../../../components/Spinner/Spinner";

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

  const [federalEntities, setFederalEntities] = useState([]);
  const [federalEntity, setFederalEntity] = useState("");
  const [loadingFederalEntities, setLoadingFederalEntities] = useState(false);

  const [municipalities, setMunicipalities] = useState([]);
  const [municipality, setMunicipality] = useState("");
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  const [parishes, setParishes] = useState([]);
  const [parish, setParish] = useState("");
  const [loadingParishes, setLoadingParishes] = useState(false);

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
  };

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
        <DialogTitle>{"Creación de Servicio"}</DialogTitle>
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
              Por favor, ingrese los datos del Servicio.
            </Typography>
          </DialogContentText>
          <Grid>
            <CustomStack>
              <TextField
                id=""
                name=""
                select
                label="Metodo de Transporte"
                variant="filled"
                fullWidth
              >
                {["Carro", "bicicleta", "Patineta"].map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id=""
                name=""
                select
                label="Disponibilidad"
                variant="filled"
                fullWidth
              >
                {["Inmediata", "No disponnible"].map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Referencia"
                type="number"
                variant="filled"
                fullWidth
              />
            </CustomStack>
            <CustomStack>
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
            </CustomStack>
            <CustomStack>
              <TextField
                id=""
                label="Mínimo"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                color="secondary"
              />
              <TextField
                id=""
                label="Maximo"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                color="secondary"
              />
            </CustomStack>
            <CustomStack>
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
