import React from 'react'
import Modal from '../Modal/Modal'


function ShowProductModal(props) {
    return (
        <Modal {...props}>
            <form action="">
                <label htmlFor="">Nombre del producto</label>
                <input type="text" />
            </form>
        </Modal>
    )
}

export default ShowProductModal