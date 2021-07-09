import React from "react";
import "./Modal.css";

function Modal({ isOpen, closeModal, title, children }) {
  const handleModalBodyClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`modal ${isOpen && "modal-open"}`} onClick={closeModal}>
      <span class="toast success">Success</span>
      <span class="toast danger">Danger</span>
      <div className="modal-body" onClick={handleModalBodyClick}>
        <div className="buttons">
          <h2> {title} </h2>
          <button className="button-close" onClick={closeModal}>
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
