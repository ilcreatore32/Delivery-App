import React from "react";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";

function Servicios({ admin }) {
  return (
    <>
      <div>
        <Form>
          <div className="location mt-3">
            <h5 className="form-title">Ubicación</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="estado">Estado</Form.Label>
              <Form.Select id="state" size="sm">
                <option>DC</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="municipio">Municipio</Form.Label>
              <Form.Select id="municipio" size="sm">
                <option>Libertador</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="parroquia">Parroquia</Form.Label>
              <Form.Select id="parroquia" size="sm">
                <option>DC</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="time">
            <h5 className="form-title">Horario</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="init-time">Inicio</Form.Label>
              <Form.Control id="init-time" type="time" />
            </Form.Group>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="finish-time">Cierre</Form.Label>
              <Form.Control id="finish-time" type="time" />
            </Form.Group>
          </div>
          <div className="price">
            <h5 className="form-title">Precio</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="min-price">Mínimo</Form.Label>
              <Form.Control id="min-price" type="number" />
            </Form.Group>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="max-price">Máximo</Form.Label>
              <Form.Control id="max-price" type="number" />
            </Form.Group>
          </div>
          <div className="medium mb-3">
            <h5 className="form-title">Medio</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Select size="sm">
                <option>Moto</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="disponibility mb-3">
            <h5 className="form-title">Disponibilidad</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Select size="sm">
                <option>Inmediata</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="user mb-3">
            {admin ? (
              <>
                <h5 className="form-title">Usuario</h5>
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="firts-name">Nombres</Form.Label>
                  <Form.Control id="firts-name" type="text" />
                </Form.Group>
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="last-name">Apellidos</Form.Label>
                  <Form.Control id="last-name" type="text" />
                </Form.Group>
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="identity">Cedula</Form.Label>
                  <Form.Control id="identity" type="number" />
                </Form.Group>
              </>
            ) : null}
          </div>
        </Form>
      </div>
    </>
  );
}

export default Servicios;
