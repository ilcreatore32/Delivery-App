import React from "react";
import Modal from "../Modal/Modal";

function AddServiceAreasModal(props) {
  return (
    <Modal {...props}>
      <form action="">
        <label htmlFor="estado">Estado</label>
        <input type="text" name="state" />

        <label htmlFor="municipio">Municipio</label>
        <input type="text" />

        <label htmlFor="ciudad">Ciudad</label>
        <input type="text" name="ciudad" />

        <label htmlFor="parroquia">Parroquia</label>
        <input type="text" name="parroquia" />

        <button type="submit">Agregar Area</button>
      </form>
    </Modal>
  );
}

export default AddServiceAreasModal;
