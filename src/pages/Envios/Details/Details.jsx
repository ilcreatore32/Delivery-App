import { useState, useEffect, useCallback } from "react";

/* API */
import { GetOneShippment } from "../../../api/Get";

/* React-Router */
import { useParams } from "react-router";

/* Material UI */
import {
  Box,
  Typography,
  IconButton,
  Paper,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Collapse,
  TableHead,
  Stack,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  ListItemButton,
} from "@mui/material";

import { styled } from "@mui/material/styles";

/* Material UI Icons */
import BookmarkAddTwoToneIcon from "@mui/icons-material/BookmarkAddTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowDown";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/* Components */
import Spinner from "../../../components/Spinner/Spinner";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
}));

function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [Offer, setOffer] = useState(false);
  const [SelectedOffer, setSelectedOffer] = useState(null);

  const [shippmentDetails, setShippmentDetails] = useState({});
  const [productsList, setproductsList] = useState([]);
  const [servicesAvailable, setServicesAvailable] = useState([]);

  const handleOffer = () => {
    setOffer(true);
  };

  const handleCloseOffer = () => {
    setOffer(false);
  };

  const handleSelectedOffer = (e) => {
    setSelectedOffer(e.target.value);
  };

  /*
  const [TransportistaAccepted, setTransportistaAccepted] = useState(true);

  const handleChange = (event) => {
    setTransportistaAccepted(event.target.checked);
  };
  */

  const fetchShippment = useCallback(async () => {
    await setLoading(true);
    try {
      const response = await GetOneShippment(id);
      const { shippmentDetails, productsList, servicesAvailable } =
        await response;
      await setShippmentDetails(shippmentDetails);
      await setproductsList(productsList);
      await setServicesAvailable(servicesAvailable);
    } catch (error) {
      console.log(error);
    }
    await setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchShippment();
  }, [fetchShippment]);

  return (
    <>
      {loading ? (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem auto",
            padding: ".5rem 1rem",
          }}
          variant="outlined"
        >
          <Spinner loading={loading} />
        </Paper>
      ) : (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            sx={{
              margin: "1rem",
            }}
          >
            <Item xs={6} sm={8} md={8}>
              <Typography align="center" variant="h4" component="h1">
                Detalles del Envío
              </Typography>
              <TableContainer sx={{ margin: "2rem 0" }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th">Fecha del Pedido</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.SE_Fecha}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Estado</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.SE_Status}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Valor Total</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.SE_ValorTotal}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Peso Total</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.SE_PesoTotal}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  padding: "1rem",
                }}
              >
                <Typography align="center" variant="h6" component="h2">
                  Productos
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Tipo</TableCell>
                        <TableCell align="center">Tamaño (cm)</TableCell>
                        <TableCell align="center">Peso (Kg)</TableCell>
                        <TableCell align="center">Cantidad</TableCell>
                        <TableCell align="center">Precio ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productsList.map((product) => {
                        return (
                          <>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">
                                {product.Producto_Nombre}
                              </TableCell>
                              <TableCell align="center">
                                {product.Producto_Tipo}
                              </TableCell>
                              <TableCell align="center">
                                {product.Producto_Tamano}
                              </TableCell>
                              <TableCell align="center">
                                {product.Producto_Peso}
                              </TableCell>
                              <TableCell align="center">
                                {product.ProductoSE_Cantidad}
                              </TableCell>
                              <TableCell align="center">
                                {product.Producto_Precio}
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box
                sx={{
                  padding: "1rem",
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  <ListSubheader
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Servicios de Transporte Ofertados{" "}
                    <IconButton onClick={handleOffer}>
                      <BookmarkAddTwoToneIcon color="secondary" size="small" />
                    </IconButton>
                  </ListSubheader>
                  {Offer ? (
                    <>
                      <Box
                        sx={{
                          margin: "2rem 3rem",
                        }}
                      >
                        <ListSubheader>
                          Ofrecer Servicios de Transporte
                        </ListSubheader>
                        <FormControl fullWidth>
                          <InputLabel id="offer">Sus Servicios</InputLabel>
                          <Select
                            labelId="offer"
                            id="offer"
                            variant="filled"
                            value={SelectedOffer}
                            label="Sus Servicios"
                            onChange={handleSelectedOffer}
                          >
                            <MenuItem value={1}>Carro</MenuItem>
                            <MenuItem value={2}>Moto</MenuItem>
                            <MenuItem value={3}>Camion</MenuItem>
                          </Select>
                        </FormControl>
                        <Box
                          sx={{
                            margin: ".5rem 0",
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            onClick={handleCloseOffer}
                            variant="outlined"
                            color="secondary"
                          >
                            Cancelar
                          </Button>
                          <Button variant="outlined" color="secondary">
                            Ofrecer Servicio
                          </Button>
                        </Box>
                      </Box>
                    </>
                  ) : null}
                  <Divider />
                  {servicesAvailable.map((service) => {
                    return (
                      <ListItem
                        key={service.ST_Id}
                        divider
                        secondaryAction={
                          <IconButton edge="end" aria-label="Eliminar Ofrecer">
                            <DeleteTwoToneIcon color="error" size="small" />
                          </IconButton>
                        }
                        disablePadding
                      >
                        <ListItemButton role={undefined}>
                          <ListItemIcon>
                            <BookmarkAddedTwoToneIcon color="secondary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${service.DatosMedio} - ${service.ST_Precio}$`}
                            secondary={`Horario: ${service.ST_HorarioIni} - ${service.ST_HorarioFin}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Item>
            <Item xs={6} sm={4} md={4}>
              <Typography align="center" variant="h4" component="h2">
                Detalles del Cliente
              </Typography>
              <TableContainer sx={{ margin: "1rem 0" }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th">Cédula</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.SE_PersonaId}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Nombre</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.Persona_Nombre}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Apellido</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.Persona_Apellido}
                      </TableCell>
                    </TableRow>
                    {shippmentDetails.Telefonos_Persona ? (
                      <TableRow>
                        <TableCell component="th">Telefonos</TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => setOpen(!open)}
                          >
                            {open ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Table size="small" aria-label="purchases">
                                <TableBody>
                                  {shippmentDetails.Telefonos_Persona.map(
                                    (tlf) => {
                                      return (
                                        <TableRow>
                                          <TableCell>{tlf}</TableCell>
                                        </TableRow>
                                      );
                                    }
                                  )}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell component="th">Telefonos</TableCell>
                        <TableCell align="center">No hay registro</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Stack>
        </>
      )}
    </>
  );
}

export default Details;

/*
<Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "100%", padding: ".5rem" }}>
          <Paper sx={{ padding: "1rem" }} variant="outlined">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={TransportistaAccepted}
                    onChange={handleChange}
                  />
                }
                label={TransportistaAccepted ? "Accepted" : "Refuse"}
              />
            </FormGroup>
            <Box>
              
              
              
              {TransportistaAccepted ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 0.5,
                      justifyContent: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <Typography variant="subtitle1" component="h4">
                      Estado del Envío:
                    </Typography>
                    <Typography variant="body2" component="p">
                      Esperando a que el transportista reciba los productos
                    </Typography>
                  </Box>
                  <Box
                    component={Paper}
                    variant="outlined"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "1rem 0",
                      padding: "2rem",
                      gap: "1rem",
                    }}
                  >
                    <Typography variant="subtitle1" component="h4">
                      ¿Confirma que ha entregado los Productos?
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <Button variant="outlined"> No </Button>
                      <Button variant="outlined"> Si </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  
                </>
              )}
            </Box>
          </Paper>
        </Box>
        <Box sx={{ width: "80%", padding: ".5rem" }}>
          <Paper
            sx={{
              padding: "1rem",
            }}
            variant="outlined"
          >
            
            {TransportistaAccepted ? (
              <>
                <Box
                  sx={{
                    padding: "1rem",
                  }}
                  variant="outlined"
                >
                  <Typography align="center" variant="h4" component="h2">
                    Detalles del Servicio de Transporte
                  </Typography>
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{ margin: "1rem 0" }}
                  >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th">
                            Medio de Transporte
                          </TableCell>
                          <TableCell align="center">Carro</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th">
                            Nombre del Vehiculo
                          </TableCell>
                          <TableCell align="center">Weishler Joice</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th">Horario</TableCell>
                          <TableCell align="center">De 7am a 8pm</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th">Precio</TableCell>
                          <TableCell align="center">50$</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                  }}
                  variant="outlined"
                >
                  <Typography align="center" variant="h4" component="h2">
                    Detalles del Transportista
                  </Typography>
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{ margin: "1rem 0" }}
                  >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th">Nombres</TableCell>
                          <TableCell align="center">Weishler Joice</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th">Apellidos</TableCell>
                          <TableCell align="center">Berman Torres</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th">Telefonos</TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={() => setOpen(!open)}
                            >
                              {open ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Table size="small" aria-label="purchases">
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>04242029818</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>04242596061</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="outlined">Cancelar Servicio</Button>
                  </Box>
                </Box>
              </>
            ) : null}
          </Paper>
        </Box>
      </Box>*/
