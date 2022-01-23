import { useState, useEffect, useCallback, useContext } from "react";

/* React-Router */
import { Link, useParams } from "react-router-dom";

/* API */
import { GetOneService } from "../../../api/Get";

/* Material UI */
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableHead,
  IconButton,
} from "@mui/material";

/* Material UI Icons*/
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";

/* Components */
import AppTabs from "../../../components/AppTabs/AppTabs";
import Spinner from "../../../components/Spinner/Spinner";
import CustomProductsCell from "../../../models/CustomProductsCell";
import { format, parse } from "date-fns";
import { UserContext } from "../../../context/UserContextT";

function Details() {
  const { view_type } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState({});
  const [areas, setAreas] = useState([]);
  const [shippments, setShippments] = useState([]);
  const { id } = useParams();

  const fetchService = async (id, view) => {
    await setLoading(true);
    try {
      const response = await GetOneService(
        id,
        view === "C" ? "client" : "admin"
      );
      await setService(response.serviceDetails);
      await setAreas(response.areas);
      setShippments(response.shippments);
    } catch (error) {
      console.log(error);
    }
    await setLoading(false);
  };

  useEffect(() => {
    if (!id || !view_type) return;
    fetchService(id, view_type);
  }, [id, view_type]);

  return (
    <>
      <AppTabs />
      {loading ? (
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: ".3rem auto",
          }}
        >
          <Spinner loading={loading} />
        </Paper>
      ) : (
        <>
          <Paper
            variant="outlined"
            sx={{
              margin: "1rem 3rem",
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
                      {service?.ST_Status === "D"
                        ? "Disponible"
                        : "No Disponible"}
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
                      <TableCell align="center">
                        {service?.Vehiculo_Anio}
                      </TableCell>
                    </TableRow>
                  )}
                  {service?.Vehiculo_Pasajeros && (
                    <TableRow>
                      <TableCell component="th">
                        Capacidad de Pasajeros
                      </TableCell>
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
              <Typography align="center" variant="h6" component="h3" sx={{paddingBottom: "1.5rem"}}>
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
            {shippments?.length > 0 && (
              <Box
                sx={{
                  padding: "1rem",
                }}
              >
                <Typography align="center" variant="h6" component="h3" sx={{paddingBottom: "1.5rem"}}>
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
                            <CustomProductsCell thisRow={s} />
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
                            {s?.SE_Status === "E" && "Eliminado"}
                            {s?.SE_Status === "P" &&
                              "Pendiente de servicio transporte"}
                            {s?.SE_Status === "S" &&
                              "Servicio de transporte activo"}
                            {s?.SE_Status === "T" &&
                              "Producto entregado al transportista"}
                            {s?.SE_Status === "C" &&
                              "Producto entregado al cliente"}
                            {s?.SE_Status === "F" &&
                              "Transporte finalizado con exito"}
                            {s?.SE_Status === "X" &&
                              "Problemas con el transporte"}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              component={Link}
                              to={`/Envios/Detalles/${s?.SE_Id}`}
                            >
                              <VisibilityTwoToneIcon />
                            </IconButton>
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
      )}
    </>
  );
}

export default Details;
