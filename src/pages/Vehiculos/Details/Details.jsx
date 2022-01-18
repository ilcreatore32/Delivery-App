import { useState, useEffect, useCallback } from "react";

/* React-Router */
import { useParams } from "react-router-dom";

/* API */
import { GetOneVehicle } from "../../../api/Get";

/* Material UI */
import {
  Typography,
  Paper,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  Table,
} from "@mui/material";

/* Components */
import AppTabs from "../../../components/AppTabs/AppTabs";
import Spinner from "../../../components/Spinner/Spinner";

function Details() {
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
      {loading ? (
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          <Spinner loading={loading} />
        </Paper>
      ) : (
        <Paper
          variant="outlined"
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
                    <TableCell component="th">Placa</TableCell>
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
                    <TableCell align="center">
                      {vehicle?.Vehiculo_Anio}
                    </TableCell>
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
      )}
    </>
  );
}

export default Details;
