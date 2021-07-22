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

        <label htmlFor="vehicle">Medio de Transporte</label>
        <select name="vehicle" id="vehicle">
          <optgroup>
            <option value="test">test 1</option>
            <option value="test">test 2</option>
            <option value="test">test 3</option>
          </optgroup>
        </select>

        <label htmlFor="areas">Areas de Operacion</label>
        <button
          className="add-button flex-item small-flex-item"
          onClick={openAddServiceAreasModal}
        >
          +
        </button>

        <table className="mg">
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

        <label htmlFor="able">Disponibilidad</label>
        <div id="able">
          <label className="radio" htmlFor="true">
            Si
          </label>
          <input type="radio" id="true" name="true" value="true" />
          <label className="radio" htmlFor="false">
            No
          </label>
          <input type="radio" id="false" name="false" value="false" />
        </div>

        <button className="b-submit" type="submit">Publicar Servicio</button>
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
