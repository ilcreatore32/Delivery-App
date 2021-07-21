import React from "react";
import Modal from "../Modal/Modal";

function AddProductModal(props) {
  return (
    <Modal {...props}>
      <form action="">
        <label htmlFor="product-options">Producto Solicitado</label>
        <select name="product-options" id="product-options">
          <optgroup>
            <option value="test">test 1</option>
            <option value="test">test 2</option>
            <option value="test">test 3</option>
          </optgroup>
        </select>

        <label htmlFor="howMuch">Cantidad Solicitada</label>
        <input type="number" name="howMuch" />

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
        <button type="submit">Publicar Envío</button>
      </form>
    </Modal>
  );
}

export default AddProductModal;
