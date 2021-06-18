import React from "react";
import AddServiceModal from "../components/AddServiceModal/AddServiceModal";
import ShowServiceModal from '../components/ShowServiceModal/ShowServiceModal';
import useModal from "../hooks/useModal";

function Services() {
  const [isAddServiceOpenModal, openAddServiceModal, closeAddServiceModal] =
    useModal();
  const [isShowServiceOpenModal, openShowServiceModal, closeShowServiceModal] =
    useModal();

  return (
    <div>
      <h2 className="tab-title">Explora los Servicios de Transporte</h2>
      <div className="flex-container">
        <div className="flex-item">
          <h4>servicio 1</h4>
          <button className="detail-button" onClick={openShowServiceModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>servicio 2</h4>
          <button className="detail-button" onClick={openShowServiceModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>servicio 3</h4>
          <button className="detail-button" onClick={openShowServiceModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>servicio 4</h4>
          <button className="detail-button" onClick={openShowServiceModal}>
            Ver
          </button>
        </div>
        <div className="flex-item">
          <h4>servicio 5</h4>
          <button className="detail-button" onClick={openShowServiceModal}>
            Ver
          </button>
        </div>
        <button className="add-button flex-item" onClick={openAddServiceModal}>
          +
        </button>
      </div>
      <AddServiceModal
        isOpen={isAddServiceOpenModal}
        closeModal={closeAddServiceModal}
        title="Publicar Nuevo Servicio de Transporte"
      />
      <ShowServiceModal
        isOpen={isShowServiceOpenModal}
        closeModal={closeShowServiceModal}
        title="Detalles del Servicio"
      />
    </div>
  );
}

export default Services;
