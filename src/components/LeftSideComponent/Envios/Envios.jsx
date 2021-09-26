import React from "react";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";

function Envios({ asumidos, admin }) {
  return (
    <>
      <div>
        <Form>
          <div className="location mt-3">
            <div className="responsive-flex">
              <h5 className="form-title">Ubicación</h5>
              <div className="responsive-flex-gap">
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
                    <option>Sucre</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="date">
            <div className="responsive-flex">
              <h5 className="form-title">Fecha</h5>
              <div className="responsive-flex-gap flex-date">
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="min-date">Mínima</Form.Label>
                  <Form.Control id="min-date" type="date" />
                </Form.Group>
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="max-date">Máxima</Form.Label>
                  <Form.Control id="max-date" type="date" />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="price">
            <div className="responsive-flex">
              <h5 className="form-title">Valor del Envío</h5>
              <div className="responsive-flex-gap">
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="min-price">Mínimo</Form.Label>
                  <Form.Control id="min-price" type="number" />
                </Form.Group>
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="max-price">Máximo</Form.Label>
                  <Form.Control id="max-price" type="number" />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="weight mb-3">
            <div className="responsive-flex">
              <h5 className="form-title">Peso</h5>
              <div className="responsive-flex-gap">
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="min-weight">Mínimo</Form.Label>
                  <Form.Control id="min-weight" type="number" />
                </Form.Group>
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="max-weight">Máximo</Form.Label>
                  <Form.Control id="max-weight" type="number" />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="status mb-3">
            {asumidos ? (
              <>
                <h5 className="form-title">Estatus</h5>
                <Form.Group className="flex-form-group mb-3">
                  <Form.Label htmlFor="status">Estado</Form.Label>
                  <Form.Select id="status" size="sm">
                    <option>Aceptado</option>
                  </Form.Select>
                </Form.Group>
              </>
            ) : null}
          </div>
          <div className="client mb-3">
            {admin ? (
              <>
                <h5 className="form-title">Cliente</h5>
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

export default Envios;
