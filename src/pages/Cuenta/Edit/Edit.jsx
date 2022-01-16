import React, { useContext, useEffect, useMemo, useState } from "react";

/* React-Router */
import { Link, useLocation, useParams } from "react-router-dom";

/* Material UI */
import {
  Grid,
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
  IconButton,
  TextField,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  CardMedia,
  Alert,
  Snackbar,
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { GetSuscriptions, GetUserEdit } from "../../../api/Get";

/* Phone mask */
import InputMask from "react-input-mask";
import { areaCodes } from "../../../areaCodes";

/* Components */
import Spinner from "../../../components/Spinner/Spinner";

/* datefns */
import addDate from "date-fns/add";
import format from "date-fns/format";
import { PutUser } from "../../../api/Put";
import AppTabs from "../../../components/AppTabs/AppTabs";
import { UserContext } from "../../../context/UserContextT";

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

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;
  const firstLetter = /^(424|212)$/;
  const letter = /(?!.*[DFIOQU])[A-Z]/i;
  const digit = /[0-9]/;
  const mask = ["(", , digit, letter, " ", digit, letter, digit];
  return (
    <InputMask
      {...other}
      ref={inputRef}
      mask={[
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      maskChar={null}
      placeholderChar={"\u2000"}
    />
  );
};
function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
const statusOptions = [
  {
    value: "P",
    label: "Pendiente de Comprobación",
  },
  {
    value: "A",
    label: "Activa",
  },
  {
    value: "S",
    label: "Suspendido",
  },
];
function Edit() {
  const { id } = useParams();
  const query = useQuery();
  const { view_type } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);

  const [loadingSuscription, setLoadingSuscription] = useState(false);
  const [openSuscriptionTypeList, setopenSuscriptionTypeList] = useState(false);
  const [suscriptionTypesList, setSuscriptionTypesList] = useState([]);
  const [changePlan, setChangePlan] = useState(false);
  const [selectedTSId, setSelectedTSId] = useState("");
  const [updateSuscriptionMessage, setUpdateSuscriptionMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [oldTSId, setOldTSId] = useState("");

  const [user, setUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const [contactos, setContactos] = useState([]);

  const [contact_type, setContact_type] = useState("");
  const [contact_value, setContact_value] = useState("");

  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSuscriptionChange = (e) => {
    setSelectedTSId(e.target.value);
  };

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleDeleteContact = (index) => {
    let contact = contacts.filter((item, i) => i !== index);
    setContacts(contact);
  };

  const handleContactTypeChange = (e) => {
    setContact_type(e.target.value);
  };

  const handleContactValueChange = (e) => {
    setContact_value(e.target.value);
  };

  const onFileChange = (e) => {
    if (e.target.files[0].size / 1024 / 1024 > 16) {
      setErrorMessage("La imagen es demasiado grande");
    } else {
      setUser({ ...user, Persona_Archivo: e.target.files[0] });
    }
  };

  const handleAddContact = (e) => {
    if (!contact_type || !contact_value) return;
    if (
      contact_type === "C" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contact_value)
    )
      return;
    if (
      contact_type === "T" &&
      (!areaCodes.includes(parseInt(contact_value.split(/[()]/)[1], 10)) ||
        contact_value.includes("_"))
    )
      return;
    let contactListCheck = [...contacts];
    if (
      contactListCheck.findIndex((c) => c.contact_value === contact_value) > -1
    ) {
      setContact_type("");
      setContact_value("");
      return;
    }
    contactListCheck.push({
      Contacto_Info: contact_value,
      Contacto_Tipo: contact_type,
    });
    setContacts(contactListCheck);
    setContact_type("");
    setContact_value("");
  };

  const renewSuscription = async () => {
    if (!user?.Suscripcion_Id || !user?.TS_Id) return;
    setLoadingSuscription(true);
    let suscription = await GetSuscriptions(oldTSId);
    if (suscription[0]) {
      let { TS_Id, TS_Nombre, TS_Monto } = suscription[0];
      setUser({
        ...user,
        TS_Id,
        TS_Nombre,
        Suscripcion_Monto: TS_Monto,
        Suscripcion_Status: "P",
        Suscripcion_FechaI: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        Suscripcion_FechaV: format(
          addDate(new Date(), { months: 1 }),
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
        ),
      });
      setUpdateSuscriptionMessage(
        "Datos actualizados, presione Guardar para enviarlos"
      );
      setSeverity("success");
    }
    setLoadingSuscription(false);
  };
  /*
   */
  const handleSubmitUser = (e) => {
    e.preventDefault();
    if (contacts.length === 0) {
      setErrorMessage("Debe ingresar al menos una información de contacto");
      return;
    }
    if (!user["Persona_TipoId"]) {
      setErrorMessage("Debe ingresar el tipo de cédula");
      return;
    }
    if (!user["Persona_Id"]) {
      setErrorMessage("Debe ingresar la cédula");
      return;
    }
    if (!user["Persona_Nombre"]) {
      setErrorMessage("Debe ingresar el nombre");
      return;
    }
    if (!user["Persona_Apellido"]) {
      setErrorMessage("Debe ingresar el apellido");
      return;
    }
    if (!user["Usuario_Correo"]) {
      setErrorMessage("Debe ingresar el correo del usuario");
      return;
    }

    let contactos = contacts.map((c) => [c.Contacto_Info, c.Contacto_Tipo]);
    setContactos(contactos);
    setSending(true);
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      let data = await GetUserEdit(id);
      if (!data) {
        setLoading(false);
        return;
      }
      setUser(data.user);
      setContacts(data.contact);
      data?.user?.TS_Id && setOldTSId(data.user.TS_Id);
      if (!data?.user?.Suscripcion_Id) {
        setUpdateSuscriptionMessage(
          `No se encuentra suscripto a un plan, seleccione uno en la opción "Cambiar Suscripcion"`
        );
        setSeverity("error");
        setLoading(false);
        return;
      }
      if (data?.user?.Suscripcion_FechaV) {
        let dateV = new Date(data.user.Suscripcion_FechaV);
        let today = new Date();
        if (dateV < today) {
          setUpdateSuscriptionMessage(
            `La suscripción esta vencida, presione "Renovar" para renovarla`
          );
          setSeverity("warning");
        }
      }
      setLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      let data = await GetSuscriptions();
      if (!data) return;
      setSuscriptionTypesList(data);
    })();
  }, []);

  useEffect(() => {
    if (!changePlan || !selectedTSId || !openSuscriptionTypeList) return;
    setLoadingSuscription(true);
    (async () => {
      let data = await GetSuscriptions(selectedTSId);
      if (!data) return;
      setUser({
        ...user,
        TS_Id: selectedTSId,
        TS_Nombre: data[0].TS_Nombre,
        Suscripcion_Monto: data[0].TS_Monto,
        Suscripcion_Status: "P",
        Suscripcion_FechaI: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        Suscripcion_FechaV: format(
          addDate(new Date(), { months: 1 }),
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
        ),
      });
      setUpdateSuscriptionMessage(
        "Cambio de plan, presione Guardar para confirmar"
      );
      setSeverity("info");
    })();
    setLoadingSuscription(false);
  }, [changePlan, selectedTSId]);

  useEffect(() => {
    if (!sending || !contactos) return;
    let dataToSend = { ...user, contactos };
    delete dataToSend["Suscripcion_Id"];
    if (!updateSuscriptionMessage) delete dataToSend["TS_Id"];
    (async function () {
      try {
        let form = new FormData();
        Object.keys(dataToSend).forEach((key) => {
          if (key === "Persona_Archivo" && dataToSend[key]?.name) {
            form.append(
              "Persona_Archivo",
              dataToSend[key],
              dataToSend[key].name
            );
          } else if (key === "contactos") {
            form.append("contactos", JSON.stringify(dataToSend[key]));
          } else {
            form.append(key, dataToSend[key]);
          }
        });
        const response = await PutUser(id, form);
        if (response.status === 200) {
          setSuccessMessage("Usuario editado correctamente");
          setTimeout(() => {
            setSuccessMessage("");
            window.location.href = query.get("adminView")
              ? "/Usuarios"
              : "/Cuenta";
          }, 2000);
          setSending(false);
        } else {
          setErrorMessage("Error al editar el usuario");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
          setSending(false);
        }
      } catch (e) {
        if (e) {
          setErrorMessage("Hubo un error al enviar los datos");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
          setSending(false);
        }
      }
    })();
  }, [sending]);

  return (
    <>
      <AppTabs />
      <Grid className="account-page">
        <Grid align="center">
          <Box sx={{ margin: ".5rem 0" }}>
            {loading || sending ? (
              <Box
                sx={{
                  width: "auto",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner loading={loading || sending} />
              </Box>
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
                  <Alert
                    severity="success"
                    onClose={() => setSuccessMessage("")}
                  >
                    {successMessage}
                  </Alert>
                </Snackbar>
                <Typography variant="h4" component="h1">
                  Editar Cuenta
                </Typography>
                <Box component="form" sx={{ margin: "1rem 0" }}>
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{ margin: "2rem 0" }}
                  >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th">Cédula</TableCell>
                          <TableCell>
                            <TextField
                              id="Persona_TipoId"
                              name="Persona_TipoId"
                              select
                              label="Tipo"
                              value={user && user.Persona_TipoId}
                              onChange={handleUserChange}
                              variant="filled"
                              sx={{ marginRight: 1 }}
                            >
                              {["V", "E", "J"].map((tipo) => (
                                <MenuItem key={tipo} value={tipo}>
                                  {tipo}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              label="Editar Cédula"
                              variant="filled"
                              type="text"
                              name="Persona_Id"
                              value={user.Persona_Id || ""}
                              onChange={handleUserChange}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th">Nombres</TableCell>
                          <TableCell>
                            <TextField
                              label="Editar Nombre"
                              variant="filled"
                              type="text"
                              name="Persona_Nombre"
                              value={user.Persona_Nombre || ""}
                              onChange={handleUserChange}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th">Apellidos</TableCell>
                          <TableCell>
                            <TextField
                              label="Editar Apellido"
                              variant="filled"
                              type="text"
                              name="Persona_Apellido"
                              value={user.Persona_Apellido || ""}
                              onChange={handleUserChange}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th">
                            Correo Electronico
                          </TableCell>
                          <TableCell>
                            <TextField
                              label="Editar Correo"
                              variant="filled"
                              type="email"
                              name="Usuario_Correo"
                              value={user.Usuario_Correo || ""}
                            />
                          </TableCell>
                        </TableRow>
                        {view_type === "A" && (
                          <TableRow>
                            <TableCell>Estatus de la cuenta</TableCell>
                            <TableCell>
                              <TextField
                                id="Usuario_Status"
                                name="Usuario_Status"
                                select
                                label="Tipo"
                                value={user && user.Usuario_Status}
                                onChange={handleUserChange}
                                variant="filled"
                                sx={{ marginRight: 1 }}
                              >
                                {statusOptions.map(({ value, label }) => (
                                  <MenuItem key={value} value={value}>
                                    {label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell component="th">
                            Comprobante Documento de Identidad
                          </TableCell>
                          <TableCell>
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
                            <label htmlFor="icon-button-file">
                              <Input
                                id="icon-button-file"
                                type="file"
                                sx={{ display: "none" }}
                                onChange={onFileChange}
                                inputProps={{
                                  accept: "image/*",
                                }}
                              />
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <UploadFileTwoToneIcon size="large" />
                              </IconButton>
                            </label>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th">
                            Información de contacto
                          </TableCell>
                          <TableCell>
                            {add ? (
                              <TableRow>
                                <TableCell
                                  sx={{ display: "flex", gap: "1rem" }}
                                >
                                  <CustomStack>
                                    <TextField
                                      select
                                      label="Tipo de contacto"
                                      value={contact_type && contact_type}
                                      onChange={handleContactTypeChange}
                                      variant="filled"
                                      sx={{ minWidth: 170 }}
                                    >
                                      {[
                                        { letter: "C", name: "Correo" },
                                        { letter: "T", name: "Teléfono" },
                                      ].map((tipo) => (
                                        <MenuItem
                                          key={tipo.letter}
                                          value={tipo.letter}
                                        >
                                          {tipo.name}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                    {contact_type === "C" && (
                                      <TextField
                                        label="Correo Electrónico"
                                        variant="filled"
                                        type="email"
                                        onChange={handleContactValueChange}
                                        {...(contact_value &&
                                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                                            contact_value
                                          ) && {
                                            error: true,
                                            helperText:
                                              "Correo electrónico inválido",
                                          })}
                                        fullWidth
                                      />
                                    )}
                                    {contact_type === "T" && (
                                      <TextField
                                        label="Número de teléfono"
                                        margin="normal"
                                        variant="filled"
                                        InputProps={{
                                          inputComponent: TextMaskCustom,
                                          onChange: handleContactValueChange,
                                        }}
                                        {...((contact_value &&
                                          !areaCodes.includes(
                                            parseInt(
                                              contact_value.split(/[()]/)[1],
                                              10
                                            )
                                          ) && {
                                            error: true,
                                            helperText:
                                              "Código de área inválido",
                                          }) ||
                                          (contact_value &&
                                            contact_value.includes("_") && {
                                              error: true,
                                              helperText:
                                                "Número de teléfono inválido",
                                            }))}
                                      />
                                    )}
                                    <IconButton>
                                      <AddCircleTwoToneIcon
                                        size="large"
                                        onClick={handleAddContact}
                                        color="primary"
                                      />
                                    </IconButton>
                                  </CustomStack>
                                </TableCell>
                              </TableRow>
                            ) : null}
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Table size="small" aria-label="purchases">
                                <TableBody>
                                  {contacts &&
                                    contacts.map((c, i) => {
                                      return (
                                        <TableRow>
                                          <TableCell>
                                            <Chip
                                              label={`${c.Contacto_Info}`}
                                              key={`${i}`}
                                              deleteIcon={<DeleteTwoToneIcon />}
                                              variant="outlined"
                                              onDelete={() =>
                                                handleDeleteContact(i)
                                              }
                                            />
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                </TableBody>
                              </Table>
                            </Collapse>
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
                            <IconButton
                              size="small"
                              onClick={() => setAdd(!add)}
                            >
                              {add ? (
                                <CloseTwoToneIcon />
                              ) : (
                                <AddCircleTwoToneIcon />
                              )}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ maxWidth: 400 }}>
                    {loadingSuscription ? (
                      <Box
                        sx={{
                          width: "auto",
                          height: "auto",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Spinner loading={loadingSuscription} />
                      </Box>
                    ) : (
                      <>
                        <Typography
                          variant="subtitle1"
                          component="h2"
                          align="center"
                          gutterBottom
                        >
                          Suscripción
                        </Typography>
                        <TableContainer>
                          {updateSuscriptionMessage && (
                            <Alert severity={severity}>
                              {updateSuscriptionMessage}
                            </Alert>
                          )}
                          {user?.TS_Nombre && (
                            <TableRow>
                              <TableCell component="th">
                                Tipo de Suscripción:
                              </TableCell>
                              <TableCell>{user.TS_Nombre}</TableCell>
                            </TableRow>
                          )}
                          {user?.Suscripcion_Monto && (
                            <TableRow>
                              <TableCell component="th">Monto:</TableCell>
                              <TableCell>{user.Suscripcion_Monto}</TableCell>
                            </TableRow>
                          )}
                          {user?.Suscripcion_FechaI && (
                            <TableRow>
                              <TableCell component="th">
                                Fecha de inicio:
                              </TableCell>
                              <TableCell>
                                {user.Suscripcion_FechaI.split("T")[0]}
                              </TableCell>
                            </TableRow>
                          )}
                          {user?.Suscripcion_FechaV && (
                            <TableRow>
                              <TableCell component="th">
                                Fecha de vencimiento:
                              </TableCell>
                              <TableCell>
                                {user.Suscripcion_FechaV.split("T")[0]}
                              </TableCell>
                            </TableRow>
                          )}
                          {user?.Suscripcion_Status && (
                            <TableRow>
                              <TableCell component="th">Estatus:</TableCell>
                              <TableCell>
                                {user.Suscripcion_Status &&
                                  (() => {
                                    switch (user.Suscripcion_Status) {
                                      case "S":
                                        return "Solvente";
                                      case "C":
                                        return "Cancelada";
                                      case "P":
                                        return "Pago pendiente";
                                      case "V":
                                        return "Vencida";
                                      default:
                                        return "";
                                    }
                                  })()}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableContainer>
                        <Box
                          mt={2}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            sx={{ marginRight: 1 }}
                            variant="outlined"
                            onClick={renewSuscription}
                          >
                            Renovar Suscripción
                          </Button>
                          <Button
                            sx={{ marginLeft: 1 }}
                            variant="outlined"
                            onClick={() =>
                              setopenSuscriptionTypeList(
                                !openSuscriptionTypeList
                              )
                            }
                          >
                            Cambiar Suscripción
                          </Button>
                        </Box>
                        {openSuscriptionTypeList && (
                          <CustomStack>
                            <FormControl sx={{ m: 1, width: 300 }}>
                              <TextField
                                variant="filled"
                                select
                                id="suscriptionSelect"
                                value={selectedTSId}
                                label="Suscripción"
                                onChange={handleSuscriptionChange}
                                fullWidth
                              >
                                {suscriptionTypesList[0] ? (
                                  suscriptionTypesList.map((s, i) => (
                                    <MenuItem key={`${i}`} value={s.TS_Id}>
                                      {`${s.TS_Nombre} - ${s.TS_Monto}`}
                                    </MenuItem>
                                  ))
                                ) : (
                                  <MenuItem>
                                    No se pudieron obtener las suscripciones
                                  </MenuItem>
                                )}
                              </TextField>
                            </FormControl>
                            <IconButton>
                              <AddCircleTwoToneIcon
                                size="large"
                                onClick={() => setChangePlan(true)}
                                color="primary"
                              />
                            </IconButton>
                          </CustomStack>
                        )}
                      </>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem 2rem",
                  }}
                >
                  <Button
                    variant="outlined"
                    component={Link}
                    to={query.get("adminView") ? "/Usuarios" : "/Cuenta"}
                  >
                    Cancel
                  </Button>
                  <Button variant="outlined" onClick={handleSubmitUser}>
                    Guardar
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Edit;
