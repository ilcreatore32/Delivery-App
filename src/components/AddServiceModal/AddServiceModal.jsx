import React from "react";
import AddServiceAreasModal from "../AddServiceAreasModal/AddServiceAreasModal";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";

function AddServiceModal(props) {
  const [
    isAddServiceAreasOpenModal,
    openAddServiceAreasModal,
    closeAddServiceAreasModal,
  ] = useModal();

  return (
    <Modal {...props}>
      <form action="">
        <h3 htmlFor="vehicle">Medio de Transporte</h3>
        <select name="vehicle" id="vehicle">
          <optgroup>
            <option value="test">test 1</option>
            <option value="test">test 2</option>
            <option value="test">test 3</option>
          </optgroup>
        </select>

        <h3 htmlFor="areas">Areas de Operacion</h3>
        <button
          className="add-button flex-item small-flex-item"
          onClick={openAddServiceAreasModal}
        >
          +
        </button>

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

        <h3 htmlFor="able">Disponibilidad</h3>
        <div id="able">
          <input type="radio" id="true" name="true" value="true" />
          <label for="true">Si</label>
          <input type="radio" id="false" name="false" value="false" />
          <label for="false">No</label>
        </div>

        <button type="submit">Publicar Servicio</button>
      </form>

      <AddServiceAreasModal
        isOpen={isAddServiceAreasOpenModal}
        closeModal={closeAddServiceAreasModal}
        title="Agregar Area de Operación"
      />
    </Modal>
  );
}

export default AddServiceModal;
