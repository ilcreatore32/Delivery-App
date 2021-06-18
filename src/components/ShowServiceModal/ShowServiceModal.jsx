import React from "react";
import Modal from "../Modal/Modal";

function ShowServiceModal(props) {
  return (
    <Modal {...props}>
      <form action="">
        <h3 htmlFor="vehicle">Medio de Transporte</h3>
        <div id="vehicle">
          <label for="car">Carro</label>
          <input type="radio" id="car" name="vehicle" value="car" />
          <label for="truck">Camion</label>
          <input type="radio" id="truck" name="vehicle" value="truck" />
          <label for="other">Otro</label>
          <input type="radio" id="other" name="vehicle" value="other" />
        </div>

        <h3 htmlFor="areas">Areas de Operativas</h3>
        <div id="areas">
          <input type="checkbox" id="catia" name="catia" value="Catia" />
          <label for="catia">Catia</label>
          <input type="checkbox" id="propatria" name="propatria" value="Propatria" />
          <label for="propatria">Propatria</label>
          <input type="checkbox" id="altamira" name="altamira" value="Altamira" />
          <label for="altamira">Altamira</label>
        </div>

        <h3 htmlFor="times">Horarios del Servicio</h3>
        <div id="times">
          <label htmlFor="start-time">Inicio</label>
          <input type="time" id="start-time"></input>
          <label htmlFor="final-time">Fin</label>
          <input type="time" id="final-time"></input>
        </div>

        <h3 htmlFor="times">Costo por Kilometro</h3>
        <div id="times">
          <input type="number" />
          <input type="range" />
        </div>

        <button>Editar</button>
        <button>Eliminar</button>
      </form>
    </Modal>
  );
}

export default ShowServiceModal;
