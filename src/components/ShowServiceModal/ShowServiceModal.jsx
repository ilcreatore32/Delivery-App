import React, { useState, useEffect, Fragment } from "react";
import Modal from "../Modal/Modal";
import axiosClient from '../../config/axiosClient';

function ShowServiceModal(props) {
  const { selectedService, selectedServiceAreas, selectedServicePerson } = props;

  const [vehicleSelected, setVehiclesSelected] = useState({})
  const [errorVehicle, setErrorVehicle] = useState('')

  const getVehicle = async (vehiculoId) => {
    try {
      let vehiculo = await axiosClient.get(`/vehicles/${vehiculoId}`)
      setVehiclesSelected(vehiculo.data)
      setErrorVehicle('');
    } catch (err) {
      if (err.response) {
        setErrorVehicle(err.response.data.error);
        setVehiclesSelected({});
      }
    }
  }
  useEffect(() => {
    if ( selectedService.idVehiculos ) {
      getVehicle(selectedService.idVehiculos)
      return
    } else {
      setVehiclesSelected({})
      return
    }
  },[selectedService])
  return (
    <Modal {...props}>
      {
        errorVehicle
        ? <p>{errorVehicle}</p>
        : <form>

            <label htmlFor="times">Prestador del servicio: </label>
            <div id="times">
              <input type="text" value={ selectedServicePerson ? ` ${selectedServicePerson.nombre} ${selectedServicePerson.apellido}` : null}/>
            </div>

            <label htmlFor="times">Cédula de Identidad:</label>
            <div id="times">
              <input type="number" value={ selectedServicePerson ? selectedServicePerson.cedula : null}/>
            </div>

            <label htmlFor="vehicle">Medio de Transporte</label>
            <select name="medio_de_transporte" id="product-options" value={selectedService ? selectedService.medio_de_transporte : null}>
              <optgroup>
                <option>- Seleccionar Servicio -</option>
                <option value="Carro">Carro</option>
                <option value="Camion">Camion</option>
                <option value="Motocicleta">Motocicleta</option>
                <option value="Bicicleta">Bicicleta</option>
                <option value="Pie">Pie</option>
                <option value="Otro">Otro</option>
              </optgroup>
            </select>

            <label htmlFor="times">Horarios del Servicio</label>
            <div className="flex-container-modal evenly">
              <div>
                <label htmlFor="start-time">Inicio</label>
                <input type="time" id="start-time" name="inicio_de_horario" value={ selectedService ? selectedService.inicio_de_horario : null}></input>
              </div>
              <div>
                <label htmlFor="final-time">Fin</label>
                <input type="time" id="final-time" name="fin_de_horario" value={ selectedService ? selectedService.fin_de_horario : null}></input>
              </div>
            </div>

            <label htmlFor="times">Costo por Kilometro (En dolares $): </label>
            <div id="times">
              <input type="number" name="coste_por_kilometros" value={ selectedService ? selectedService.coste_por_kilometros : null}/>
            </div>

            <label htmlFor="disponibilidad">Disponibilidad</label>
            <div id="able">
              <label className="radio" htmlFor="true">
                Si
              </label>
              <input type="radio" id="true" name="disponibilidad" value="true" checked={selectedService.disponibilidad === 1 ? true : false}/>
              <label className="radio" htmlFor="false">
                No
              </label>
              <input type="radio" id="false" name="disponibilidad" value="false" checked={selectedService.disponibilidad === 0 ? true : false}/>
            </div>

            { Object.keys(vehicleSelected).length !== 0
              ? (
                <Fragment>
                  <label htmlFor="times">Modelo del Vehículo: </label>
                  <div id="times">
                    <input type="text" value={ vehicleSelected ? vehicleSelected.modelo : null }/>
                  </div>

                  <label htmlFor="times">Año del Vehículo:</label>
                  <div id="times">
                    <input type="number" value={ vehicleSelected ? vehicleSelected.year : null }/>
                  </div>

                  <label htmlFor="times">Cantidad de Casajeros del Vehículo:</label>
                  <div id="times">
                    <input type="number" value={ vehicleSelected ? vehicleSelected.cantidad_pasajeros : null }/>
                  </div>

                  <label htmlFor="times">Capacidad de Carga del Vehículo (Kg):</label>
                  <div id="times">
                    <input type="number" value={ vehicleSelected ? vehicleSelected.capacidad_carga : null}/>
                  </div>

                  <label htmlFor="times">Kilomentros del Vehículo:</label>
                  <div id="times">
                    <input type="number" value={ vehicleSelected ? vehicleSelected.kilometros : null }/>
                  </div>
                </Fragment>
                )
              : null
            }
            <p>Areas Operativas: </p>
            <table>
              <tr>
                <th>Estado</th>
                <th>Municipio</th>
                <th>Ciudad</th>
                <th>Parroquia</th>
              </tr>
              {
                selectedServiceAreas.length !== 0
                ? selectedServiceAreas.map((area) => (
                  <tr key={area.idAreaOperaciones}>
                    <td>{ area.estado }</td>
                    <td>{ area.municipio }</td>
                    <td>{ area.ciudad }</td>
                    <td>{ area.parroquia }</td>
                  </tr>
                ))
                : null
              }
            </table>
            {/*<label htmlFor="vehicle">Medio de Transporte</label>
            <div id="vehicle">
              <label htmlFor="car">Carro</label>
              <input type="radio" id="car" name="vehicle" value="car" />
              <label htmlFor="truck">Camion</label>
              <input type="radio" id="truck" name="vehicle" value="truck" />
              <label htmlFor="other">Otro</label>
              <input type="radio" id="other" name="vehicle" value="other" />
            </div>*/}
          </form>
      }

    </Modal>
  );
}

export default ShowServiceModal;
