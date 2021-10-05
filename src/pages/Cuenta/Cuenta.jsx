import React from "react";
import { useState } from "react";

/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import {
  Grid,
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
} from "@mui/material";

/* Material UI Icons */
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilePresentTwoToneIcon from "@mui/icons-material/FilePresentTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/* CSS */
import "./Cuenta.css";

function Cuenta() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid className="account-page">
        <Grid align="center">
          <Box sx={{ margin: ".5rem 0" }}>
            <Typography variant="h4" component="h2">
              Detalles de su Cuenta
            </Typography>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ margin: "2rem 0" }}
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
                    <TableCell component="th">
                      Comprobante Documento de Identidad
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="large">
                        <FilePresentTwoToneIcon />
                      </IconButton>
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
          </Box>
          <Box sx={{ margin: ".5rem 0" }}>
            <Typography variant="h4" component="h2">
              Suscripción
            </Typography>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ margin: "2rem 0" }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th">Tipo</TableCell>
                    <TableCell align="center">Cliente</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Monto</TableCell>
                    <TableCell align="center">
                      100
                      <AttachMoneyIcon size="small" color="secondary" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Estado</TableCell>
                    <TableCell align="center">Activo</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Fecha de Inicio</TableCell>
                    <TableCell align="center">01/01/2021</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Fecha de Vencimiento</TableCell>
                    <TableCell align="center">01/01/2021</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ margin: ".5rem 0" }}>
            <Typography variant="h4" component="h2">
              Pagos de Mensualidad
            </Typography>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ margin: "2rem 0" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
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
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Transferencia</TableCell>
                    <TableCell>01/01/2021</TableCell>
                    <TableCell>Aceptado</TableCell>
                    <TableCell>
                      <IconButton size="large">
                        <VisibilityTwoToneIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton size="large">
                        <EditTwoToneIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton size="large">
                        <DeleteTwoToneIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
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
              color="secondary"
              to="/Cuenta/Editar"
            >
              Editar Cuenta
            </Button>
            <Button component={Link} variant="outlined" color="secondary">
              Algo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Cuenta;
