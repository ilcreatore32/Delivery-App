import React from "react";
import Modal from "../Modal/Modal";

function ShowServiceModal(props) {
  return (
    <Modal {...props}>
      <form action="">
        <label htmlFor="vehicle">Medio de Transporte</label>
        <div id="vehicle">
          <input type="radio" id="car" name="vehicle" value="car" />
          <label htmlFor="car">Carro</label>
          <input type="radio" id="truck" name="vehicle" value="truck" />
          <label htmlFor="truck">Camion</label>
          <input type="radio" id="other" name="vehicle" value="other" />
          <label htmlFor="other">Otro</label>
        </div>
        

        <p>Areas Operativas</p>
        <table>
          <tr>
            <th>Estado</th>
            <th>Municipio</th>
            <th>Ciudad</th>
            <th>Parroquia</th>
          </tr>
          <tr>
            <td>falcon</td>
            <td>no se</td>
            <td>caracas</td>
            <td>libertador</td>
          </tr>
        </table>

        <label htmlFor="times">Horarios del Servicio</label>
        <div className="flex-container-modal evenly">
          <div>
            <label htmlFor="start-time">Inicio</label>
            <input type="time" id="start-time"></input>
          </div>
          <div>
            <label htmlFor="final-time">Fin</label>
            <input type="time" id="final-time"></input>
          </div>
        </div>

        <label htmlFor="times">Costo por Kilometro</label>
        <div id="times">
          <input type="number" />
        </div>
      </form>
    </Modal>
  );
}

export default ShowServiceModal;
