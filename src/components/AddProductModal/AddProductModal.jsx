import React from "react";
import Modal from "../Modal/Modal";

function AddProductModal(props) {
  return (
    <Modal {...props}>
      <form action="">
        <label htmlFor="product">Nombre del producto</label>
        <input type="text" name="product" />

        <label htmlFor="date">Fecha</label>
        <input type="date" name="date" id="date" />

        <label htmlFor="description">Descripción</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>

        <label htmlFor="origin">Dirección Origen</label>
        <input type="text" name="origin" />

        <label htmlFor="destiny">Dirección Destino</label>
        <input type="text" name="destiny" />
      </form>
    </Modal>
  );
}

export default AddProductModal;
