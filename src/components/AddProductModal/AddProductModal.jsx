import React from "react";
import Modal from "../Modal/Modal";

function AddProductModal(props) {
  return (
    <Modal {...props}>
      <form action="">
        <div className="grid-direction">
          <div>
            <label htmlFor="product">Producto</label>
            <input className="small-input" type="text" name="product" />
          </div>
          <div>
            <label htmlFor="howMuch">Cantidad Solicitada</label>
            <input className="small-input" type="number" name="howMuch" />
          </div>
          <div>
            <label htmlFor="add-product">Añadir</label>
            <button className="add-button flex-item small-flex-item add-product" name="add-product">+</button>
          </div>
        </div>

        <hr />
          <ul className="grid-products">
            <li>Harina Pan <sup>3</sup></li>
            <li>Mantequilla <sup>1</sup></li>
          </ul>
        <hr />

        <label htmlFor="date">Fecha</label>
        <input type="date" name="date" id="date" />

        <label htmlFor="description">Descripción</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>

        <div className="grid-direction">
          <div>
            <label htmlFor="estado">Estado</label>
            <input className="small-input" type="text" name="estado" />
          </div>

          <div>
            <label htmlFor="municipio">Municipio</label>
            <input className="small-input" type="text" />
          </div>

          <div>
            <label htmlFor="ciudad">Ciudad</label>
            <input className="small-input" type="text" name="ciudad" />
          </div>

          <div>
            <label htmlFor="parroquia">Parroquia</label>
            <input className="small-input" type="text" name="parroquia" />
          </div>

          <div>
            <label htmlFor="avenida">Avenida</label>
            <input className="small-input" type="text" name="avenida" />
          </div>

          <div>
            <label htmlFor="calle">Calle</label>
            <input className="small-input" type="text" name="calle" />
          </div>

          <div>
            <label htmlFor="edificio">Edificio</label>
            <input className="small-input" type="text" name="edificio" />
          </div>

          <div>
            <label htmlFor="piso">Piso</label>
            <input className="small-input" type="text" name="piso" />
          </div>
        </div>

        <label htmlFor="direction-ref">Referencia</label>
        <textarea
          name="direction-ref"
          id="direction-ref"
          cols="30"
          rows="10"
        ></textarea>

        <button className="b-submit" type="submit">Publicar Envío</button>
      </form>
    </Modal>
  );
}

export default AddProductModal;
