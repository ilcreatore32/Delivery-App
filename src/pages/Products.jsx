import React from "react";
import AddProductModal from "../components/AddProductModal/AddProductModal";
import ShowProductModal from '../components/ShowProductModal/ShowProductModal';
import useModal from "../hooks/useModal";

function Products() {

  const [isAddProductOpenModal, openAddProductModal, closeAddProductModal] = useModal();
  const [isShowProductOpenModal, openShowProductModal, closeShowProductModal] = useModal();

  return (
    <div>
      <h2 className="tab-title">Explora Envíos</h2>
      <div className="flex-container">
        <div className="flex-item">
          <h4>Envío 1</h4>
          <button className="detail-button" onClick={openShowProductModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>Envío 2</h4>
          <button className="detail-button" onClick={openShowProductModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>Envío 3</h4>
          <button className="detail-button" onClick={openShowProductModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>Envío 4</h4>
          <button className="detail-button" onClick={openShowProductModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>Envío 5</h4>
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
        title="Crear Nueva Solicitud de Envío"
      />

      <ShowProductModal
        isOpen={isShowProductOpenModal}
        closeModal={closeShowProductModal}
        title="Detalles del Envío"
      />
    </div>
  );
}

export default Products;
