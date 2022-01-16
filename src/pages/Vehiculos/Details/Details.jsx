import { useState, useEffect, useCallback } from "react";

/* React-Router */
import { Link, useParams } from "react-router-dom";

/* API */
import { GetOneService, GetOneVehicle } from "../../../api/Get";

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
  Button,
} from "@mui/material";

/* Material UI Icons */
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/* Components */
import AppTabs from "../../../components/AppTabs/AppTabs";
import Spinner from "../../../components/Spinner/Spinner";
import { format, parse } from "date-fns";

function Details() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const { id } = useParams();

  const fetchVehicle = useCallback(async () => {
    await setLoading(true);
    try {
      const response = await GetOneVehicle(id);
      await setVehicle(response);
    } catch (error) {
      console.log(error);
    }
    await setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchVehicle();
  }, [fetchVehicle]);

  return (
    <>
      <AppTabs />
      <Paper
        elevation={3}
        sx={{
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <Typography align="center" variant="h4" component="h2">
          Detalles de Vehículo
        </Typography>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ margin: "2rem 0" }}
        >
          <Table>
            <TableBody>
              {vehicle?.Vehiculo_Matricula && (
                <TableRow>
                  <TableCell component="th">
                    Placa
                  </TableCell>
                  <TableCell align="center">
                      {vehicle?.Vehiculo_Matricula}
                  </TableCell>
                </TableRow>

              )}
              <TableRow>
                <TableCell component="th">Tipo</TableCell>
                <TableCell align="center">{vehicle?.MT_Nombre}</TableCell>
              </TableRow>
              {vehicle?.Vehiculo_Marca && (
                <TableRow>
                  <TableCell component="th">Marca</TableCell>
                  <TableCell align="center">
                    {vehicle?.Vehiculo_Marca}
                  </TableCell>
                </TableRow>
              )}
              {vehicle?.Vehiculo_Modelo && (
                <TableRow>
                  <TableCell component="th">Modelo</TableCell>
                  <TableCell align="center">
                    {vehicle?.Vehiculo_Modelo}
                  </TableCell>
                </TableRow>
              )}
              {vehicle?.Vehiculo_Anio && (
                <TableRow>
                  <TableCell component="th">Año</TableCell>
                  <TableCell align="center">{vehicle?.Vehiculo_Anio}</TableCell>
                </TableRow>
              )}
              {vehicle?.Vehiculo_Pasajeros && (
                <TableRow>
                  <TableCell component="th">Capacidad de Pasajeros</TableCell>
                  <TableCell align="center">
                    {vehicle?.Vehiculo_Pasajeros}
                  </TableCell>
                </TableRow>
              )}
              {vehicle?.Vehiculo_CapacidadCarga && (
                <TableRow>
                  <TableCell component="th">Capacidad de Carga</TableCell>
                  <TableCell align="center">
                    {vehicle?.Vehiculo_CapacidadCarga}Kg
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </>
  );
}

export default Details;

/**
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "100%", padding: ".5rem" }}>
          <Paper sx={{ padding: "1rem" }} variant="outlined">
            <Box>
              <Typography align="center" variant="h4" component="h1">
                Detalles del Servicio de Transporte
              </Typography>
              
          
              
              <Box
                sx={{
                  padding: "1rem",
                }}
              >
                <Typography align="center" variant="h6" component="h3">
                  Envíos Asumidos
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Ubicación</TableCell>
                        <TableCell align="center">Productos</TableCell>
                        <TableCell align="center">Valor del Pedido</TableCell>
                        <TableCell align="center">Peso Total</TableCell>
                        <TableCell align="center">Fecha del Pedido</TableCell>
                        <TableCell align="center">Estatus</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          DC, Libertador, Sucre
                        </TableCell>
                        <TableCell align="center">Arroz 1Kg x3</TableCell>
                        <TableCell align="center">50</TableCell>
                        <TableCell align="center">3 Kg</TableCell>
                        <TableCell align="center">05-05-2005</TableCell>
                        <TableCell align="center">Aceptado</TableCell>
                        <TableCell align="center">
                          <IconButton size="small">
                            <VisibilityTwoToneIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
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
            <Typography align="center" variant="h4" component="h4">
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
                    <TableCell component="th">Cédula</TableCell>
                    <TableCell align="center">27598116</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Nombres</TableCell>
                    <TableCell align="center">Weishler Joice</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Apellidos</TableCell>
                    <TableCell align="center">Berman Torres</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Correo Electronico</TableCell>
                    <TableCell align="center">
                      ilCreatore321@gmail.com
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Telefonos</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => setOpen(!open)}>
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
            <Box
              component={Paper}
              variant="outlined"
              sx={{
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Typography align="center" variant="h6" component="h5">
                Acciones:
              </Typography>
              <Button>Cambiar Disponibilidad</Button>
              <Button component={Link} to={`/Servicios/Editar/${id}`}>
                Editar
              </Button>
              <Button>Eliminar</Button>
            </Box>
          </Paper>
        </Box>
      </Box>
 */
