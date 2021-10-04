import React from "react";
import { useState } from "react";

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
} from "@mui/material";

/* React-Bootstrap */
import { Container, Form, Row, Col, ListGroup } from "react-bootstrap";

/* Font-Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

/* CSS */
import "./EditarCuenta.css";

function EditarCuenta() {
  const [NewPhone, setNewPhone] = useState(false);

  const switchPhone = () => {
    !NewPhone ? setNewPhone(true) : setNewPhone(false);
  };

  return (
    <>
      <Grid className="account-page">
        <Grid align="center">
          <Box sx={{ margin: ".5rem 0" }}>
            <Typography variant="h4" component="h2">
              Detalles de su Cuenta
            </Typography>
            
          </Box>
        </Grid>
      </Grid>
      <div className="edit-account-page">
        <Container>
          <h1 className="text-center mb-3">Editar Cuenta</h1>
          <div className="edit-account">
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Cedula
                </Form.Label>
                <Col sm="10" className="flex-input">
                  <Form.Select size="sm" className="small-select">
                    <option>V</option>
                  </Form.Select>
                  <Form.Control type="number" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Nombres
                </Form.Label>
                <Col sm="10" className="flex-input">
                  <Form.Control type="text" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Apellidos
                </Form.Label>
                <Col sm="10" className="flex-input">
                  <Form.Control type="text" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Correo
                </Form.Label>
                <Col sm="10" className="flex-input">
                  <Form.Control type="email" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="column-file mb-3">
                <Form.Label column sm="2">
                  Comprobante Documento de Identidad
                </Form.Label>
                <Col sm="10" className="flex-input">
                  <Form.Control type="file" size="sm" />
                </Col>
              </Form.Group>
              <Form.Group className="flex-phones mb-3">
                <div className="division">
                  <Form.Label>Telefonos</Form.Label>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      0424-0000000
                      <FontAwesomeIcon className="trash" icon={faTrashAlt} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      0212-0000000
                      <FontAwesomeIcon className="trash" icon={faTrashAlt} />
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                <div>
                  {NewPhone ? (
                    <div className="new-phone">
                      <Form.Control type="number" />
                      <span>-</span>
                      <Form.Control type="number" />
                    </div>
                  ) : null}
                  <div className="flex-btn">
                    <Button size="sm" onClick={() => switchPhone()}>
                      {!NewPhone ? "Añadir Nuevo Numero" : "Cerrar"}
                    </Button>
                    {NewPhone ? <Button size="sm">Agregar</Button> : null}
                  </div>
                </div>
              </Form.Group>
              <h3 className="mb-3">Suscripción</h3>
              <Form.Group>
                <Form.Select>
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
              <div className="btn-flex mb-3 mt-3">
                <Button>Cancelar</Button>
                <Button>Aceptar</Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default EditarCuenta;
