import { useContext, useEffect, useState } from "react";

/* Context */
import { OpenEditContext } from "../../context/openEditContext";
import { UserContext as UserContextT } from "../../context/UserContextT";
import { DeleteContext } from "../../context/deleteContext";

/* Api */
import { GetOneUser } from "../../api/Get";

/* React-Router */
import { Link, useParams } from "react-router-dom";

/* Material UI */
import {
  Box,
  Typography,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  IconButton,
  Button,
  Paper,
  CircularProgress,
  CardMedia,
} from "@mui/material";

/* Material UI Icons */
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/* Material UI Icons*/
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

/* Components */
import Add from "../Pagos/Add/Add";
import Delete from "../Pagos/Delete/Delete";
import Spinner from "../../components/Spinner/Spinner";
import AppTabs from "../../components/AppTabs/AppTabs";

function Cuenta() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { view_type, logged_user } = useContext(UserContextT);
  const { setOpenEditPayment, setPaymentToEdit } = useContext(OpenEditContext);
  const [openNewPayment, setOpenNewPayment] = useState(false);
  const { setPaymentToDelete, setOpenDeletePayment } =
    useContext(DeleteContext);

  const editFunction = (idEdit) => {
    if (!idEdit) return;
    setOpenEditPayment(true);
    setPaymentToEdit(idEdit);
  };
  const deleteFunction = (idEdit) => {
    if (!idEdit) return;
    setOpenDeletePayment(true);
    setPaymentToDelete(idEdit);
  };

  const fetchUser = async (idUser) => {
    await setLoading(true);
    try {
      const response = await GetOneUser(idUser);
      await setUser(response.user);
      await setContacts(response.contact);
      await setPayments(response.payments);
    } catch (error) {
      console.log(error);
    }
    await setLoading(false);
  };

  useEffect(() => {
    if (!id && !logged_user?.Usuario_Id) return;
    if (id && view_type !== "A") {
      window.location.href = "/Cuenta";
    }
    if (id) {
      fetchUser(id);
    } else {
      fetchUser(logged_user.Usuario_Id);
    }
  }, [id, logged_user]);

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
        <Paper
          variant="outlined"
          sx={{
            margin: "1rem 3rem",
            padding: "1rem",
          }}
        >
          <Typography align="center" variant="h4" component="h2">
            Detalles de {id ? "la cuenta" : "su cuenta"}
          </Typography>
          <Box sx={{ margin: ".5rem 0" }}>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ margin: "2rem 0" }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th">Cédula</TableCell>
                    <TableCell align="center">{user.Persona_Id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Nombres</TableCell>
                    <TableCell align="center">{user.Persona_Nombre}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Apellidos</TableCell>
                    <TableCell align="center">
                      {user.Persona_Apellido}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Correo Electronico</TableCell>
                    <TableCell align="center">{user.Usuario_Correo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Estatus de la cuenta</TableCell>
                    {user.Usuario_Status ==="P" && (<TableCell align="center">Pendiente de Comprobación</TableCell>)}
                    {user.Usuario_Status ==="A" && (<TableCell align="center">Activa</TableCell>)}
                    {user.Usuario_Status ==="S" && (<TableCell align="center">Suspendida</TableCell>)}
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">
                      Comprobante Documento de Identidad
                    </TableCell>
                    <TableCell align="center">
                      {user["Persona_Archivo"] && (
                        <CardMedia
                          component="img"
                          height="140"
                          width="140"
                          {...(user["Persona_Archivo"].name
                            ? {
                                image: URL.createObjectURL(
                                  user["Persona_Archivo"]
                                ),
                              }
                            : {
                                src: `data:image/jpeg;base64,${user.Persona_Archivo}`,
                              })}
                          title="material"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">
                      Información de Contacto
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? (
                          <KeyboardArrowUpIcon color="primary" />
                        ) : (
                          <KeyboardArrowDownIcon color="primary" />
                        )}
                      </IconButton>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Table size="small" aria-label="purchases">
                            <TableBody>
                              {contacts &&
                                contacts.map((c) => (
                                  <TableRow>
                                    <TableCell>{c.Contacto_Info}</TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ margin: ".5rem 0" }}>
            <Typography align="center" variant="h4" component="h2">
              {user?.Suscripcion_Id ? "Suscripción" : "Sin Suscripción"}
            </Typography>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ margin: "2rem 0" }}
            >
              {user?.Suscripcion_Id && (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th">Plan</TableCell>
                      <TableCell align="center">{user?.TS_Nombre}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Monto</TableCell>
                      <TableCell align="center">
                        {user?.Suscripcion_Monto}$
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Estado</TableCell>
                      {user?.Suscripcion_Status === "S" && (
                        <TableCell align="center">Solvente</TableCell>
                      )}
                      {user?.Suscripcion_Status === "P" && (
                        <TableCell align="center">Pago Pendiente</TableCell>
                      )}
                      {user?.Suscripcion_Status === "V" && (
                        <TableCell align="center">Vencida</TableCell>
                      )}
                      {user?.Suscripcion_Status === "C" && (
                        <TableCell align="center">Suspendida</TableCell>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Fecha de Inicio</TableCell>
                      <TableCell align="center">
                        {user?.Suscripcion_FechaI.split("T")[0]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Fecha de Vencimiento</TableCell>
                      <TableCell align="center">
                        {user?.Suscripcion_FechaV.split("T")[0]}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Box>
          {!id && (
            <Box sx={{ margin: ".5rem 0" }}>
              <Typography align="center" variant="h4" component="h2">
                Pagos de Mensualidad
              </Typography>
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ margin: "2rem 0" }}
              >
                {payments && (
                  <Table>
                    <TableHead>
                      <TableRow>
                        {/* PS_Metodo, PS_Fecha, PS_Status */}
                        <TableCell>#</TableCell>
                        <TableCell>Metodo</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payments.map((p) => (
                        <TableRow>
                          <TableCell>{p.PS_Id}</TableCell>
                          {p.PS_Metodo === "T" && (
                            <TableCell>Transferencia</TableCell>
                          )}
                          {p.PS_Metodo === "E" && (
                            <TableCell>Efectivo</TableCell>
                          )}
                          {p.PS_Metodo === "P" && (
                            <TableCell>Pago Móvil</TableCell>
                          )}
                          <TableCell>{p.PS_Fecha.split("T")[0]}</TableCell>
                          {p.PS_Status === "P" && (
                            <TableCell>Pendiente</TableCell>
                          )}
                          {p.PS_Status === "A" && (
                            <TableCell>Aprobado</TableCell>
                          )}
                          {p.PS_Status === "R" && (
                            <TableCell>Rechazado</TableCell>
                          )}
                          <TableCell>
                            <IconButton
                              size="large"
                              component={Link}
                              to={`/Pagos/Detalles/${p.PS_Id}`}
                            >
                              <VisibilityTwoToneIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            {((p.PS_Status !== "R" && p.PS_Status !== "A") ||
                              view_type === "A") && (
                              <IconButton
                                size="large"
                                onClick={() => editFunction(p?.PS_Id)}
                              >
                                <EditTwoToneIcon color="info" />
                              </IconButton>
                            )}
                          </TableCell>
                          <TableCell>
                            {((p.PS_Status !== "R" && p.PS_Status !== "A") ||
                              view_type === "A") && (
                              <IconButton
                                size="large"
                                onClick={() => deleteFunction(p?.PS_Id)}
                              >
                                <DeleteTwoToneIcon color="error" />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Box>
          )}
          <Add
            openAccount={openNewPayment}
            setOpenAccount={setOpenNewPayment}
            redirect={"/Cuenta"}
          />
          <Delete redirect={"/Cuenta"} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem 2rem",
            }}
          >
            <Button
              component={Link}
              variant="outlined"
              to={
                id
                  ? `/Usuarios/Editar/${logged_user?.Usuario_Id}?adminView=true`
                  : `/Cuenta/Editar/${logged_user?.Usuario_Id}`
              }
            >
              Editar Cuenta
            </Button>
            {view_type !== "A" && user?.Suscripcion_Id && (
              <Button
                onClick={() => setOpenNewPayment(true)}
                variant="outlined"
              >
                Realizar Pago
              </Button>
            )}
          </Box>
        </Paper>
      )}
    </>
  );
}

export default Cuenta;

/* 
  <Grid className="account-page">
        <Grid align="center">
          <Box sx={{ margin: ".5rem 0" }}>
            <Typography variant="h4" component="h2">
              Detalles de su Cuenta
            </Typography>
            
          </Box>
          
        </Grid>
      </Grid>
*/
