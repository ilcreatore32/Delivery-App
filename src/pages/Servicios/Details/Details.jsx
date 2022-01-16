import { useState, useEffect, useCallback } from "react";

/* React-Router */
import { Link, useParams } from "react-router-dom";

/* API */
import { GetOneService } from "../../../api/Get";

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
  const [service, setService] = useState({});
  const [areas, setAreas] = useState([]);
  const [shippments, setShippments] = useState([]);
  const { id } = useParams();

  const fetchService = useCallback(async () => {
    await setLoading(true);
    try {
      const response = await GetOneService(id);
      await setService(response.serviceDetails);
      await setAreas(response.areas);
      setShippments(response.shippments);
    } catch (error) {
      console.log(error);
    }
    await setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

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
          Detalles de Servicio
        </Typography>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ margin: "2rem 0" }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th">Horario</TableCell>
                <TableCell align="center">
                  {`${
                    service?.ST_HorarioIni &&
                    format(
                      parse(service?.ST_HorarioIni, "HH:mm:ss", new Date()),
                      "hh:mm aaaaa'm'"
                    )
                  } a ${
                    service?.ST_HorarioFin &&
                    format(
                      parse(service?.ST_HorarioFin, "HH:mm:ss", new Date()),
                      "hh:mm aaaaa'm'"
                    )
                  }`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">Disponibilidad</TableCell>
                <TableCell align="center">
                  {service?.ST_Status === "D" ? "Disponible" : "No Disponible"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">Precio</TableCell>
                <TableCell align="center">{service?.ST_Precio}$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">Medio de Transporte</TableCell>
                <TableCell align="center">{service?.MT_Nombre}</TableCell>
              </TableRow>
              {service?.Vehiculo_Marca && (
                <TableRow>
                  <TableCell component="th">Marca</TableCell>
                  <TableCell align="center">
                    {service?.Vehiculo_Marca}
                  </TableCell>
                </TableRow>
              )}
              {service?.Vehiculo_Modelo && (
                <TableRow>
                  <TableCell component="th">Modelo</TableCell>
                  <TableCell align="center">
                    {service?.Vehiculo_Modelo}
                  </TableCell>
                </TableRow>
              )}
              {service?.Vehiculo_Anio && (
                <TableRow>
                  <TableCell component="th">Año</TableCell>
                  <TableCell align="center">{service?.Vehiculo_Anio}</TableCell>
                </TableRow>
              )}
              {service?.Vehiculo_Pasajeros && (
                <TableRow>
                  <TableCell component="th">Capacidad de Pasajeros</TableCell>
                  <TableCell align="center">
                    {service?.Vehiculo_Pasajeros}
                  </TableCell>
                </TableRow>
              )}
              {service?.Vehiculo_CapacidadCarga && (
                <TableRow>
                  <TableCell component="th">Capacidad de Carga</TableCell>
                  <TableCell align="center">
                    {service?.Vehiculo_CapacidadCarga}Kg
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            padding: ".5rem",
          }}
        >
          <Typography variant="subtitle1" component="h2">
            Descripción del Servicio:
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              padding: "1rem",
            }}
          >
            <Typography variant="body1" component="p">
              {service?.ST_Descripcion}
            </Typography>
          </Paper>
        </Box>
        <Box
          sx={{
            padding: "1rem",
          }}
        >
          <Typography align="center" variant="h6" component="h3">
            Áreas de Operaciones
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Entidad Federal</TableCell>
                  <TableCell align="center">Municipio</TableCell>
                  <TableCell align="center">Parroquia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {areas.map((area) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{area?.EF_Nombre}</TableCell>
                    <TableCell align="center">
                      {area?.Municipio_Nombre}
                    </TableCell>
                    <TableCell align="center">
                      {area?.Parroquia_Nombre}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>
          {shippments.length > 0 && (
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
                    <TableCell align="center">Valor Total</TableCell>
                    <TableCell align="center">Peso Total</TableCell>
                    <TableCell align="center">Fecha del Pedido</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {shippments.map((s) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{`${s?.EF_Nombre}, ${s?.Municipio_Nombre}, ${s?.Parroquia_Nombre}`}</TableCell>
                      <TableCell align="center">
                        {s?.Productos_Envio}
                      </TableCell>
                      <TableCell align="center">
                        {s?.SE_ValorTotal}
                      </TableCell>
                      <TableCell align="center">
                        {s?.SE_PesoTotal}
                      </TableCell>
                      <TableCell align="center">
                        {s?.SE_Fecha.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">
                        {s?.SE_Status}
                      </TableCell>
                      <TableCell align="center">
                        <Button component={Link} to={`/Envios/Detalles/${s?.SE_Id}`}>
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
  
          </Box>
          )}
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
