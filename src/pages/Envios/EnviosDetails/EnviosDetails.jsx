import React from "react";
import { useState } from "react";

/* Material UI */
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemButton,
  Paper,
  ListSubheader,
  Divider,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Collapse,
  TableHead,
} from "@mui/material";

/* Material UI Icons */
import BookmarkAddTwoToneIcon from "@mui/icons-material/BookmarkAddTwoTone";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function EnviosDetails() {
  const [open, setOpen] = useState(false);
  const [Offer, setOffer] = useState(false);
  const [SelectedOffer, setSelectedOffer] = useState(null);

  const handleOffer = () => {
    setOffer(true);
  };

  const handleCloseOffer = () => {
    setOffer(false);
  };

  const handleSelectedOffer = (e) => {
    setSelectedOffer(e.target.value);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "100%", padding: ".5rem" }}>
          <Paper sx={{ padding: "1rem" }} variant="outlined">
            <Box>
              <Typography align="center" variant="h4" component="h1">
                Detalles del Envio
              </Typography>
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ margin: "2rem 0" }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th">Fecha del Pedido</TableCell>
                      <TableCell align="center">05/05/2021</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Estado</TableCell>
                      <TableCell align="center">Disponible</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Valor Total</TableCell>
                      <TableCell align="center">50$</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Peso Total</TableCell>
                      <TableCell align="center">8 Kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Entidad Federal</TableCell>
                      <TableCell align="center">Distrito Capital</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Municipio</TableCell>
                      <TableCell align="center">Libertador</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Parroquía</TableCell>
                      <TableCell align="center">Sucre</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Dirección Detallada</TableCell>
                      <TableCell align="center">
                        Altavista, Calle Real de Altavista, Escuela Agramonte.
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
                <TableContainer component={Paper} variant="outlined">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">Harina</TableCell>
                        <TableCell align="center">Alimento</TableCell>
                        <TableCell align="center">12</TableCell>
                        <TableCell align="center">3</TableCell>
                        <TableCell align="center">3</TableCell>
                        <TableCell align="center">4</TableCell>
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
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                  component={Paper}
                  variant="outlined"
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
                      <BookmarkAddTwoToneIcon color="secondary" size="small" />
                    </IconButton>
                  </ListSubheader>
                  {Offer ? (
                    <>
                      <Box
                        sx={{
                          margin: "2rem 3rem",
                        }}
                      >
                        <ListSubheader>
                          Ofrecer Servicios de Transporte
                        </ListSubheader>
                        <FormControl fullWidth>
                          <InputLabel id="offer">Sus Servicios</InputLabel>
                          <Select
                            labelId="offer"
                            id="offer"
                            variant="filled"
                            value={SelectedOffer}
                            label="Sus Servicios"
                            onChange={handleSelectedOffer}
                          >
                            <MenuItem value={1}>Carro</MenuItem>
                            <MenuItem value={2}>Moto</MenuItem>
                            <MenuItem value={3}>Camion</MenuItem>
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
                            color="secondary"
                          >
                            Cancelar
                          </Button>
                          <Button variant="outlined" color="secondary">
                            Ofrecer Servicio
                          </Button>
                        </Box>
                      </Box>
                    </>
                  ) : null}
                  <Divider />
                  <ListItem
                    divider
                    secondaryAction={
                      <IconButton edge="end" aria-label="Eliminar Ofrecer">
                        <DeleteTwoToneIcon color="error" size="small" />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined}>
                      <ListItemIcon>
                        <BookmarkAddedTwoToneIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Prueba 1" secondary="prueba 2" />
                    </ListItemButton>
                  </ListItem>
                </List>
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
            <Typography align="center" variant="h4" component="h2">
              Detalles del Cliente
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
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default EnviosDetails;
