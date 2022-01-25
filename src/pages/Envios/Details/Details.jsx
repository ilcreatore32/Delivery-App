import { useState, useEffect, useCallback, useContext } from "react";

/* API */
import {
  GetAuthenticatedUser,
  GetOffersOption,
  GetOneShippment,
} from "../../../api/Get";

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
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { styled } from "@mui/material/styles";

/* Material UI Icons */
import BookmarkAddTwoToneIcon from "@mui/icons-material/BookmarkAddTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowDown";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/* Components */
import Spinner from "../../../components/Spinner/Spinner";
import AppTabs from "../../../components/AppTabs/AppTabs";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";

/* Context */
import { authContext } from "../../../context/authContext";
import { UserContext } from "../../../context/UserContextT";
import { format, parse } from "date-fns";
import { PutEnvioStatus, PutOfertaStatus } from "../../../api/Put";
import { AsociarServicio } from "../../../api/Post";
import { DeleteAsociatedService } from "../../../api/Delete";
import { Link } from "react-router-dom";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
}));

const switchShippmentState = (key) => {
  let messages = {
    S: "Esperando que el transportista tenga el producto",
    T: "Esperando que el transportista confirme entrega",
    C: "Esperando que el cliente confirme entrega",
  };
  let states = {
    P: "Pendiente de servicio transporte",
    S: "Servicio de transporte activo",
    T: "Producto entregado al transportista",
    C: "Producto entregado al cliente",
    F: "Transporte finalizado con exito",
    X: "Problemas con el transporte",
  };
  let questions = {
    S: "¿Confirmar que el transportista ya recibio el producto?",
    T: "¿Confirmar que se entrego el producto?",
    C: "¿Confirmar que recibio el producto?",
  };
  let next = {
    S: "T",
    T: "C",
    C: "F",
  };
  const State = {
    message: messages[key],
    state: states[key],
    question: questions[key],
    next: next[key],
  };
  return State;
};

function Details() {
  const { id } = useParams();

  const AuthContext = useContext(authContext);
  const { view_type, logged_user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [Offer, setOffer] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState("");
  const [offers, setOffers] = useState([]);

  const [shippmentDetails, setShippmentDetails] = useState({});
  const [productsList, setproductsList] = useState([]);
  const [servicesAvailable, setServicesAvailable] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});

  const [startHours, setStartHours] = useState("");
  const [finishHours, setFinishHours] = useState("");

  const [shippmentState, setShippmentState] = useState("");
  const [changeStatus, setChangeStatus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [sendingOffer, setSendingOffer] = useState(false);

  const [selectOfferToDelete, setSelectOfferToDelete] = useState({});
  const [deletingOffer, setDeletingOffer] = useState(false);
  const [changingStatusOffer, setChangingStatusOffer] = useState(false);

  const handleOffer = () => {
    if (!logged_user) {
      setErrorMessage("No se pudo obtener información del usuario");
      return;
    }
    if (logged_user?.Usuario_Status !== "A") {
      setErrorMessage("El usuario no esta activo");
      return;
    }
    if (logged_user?.Suscripcion_Status !== "S") {
      setErrorMessage("El usuario no tiene suscripcion activa");
      return;
    }
    setOffer(true);
  };

  const handleCloseOffer = () => {
    setOffer(false);
  };

  const handleSelectedOffer = (e) => {
    setSelectedOffer(e.target.value);
  };

  const updateShippmentStatus = async (id, status) => {
    if (!id || !status) return;
    setLoadingStatus(true);
    let result = await PutEnvioStatus(id, status);
    if (result?.status === 200) {
      setSuccessMessage("Se actualizo el estado del envio");
      fetchShippment();
    } else {
      setErrorMessage("No se pudo actualizar el estado del envio");
    }
    setLoadingStatus(true);
  };
  const fetchShippment = useCallback(async () => {
    await setLoading(true);
    console.log(AuthContext);
    try {
      const response = await GetOneShippment(id);
      await setShippmentDetails(response.shippmentDetails);
      await setproductsList(response.productsList);
      await setServicesAvailable(response.servicesAvailable);
      await setServiceDetails(response.serviceDetails);
      const user = await GetAuthenticatedUser();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    await setLoading(false);
  }, [id]);

  const getOffers = async () => {
    try {
      let offers = await GetOffersOption();
      if (offers) {
        if (servicesAvailable) {
          let filteredOffers = offers.filter(
            (offer) =>
              !servicesAvailable.some(
                (service) => service.ST_Id === offer.ST_Id
              )
          );
          setOffers(filteredOffers);
        } else {
          setOffers(offers);
        }
      }
    } catch (error) {
      console.debug(error);
    }
  };

  const sendOffer = async () => {
    if (!selectedOffer) return;
    setSendingOffer(true);
    try {
      const response = await AsociarServicio({
        SEST_SEId: id,
        SEST_STId: selectedOffer,
        SEST_Status: "P",
      });
      if (response.status === 200) {
        setSuccessMessage("Oferta enviada correctamente");
        setSelectedOffer("");
        fetchShippment();
      } else {
        setErrorMessage("Error al enviar la oferta");
      }
    } catch (e) {
      if (e) {
        setErrorMessage("Hubo un error al enviar los datos");
        setSendingOffer(false);
      }
    }
    setSendingOffer(false);
  };

  const deleteOffer = async (id) => {
    if (!id) return;
    setDeletingOffer(true);
    setSelectOfferToDelete({ ...selectOfferToDelete, ST_Id: null });
    try {
      let result = await DeleteAsociatedService(id);
      if (result.status === 200) {
        setSuccessMessage("Oferta eliminada correctamente");
        setSelectOfferToDelete({});
        fetchShippment();
      } else {
        setSelectOfferToDelete({});
        setErrorMessage("Error al eliminar la oferta");
      }
    } catch (e) {
      if (e) {
        setSelectOfferToDelete({});
        setErrorMessage("Hubo un error al enviar los datos");
      }
    }
    setDeletingOffer(false);
  };

  const acceptRejectOffer = async (id, status) => {
    if (!id || !status || !status?.status || !status?.serviceId) return;
    let successMsg, errorMsg;
    switch (status?.status) {
      case "A":
        successMsg = "Oferta aceptada correctamente";
        errorMsg = "Error al aceptar la oferta";
        break;
      case "R":
        successMsg = "Oferta rechazada correctamente";
        errorMsg = "Error al rechazar la oferta";
        break;
      case "P":
        successMsg = "Cancelación de la oferta correcta";
        errorMsg = "Error al cambiar la oferta";
    }
    setChangingStatusOffer(true);
    try {
      let result = await PutOfertaStatus(id, status);
      if (result.status === 200) {
        setSuccessMessage(successMsg);
        fetchShippment();
      } else {
        setErrorMessage(errorMsg);
      }
    } catch (e) {
      if (e) {
        setErrorMessage(errorMsg);
      }
    }
    setChangingStatusOffer(false);
  };
  useEffect(() => {
    fetchShippment();
  }, [fetchShippment]);

  useEffect(() => {
    if (shippmentDetails?.SE_Status) {
      setShippmentState(switchShippmentState(shippmentDetails.SE_Status));
    }
  }, [shippmentDetails]);

  useEffect(() => {
    if (!view_type) return;
    if (
      view_type === "T" &&
      serviceDetails?.ST_PersonaId &&
      serviceDetails.ST_PersonaId !== logged_user.Usuario_Id
    )
      window.location.replace("/");
    if (
      view_type === "C" &&
      shippmentDetails["SE_PersonaId"] &&
      shippmentDetails.SE_PersonaId !== logged_user.Usuario_Id
    )
      window.location.replace("/");
  }, [view_type]);

  useEffect(() => {
    if (
      shippmentState.state === "Servicio de transporte activo" &&
      view_type === "A"
    ) {
      setChangeStatus(true);
      return;
    }

    if (
      shippmentState.state === "Producto entregado al transportista" &&
      view_type === "T" &&
      logged_user &&
      serviceDetails &&
      logged_user.Usuario_Id === serviceDetails.ST_PersonaId
    ) {
      setChangeStatus(true);
      return;
    }
    if (
      shippmentState.state === "Producto entregado al cliente" &&
      view_type === "C" &&
      logged_user &&
      shippmentDetails &&
      logged_user.Usuario_Id === shippmentDetails.SE_PersonaId
    ) {
      setChangeStatus(true);
      return;
    }
    setChangeStatus(false);
  }, [
    shippmentState,
    view_type,
    logged_user,
    serviceDetails,
    shippmentDetails,
  ]);

  useEffect(() => {
    if (
      !serviceDetails ||
      !serviceDetails.ST_HorarioIni ||
      !serviceDetails.ST_HorarioFin
    ) {
      setStartHours("");
      setFinishHours("");
      return;
    }
    let startH = format(
      parse(serviceDetails.ST_HorarioIni, "HH:mm:ss", new Date()),
      "hh:mm aaaaa'm'"
    );
    let finishH = format(
      parse(serviceDetails.ST_HorarioFin, "HH:mm:ss", new Date()),
      "hh:mm aaaaa'm'"
    );
    setStartHours(startH);
    setFinishHours(finishH);
  });
  return (
    <>
      <AppTabs />
      {loading ? (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem",
            padding: ".5rem 1rem",
          }}
          variant="outlined"
        >
          <Spinner loading={loading} />
        </Paper>
      ) : (
        <>
          <Snackbar
            open={errorMessage}
            autoHideDuration={6000}
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          >
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          </Snackbar>
          <Snackbar
            open={successMessage}
            autoHideDuration={6000}
            onClose={() => setSuccessMessage("")}
          >
            <Alert severity="success" onClose={() => setSuccessMessage("")}>
              {successMessage}
            </Alert>
          </Snackbar>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            sx={{
              margin: "1rem",
            }}
          >
            <Item xs={6} sm={8} md={8}>
              <Typography align="center" variant="h4" component="h1">
                Detalles del Envío
              </Typography>
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ margin: "1rem 0" }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th">Fecha del Pedido</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.SE_Fecha?.split("T")[0]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Estado</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.SE_Status === "E" && "Eliminado"}
                        {shippmentDetails.SE_Status === "P" &&
                          "Pendiente de servicio transporte"}
                        {shippmentDetails.SE_Status === "S" &&
                          "Servicio de transporte activo"}
                        {shippmentDetails.SE_Status === "T" &&
                          "Producto entregado al transportista"}
                        {shippmentDetails.SE_Status === "C" &&
                          "Producto entregado al cliente"}
                        {shippmentDetails.SE_Status === "F" &&
                          "Transporte finalizado con exito"}
                        {shippmentDetails.SE_Status === "X" &&
                          "Problemas con el transporte"}
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
                    <TableRow>
                      <TableCell component="th">Entidad Federal</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.EF_Nombre}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Municipio</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.Municipio_Nombre}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Parroquía</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.Parroquia_Nombre}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Dirección Detallada</TableCell>
                      <TableCell align="center">
                        {shippmentDetails.SE_DireccionDetalles}
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
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ margin: "1rem 0" }}
                >
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
              {view_type === "T" && !serviceDetails?.ST_Id && (
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
                        <BookmarkAddTwoToneIcon color="primary" size="small" />
                      </IconButton>
                    </ListSubheader>
                    {Offer ? (
                      <>
                        <Box
                          sx={{
                            margin: "2rem 3rem",
                          }}
                        >
                          {sendingOffer ? (
                            <CircularProgress />
                          ) : (
                            <>
                              <ListSubheader>
                                Ofrecer Servicios de Transporte
                              </ListSubheader>
                              <FormControl fullWidth>
                                <InputLabel id="offer">
                                  Sus Servicios
                                </InputLabel>
                                <Select
                                  labelId="offer"
                                  id="offer"
                                  variant="filled"
                                  value={selectedOffer}
                                  label="Sus Servicios"
                                  onChange={handleSelectedOffer}
                                  onOpen={getOffers}
                                >
                                  {offers.length > 0 ? (
                                    offers.map((offer) => {
                                      let {
                                        ST_Id,
                                        MT_Nombre,
                                        ST_Precio,
                                        ST_HorarioIni,
                                        ST_HorarioFin,
                                        DatosMedio,
                                      } = offer;
                                      return (
                                        <MenuItem value={ST_Id}>
                                          {`${MT_Nombre} || ${ST_Precio}$ || ${format(
                                            parse(
                                              ST_HorarioIni,
                                              "HH:mm:ss",
                                              new Date()
                                            ),
                                            "hh:mm aaaaa'm'"
                                          )} a ${format(
                                            parse(
                                              ST_HorarioFin,
                                              "HH:mm:ss",
                                              new Date()
                                            ),
                                            "hh:mm aaaaa'm'"
                                          )}`}
                                          {DatosMedio && ` || ${DatosMedio}`}{" "}
                                        </MenuItem>
                                      );
                                    })
                                  ) : (
                                    <MenuItem value="">
                                      No hay servicios disponibles
                                    </MenuItem>
                                  )}
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
                                  color="primary"
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={sendOffer}
                                >
                                  Ofrecer Servicio
                                </Button>
                              </Box>
                            </>
                          )}
                        </Box>
                      </>
                    ) : null}
                    <Divider />
                    <ConfirmationDialog
                      title="Alerta ¿Deseas eliminar la siguiente oferta?"
                      message={
                        selectOfferToDelete &&
                        `${
                          selectOfferToDelete.DatosMedio ||
                          selectOfferToDelete.MT_Nombre
                        } - ${selectOfferToDelete.ST_Precio}$`
                      }
                      customClose={
                        <Button
                          onClick={() =>
                            setSelectOfferToDelete({
                              ...selectOfferToDelete,
                              ST_Id: null,
                            })
                          }
                        >
                          Cancelar
                        </Button>
                      }
                      customOpen={selectOfferToDelete?.ST_Id ? true : false}
                    >
                      <Button
                        onClick={() => deleteOffer(selectOfferToDelete?.ST_Id)}
                      >
                        Eliminar
                      </Button>
                    </ConfirmationDialog>
                    {deletingOffer ? (
                      <CircularProgress />
                    ) : (
                      servicesAvailable &&
                      servicesAvailable.map((service) => {
                        if (
                          view_type === "T" &&
                          service.ST_PersonaId !== logged_user.Usuario_Id
                        ) return;
                        if (
                          view_type === "T" &&
                          service.ST_PersonaId === logged_user.Usuario_Id
                        )
                          return (
                            <ListItem
                              key={service.ST_Id}
                              divider
                              secondaryAction={
                                service.SEST_Status === "R" ? (
                                  <IconButton
                                    edge="end"
                                    aria-label="Aceptar Ofrecer"
                                    disabled
                                  >
                                    Rechazado
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    edge="end"
                                    aria-label="Eliminar Ofrecer"
                                    onClick={() =>
                                      setSelectOfferToDelete(service)
                                    }
                                  >
                                    <DeleteTwoToneIcon
                                      color="error"
                                      size="small"
                                    />
                                  </IconButton>
                                )
                              }
                              disablePadding
                            >
                              <ListItemButton role={undefined}>
                                <ListItemIcon>
                                  <BookmarkAddedTwoToneIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={`${
                                    service.DatosMedio || service.MT_Nombre
                                  } - ${service.ST_Precio}$`}
                                  secondary={`Horario: ${service.ST_HorarioIni} - ${service.ST_HorarioFin}`}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        return (
                          <ListItem
                            key={service.ST_Id}
                            divider
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="Eliminar Ofrecer"
                                onClick={() => setSelectOfferToDelete(service)}
                              >
                                <DeleteTwoToneIcon color="error" size="small" />
                              </IconButton>
                            }
                            disablePadding
                          >
                            <ListItemButton role={undefined}>
                              <ListItemIcon>
                                <BookmarkAddedTwoToneIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary={`${
                                  service.DatosMedio || service.MT_Nombre
                                } - ${service.ST_Precio}$`}
                                secondary={`Horario: ${service.ST_HorarioIni} - ${service.ST_HorarioFin}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })
                    )}
                  </List>
                </Box>
              )}
              {view_type !== "T" && !serviceDetails?.ST_Id && (
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
                    </ListSubheader>
                    <Divider />
                    {changingStatusOffer ? (
                      <CircularProgress />
                    ) : (
                      servicesAvailable &&
                      servicesAvailable.map((service) => {
                        if (view_type !== "T")
                          return (
                            <ListItem
                              key={service.ST_Id}
                              divider
                              secondaryAction={
                                service.SEST_Status === "R" ? (
                                  <IconButton
                                    edge="end"
                                    aria-label="Aceptar Ofrecer"
                                    disabled
                                  >
                                    Rechazado
                                  </IconButton>
                                ) : (
                                  <>
                                    <IconButton
                                      component={Link}
                                      to={`/Servicios/Detalles/${service.ST_Id}`}
                                    >
                                      <VisibilityTwoToneIcon />
                                    </IconButton>
                                    <IconButton
                                      edge="end"
                                      aria-label="Aceptar Ofrecer"
                                      onClick={() =>
                                        acceptRejectOffer(
                                          shippmentDetails.SE_Id,
                                          {
                                            status: "A",
                                            serviceId: service.ST_Id,
                                          }
                                        )
                                      }
                                    >
                                      <CheckCircleIcon
                                        color="success"
                                        size="small"
                                      />
                                    </IconButton>
                                    <IconButton
                                      edge="end"
                                      aria-label="Rechazar Ofrecer"
                                      onClick={() =>
                                        acceptRejectOffer(
                                          shippmentDetails.SE_Id,
                                          {
                                            status: "R",
                                            serviceId: service.ST_Id,
                                          }
                                        )
                                      }
                                    >
                                      <CancelIcon color="error" size="small" />
                                    </IconButton>
                                  </>
                                )
                              }
                              disablePadding
                            >
                              <ListItemButton role={undefined}>
                                <ListItemIcon color="primary">
                                  <BookmarkAddedTwoToneIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={`${
                                    service.DatosMedio || service.MT_Nombre
                                  } - ${service.ST_Precio}$`}
                                  secondary={`Horario: ${service.ST_HorarioIni} - ${service.ST_HorarioFin}`}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                      })
                    )}
                  </List>
                </Box>
              )}
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
                  {shippmentState.state} / {shippmentState.message}
                </Typography>
              </Box>
              {changeStatus && (
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
                  {loadingStatus ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <Typography variant="subtitle1" component="h4">
                        {shippmentState.question}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "1rem",
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() =>
                            updateShippmentStatus(shippmentDetails?.SE_Id, {
                              status: shippmentState?.next,
                            })
                          }
                        >
                          Confirmar
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </Item>
            <Item xs={6} sm={4} md={4}>
              <Typography align="center" variant="h4" component="h2">
                Detalles del Cliente
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
                    {shippmentDetails && shippmentDetails.Contacto_Persona ? (
                      <TableRow>
                        <TableCell component="th">Contacto</TableCell>
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
                                  {shippmentDetails.Contacto_Persona &&
                                    shippmentDetails.Contacto_Persona.split(
                                      ";"
                                    ).map((tlf) => {
                                      return (
                                        <TableRow>
                                          <TableCell>{tlf}</TableCell>
                                        </TableRow>
                                      );
                                    })}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell component="th">Contacto</TableCell>
                        <TableCell align="center">No hay registro</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {serviceDetails && (
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
                            <TableCell align="center">
                              {serviceDetails?.MT_Nombre}
                            </TableCell>
                          </TableRow>
                          {serviceDetails?.DatosMedio && (
                            <>
                              <TableRow>
                                <TableCell component="th">
                                  Nombre del Vehículo
                                </TableCell>
                                <TableCell align="center">
                                  {serviceDetails?.DatosMedio}
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                          <TableRow>
                            <TableCell component="th">Horario</TableCell>
                            <TableCell align="center">{`${startHours} a ${finishHours}`}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th">Precio</TableCell>
                            <TableCell align="center">
                              {serviceDetails?.ST_Precio} $
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Box
                    sx={{
                      padding: "1rem",
                    }}
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
                            <TableCell align="center">
                              {serviceDetails.Persona_Nombre}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th">Apellidos</TableCell>
                            <TableCell align="center">
                              {serviceDetails.Persona_Apellido}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th">Contacto</TableCell>
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
                                      {serviceDetails.Contacto_Persona &&
                                        serviceDetails.Contacto_Persona.split(
                                          ";"
                                        ).map((tlf) => {
                                          return (
                                            <TableRow>
                                              <TableCell>{tlf}</TableCell>
                                            </TableRow>
                                          );
                                        })}
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
                      {shippmentDetails.SE_Status === "S" ||
                      view_type === "A" ? (
                        <ConfirmationDialog
                          title="¿Estas Seguro?"
                          buttonText="Cancelar Servicio"
                          message="¿Desea cancelar la entrega de este envío con este servicio?"
                        >
                          <Button
                            variant="text"
                            onClick={() =>
                              acceptRejectOffer(shippmentDetails.SE_Id, {
                                status: "P",
                                serviceId: serviceDetails.ST_Id,
                              })
                            }
                          >
                            Confirmar
                          </Button>
                        </ConfirmationDialog>
                      ) : (
                        <ConfirmationDialog
                          title="Alerta"
                          buttonText="Cancelar Servicio"
                          message="Producto ya entregado, contacte a la tienda si de verdad desea cancelar esta entrega (puede conllevar a una penalización por incumplimiento)"
                        ></ConfirmationDialog>
                      )}
                    </Box>
                  </Box>
                </>
              )}
            </Item>
          </Stack>
        </>
      )}
    </>
  );
}

export default Details;
