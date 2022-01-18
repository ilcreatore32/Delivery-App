import { useContext } from "react";

/* Context */
import { FilterContext } from "../../../context/FilterContext";

/* Material UI */
import {
  TextField,
  Box,
  InputAdornment,
  Divider,
  Paper,
  Typography,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";

/* Material UI Icons */
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";

function Pagos() {
  const { paymentFilter, setPaymentFilter } = useContext(FilterContext);

  const paymentMethods = [
    {
      value: "T",
      label: "Transferencia",
    },
    {
      value: "E",
      label: "Efectivo",
    },
    {
      value: "P",
      label: "Pago Móvil",
    },
  ];

  const handleChange = (e) => {
    setPaymentFilter({
      ...paymentFilter,
      [e.target.name]: e.target.value,
    });
  };

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
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Método
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField
                id="method"
                name="method"
                select
                label="Método"
                value={paymentFilter?.method || ""}
                onChange={handleChange}
                variant="filled"
                color="primary"
              >
                {paymentMethods.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Paper>
          {/* 
            view_option, // E.g 'admin', 'carrier'
            person_id='', // E.g '123456789'
            person_name='', // E.g 'John'
            person_lastname='', // E.g 'Doe' 
          */}
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Fecha
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                id="min_date"
                name="min_date"
                label="Mínima"
                type="date"
                variant="filled"
                color="primary"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={
                  (paymentFilter &&
                    paymentFilter.min_date &&
                    paymentFilter.min_date.split("T")[0]) ||
                  ""
                }
                size="small"
                fullWidth
              />
              <TextField
                id="max_date"
                name="max_date"
                label="Máxima"
                type="date"
                variant="filled"
                color="primary"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={
                  (paymentFilter &&
                    paymentFilter.max_date &&
                    paymentFilter.max_date.split("T")[0]) ||
                  ""
                }
                size="small"
                fullWidth
              />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Monto
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                id="min_amount"
                name="min_amount"
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
                color="primary"
                onChange={handleChange}
                value={(paymentFilter && paymentFilter.min_amount) || ""}
              />
              <TextField
                id="max_amount"
                name="max_amount"
                label="Máximo"
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
                color="primary"
                onChange={handleChange}
                value={(paymentFilter && paymentFilter.max_amount) || ""}
              />
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Estado
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField
                id="status"
                name="status"
                select
                label="Estatus"
                value={paymentFilter?.status || ""}
                onChange={handleChange}
                variant="filled"
                fullWidth
              >
                {[
                  { value: "P", name: "Pendiente" },
                  { value: "A", name: "Aprobado" },
                  { value: "R", name: "Rechazado" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Paper>
          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Referencia
            </Typography>
            <Box
              sx={{
                display: "grid",
              }}
            >
              <TextField
                id="reference"
                name="reference"
                label="Referencia"
                variant="filled"
                color="primary"
                onChange={handleChange}
                value={(paymentFilter && paymentFilter.reference) || ""}
                {...(paymentFilter &&
                  paymentFilter.reference && {
                    InputLabelProps: {
                      shrink: true,
                    },
                  })}
              />
            </Box>
          </Paper>

          <Divider variant="middle" />
          <Paper variant="outlined" sx={{ padding: "1rem" }}>
            <Typography variant="h6" component="span">
              Usuario
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <TextField
                id="person_name"
                name="person_name"
                label="Nombres"
                variant="filled"
                color="primary"
                onChange={handleChange}
                value={(paymentFilter && paymentFilter.person_name) || ""}
                {...(paymentFilter &&
                  paymentFilter.person_name && {
                    InputLabelProps: {
                      shrink: true,
                    },
                  })}
              />
              <TextField
                id="person_lastname"
                name="person_lastname"
                label="Apellidos"
                variant="filled"
                color="primary"
                onChange={handleChange}
                value={(paymentFilter && paymentFilter.person_lastname) || ""}
                {...(paymentFilter &&
                  paymentFilter.person_lastname && {
                    InputLabelProps: {
                      shrink: true,
                    },
                  })}
              />
              <TextField
                id="person_id"
                name="person_id"
                label="Cedula"
                variant="filled"
                color="primary"
                type="number"
                value={(paymentFilter && paymentFilter.person_id) || ""}
                onChange={handleChange}
                {...(paymentFilter &&
                  paymentFilter.person_id && {
                    InputLabelProps: {
                      shrink: true,
                    },
                  })}
              />
            </Box>
          </Paper>
          {paymentFilter && Object.keys(paymentFilter).length !== 0 && (
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
                onClick={() => setPaymentFilter({})}
              >
                Limpiar
              </Button>
            </Stack>
          )}
        </Box>
      </Form>
    </>
  );
}

export default Pagos;
