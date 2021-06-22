import React from "react";
import AddProductModal from "../components/AddProductModal/AddProductModal";
import ShowProductModal from '../components/ShowProductModal/ShowProductModal'
import useModal from "../hooks/useModal";

function Products() {

  const [isAddProductOpenModal, openAddProductModal, closeAddProductModal] = useModal();
  const [isShowProductOpenModal, openShowProductModal, closeShowProductModal] = useModal();

  return (
    <div>
      <h2 className="tab-title">Explora Envíos</h2>
      <div className="flex-container">
        <div className="flex-item">
          <h4>producto 1</h4>
          <button className="detail-button" onClick={openShowProductModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>producto 2</h4>
          <button className="detail-button" onClick={openShowProductModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>producto 3</h4>
          <button className="detail-button" onClick={openShowProductModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>producto 4</h4>
          <button className="detail-button" onClick={openShowProductModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>producto 5</h4>
          <button className="detail-button" onClick={openShowProductModal}>
            Ver
          </button>
        </div>
        <button className="add-button flex-item" onClick={openAddProductModal}>
          +
        </button>
      </div>
      <AddProductModal
        isOpen={isAddProductOpenModal}
        closeModal={closeAddProductModal}
        title="Formulario"
      />

      <ShowProductModal
        isOpen={isShowProductOpenModal}
        closeModal={closeShowProductModal}
        title="Producto"
      />
    </div>
  );
}

export default Products;
