import React from "react";

/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import { Grid, Box, Typography } from "@mui/material";

/* React-Bootstrap */
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Table } from "react-bootstrap";

/* Font-Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

/* CSS */
import "./Cuenta.css";

function Cuenta() {
  return (
    <>
      <Grid className="account-page">
        <Grid align="center">
          <Box>
            <Typography variant="h4" component="h2">
              Detalles de su Cuenta
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <div className="account-page">
        <Container>
          <h2 className="text-center mb-3">Detalles de su Cuenta</h2>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th scope="row">Cédula</th>
                <td>00000000</td>
              </tr>
              <tr>
                <th scope="row">Nombres</th>
                <td>Weishler Joice</td>
              </tr>
              <tr>
                <th scope="row">Apellidos</th>
                <td>Berman Torres</td>
              </tr>
              <tr>
                <th scope="row">Correo</th>
                <td>WBerman@gmail.com</td>
              </tr>
              <tr>
                <th scope="row">Comprobante Documento de Identidad</th>
                <td>XXXX</td>
              </tr>
              <tr>
                <th scope="row">Telefonos</th>
                <td>
                  <ul>
                    <li>0424-0000-000</li>
                    <li>0424-0000-000</li>
                    <li>0424-0000-000</li>
                    <li>0424-0000-000</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>

          <h3 className="mb-3">Suscripción</h3>

          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th scope="row">Tipo</th>
                <td>00000000</td>
              </tr>
              <tr>
                <th scope="row">Monto</th>
                <td>Weishler Joice</td>
              </tr>
              <tr>
                <th scope="row">Estado</th>
                <td>Berman Torres</td>
              </tr>
              <tr>
                <th scope="row">Fecha de Inicio</th>
                <td>WBerman@gmail.com</td>
              </tr>
              <tr>
                <th scope="row">Fecha de Vencimiento</th>
                <td>XXXX</td>
              </tr>
            </tbody>
          </Table>

          <h3 className="mb-3">Pago de Mensualidad</h3>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Método</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Transferencia</td>
                <td>03-03-2021</td>
                <td>Aceptado</td>
                <td>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </td>
                <td>
                  <FontAwesomeIcon icon={faEdit} />
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="btn-flex mb-3 mt-3">
            <Button>
              <Link to="/Cuenta/Editar">Editar Cuenta</Link>
            </Button>
            <Button>Realizar Pago</Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Cuenta;
