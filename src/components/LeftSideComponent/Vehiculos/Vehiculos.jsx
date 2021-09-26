import React from "react";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";

function Vehiculos({ admin }) {
  var today = new Date();
  var year = today.getFullYear();
  var minYears = [];
  var maxYears = [];

  for (let x = 1950; x <= year; x++) {
    minYears.push(x);
  }
  for (let x = year; x >= 1950; x--) {
    maxYears.push(x);
  }

  return (
    <>
      <div>
        <Form>
          <div className="Vehiculo mt-3">
            <h5 className="form-title">Vehículo</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="type">Tipo</Form.Label>
              <Form.Select id="type" size="sm">
                <option>Carro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="brand">Marca</Form.Label>
              <Form.Select id="brand" size="sm">
                <option>Jeep</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="model">Modelo</Form.Label>
              <Form.Select id="model" size="sm">
                <option>Grand Cherokee</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="year">
            <h5 className="form-title">Fecha</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="min-year">Mínimo</Form.Label>
              <Form.Select id="min-year" size="sm">
                {minYears.map((year) => {
                  return (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="max-year">Maximo</Form.Label>
              <Form.Select id="max-year" size="sm">
                {maxYears.map((year) => {
                  return (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="passengers mb-3">
            <h5 className="form-title">Pasageros</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="min-passengers">Mínimo</Form.Label>
              <Form.Control id="min-passengers" type="number" />
            </Form.Group>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="max-passengers">Máximo</Form.Label>
              <Form.Control id="max-passengers" type="number" />
            </Form.Group>
          </div>
          <div className="weight mb-3">
            <h5 className="form-title">Carga</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="min-weight">Mínima</Form.Label>
              <Form.Control id="min-weight" type="number" />
            </Form.Group>
            <Form.Group className="flex-form-group mb-3">
              <Form.Label htmlFor="max-weight">Máxima</Form.Label>
              <Form.Control id="max-weight" type="number" />
            </Form.Group>
          </div>
          <div className="mb-3">
            <h5 className="form-title">Matricula</h5>
            <Form.Group className="flex-form-group mb-3">
              <Form.Control type="text" />
            </Form.Group>
          </div>
          <div className="client mb-3">
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

export default Vehiculos;
