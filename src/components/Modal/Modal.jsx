import React from 'react'
import './Modal.css'

function Modal({ isOpen, closeModal, title, children }) {

    const handleModalBodyClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}>
            <div className="modal-body" onClick={handleModalBodyClick}>
                <h2> { title } </h2>
                <button onClick={closeModal}>
                    close
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
