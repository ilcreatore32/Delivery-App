import React, { useState } from "react";

/* React-Router */
import { Link } from "react-router-dom";

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
} from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";

function Edit() {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [suscription, setSuscription] = useState("");

  const handleSuscriptionChange = (e) => {
    setSuscription(e.target.value);
  };

  return (
    <>
      <Grid className="account-page">
        <Grid align="center">
          <Box sx={{ margin: ".5rem 0" }}>
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
                          label="Editar Cédula"
                          variant="filled"
                          type="text"
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
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Correo Electronico</TableCell>
                      <TableCell>
                        <TextField
                          label="Editar Correo"
                          variant="filled"
                          type="email"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">
                        Comprobante Documento de Identidad
                      </TableCell>
                      <TableCell>
                        <label htmlFor="file">
                          <Input
                            accept="image/*"
                            id="file"
                            type="file"
                            sx={{ display: "none" }}
                          />
                          <IconButton
                            aria-label="Subir Archivo"
                            component="span"
                          >
                            <UploadFileTwoToneIcon size="large" />
                          </IconButton>
                        </label>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Telefonos</TableCell>
                      <TableCell >
                        {add ? (
                          <TableRow>
                            <TableCell sx={{ display: "flex", gap: "1rem" }}>
                              <TextField
                                label="Prefijo"
                                variant="filled"
                                type="number"
                              />
                              <TextField
                                label="Numero"
                                variant="filled"
                                type="number"
                              />
                            </TableCell>
                          </TableRow>
                        ) : null}
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Table size="small" aria-label="purchases">
                            <TableBody>
                              <TableRow>
                                <TableCell>0424-2029818</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>0424-2596061</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Collapse>
                        <IconButton size="small" onClick={() => setOpen(!open)}>
                          {open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                        <IconButton size="small" onClick={() => setAdd(!add)}>
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
              <Box>
                <Typography variant="subtitle1" component="h2" align="left">
                  Suscripción
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 130 }}>
                  <InputLabel id="suscription">Suscripción</InputLabel>
                  <Select
                    labelId="suscription"
                    variant="filled"
                    id="suscriptionSelect"
                    value={suscription}
                    label="Suscripción"
                    onChange={handleSuscriptionChange}
                  >
                    <MenuItem value={1}>Transportista Nivel Municipal</MenuItem>
                    <MenuItem value={2}>Transportista Nivel Estatal</MenuItem>
                    <MenuItem value={3}>Transportista Nivel Nacional</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem 2rem",
            }}
          >
            <Button variant="outlined" component={Link} to="/Cuenta">
              Cancel
            </Button>
            <Button variant="outlined">Guardar</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Edit;
