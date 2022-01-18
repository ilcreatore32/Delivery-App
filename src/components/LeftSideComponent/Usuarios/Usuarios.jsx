import { useState, useEffect, useContext } from "react";

/* Material UI */
import {
  TextField,
  Box,
  InputAdornment,
  MenuItem,
  Divider,
  Paper,
  Typography,
  Stack,
  Button,
} from "@mui/material";

/* Material UI Icons */
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";
import { FilterContext } from "../../../context/FilterContext";
import { GetSuscriptions } from "../../../api/Get";

function Usuarios({ admin }) {
  const { userFilter, setUserFilter } = useContext(FilterContext);
  const [suscriptionTypesList, setSuscriptionTypesList] = useState([]);

  const status = [
    {
      value: "S",
      label: "Solvente",
    },
    {
      value: "C",
      label: "Cancelada",
    },
    {
      value: "P",
      label: "Pago pendiente",
    },
    {
      value: "V",
      label: "Vencida",
    },
  ];

  const handleChange = (e) => {
    setUserFilter({
      ...userFilter,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    (async () => {
      let data = await GetSuscriptions();
      if (!data) return;
      setSuscriptionTypesList(data);
    })();
  }, []);

  return (
    <>
      <Form>
        <Box
          sx={{
            display: "grid",
            rowGap: 1,
            margin: "1rem",
            padding: "1rem 0",
          }}
        >
          {admin === "A" ? (
            <>
              <Paper variant="outlined" sx={{ padding: "1rem" }}>
                <Typography variant="h6" component="span">
                  Usuario
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    marginTop: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Correo"
                    variant="filled"
                    color="primary"
                    onChange={handleChange}
                    value={(userFilter && userFilter.email) || ""}
                    {...(userFilter &&
                      userFilter.email && {
                        InputLabelProps: {
                          shrink: true,
                        },
                      })}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    marginTop: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    select
                    id="suscription_type"
                    name="suscription_type"
                    value={(userFilter && userFilter.suscription_type) || ""}
                    label="Tipo de suscripción"
                    onChange={handleChange}
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
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    marginTop: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    id="suscription_status"
                    name="suscription_status"
                    select
                    label="Estatus de la suscripción"
                    value={userFilter?.suscription_status || ""}
                    onChange={handleChange}
                    variant="filled"
                    color="primary"
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gap: 1,
                    gridTemplateColumns: "repeat(3, 1fr)",
                    marginTop: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    id="person_name"
                    name="person_name"
                    label="Nombres"
                    variant="filled"
                    color="primary"
                    onChange={handleChange}
                    value={(userFilter && userFilter.person_name) || ""}
                    {...(userFilter &&
                      userFilter.person_name && {
                        InputLabelProps: {
                          shrink: true,
                        },
                      })}
                  />
                  <TextField
                    fullWidth
                    id="person_lastname"
                    name="person_lastname"
                    label="Apellidos"
                    variant="filled"
                    color="primary"
                    onChange={handleChange}
                    value={(userFilter && userFilter.person_lastname) || ""}
                    {...(userFilter &&
                      userFilter.person_lastname && {
                        InputLabelProps: {
                          shrink: true,
                        },
                      })}
                  />
                  <TextField
                    fullWidth
                    id="person_id"
                    name="person_id"
                    label="Cedula"
                    variant="filled"
                    color="primary"
                    type="number"
                    value={(userFilter && userFilter.person_id) || ""}
                    onChange={handleChange}
                    {...(userFilter &&
                      userFilter.person_id && {
                        InputLabelProps: {
                          shrink: true,
                        },
                      })}
                  />
                </Box>
              </Paper>
              {userFilter && Object.keys(userFilter).length !== 0 && (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    paddingTop: 3,
                  }}
                >
                  <Button
                    variant="filled"
                    color="info"
                    onClick={() => setUserFilter({})}
                  >
                    Limpiar
                  </Button>
                </Stack>
              )}
            </>
          ) : null}
        </Box>
      </Form>
    </>
  );
}
export default Usuarios;
