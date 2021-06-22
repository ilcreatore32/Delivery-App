import React from 'react'
import Modal from '../Modal/Modal'

function AddProductModal(props) {
    return (
        <Modal {...props}>
            <form action="">
                <label htmlFor="">Nombre</label>
                <input type="text" />
            </form>
        </Modal>
    )
}

export default AddProductModal
