import React, { useEffect, useState, useContext }  from "react";
import Modal from "../Modal/Modal";
import { AddServiceContext } from '../../context/addServiceContext';
import useModal from "../../hooks/useModal";

function AddServiceAreasModal(props) {
  const [user, setUser] = useState({
    cedula: 28044244,
    tipo_cedula: "V",
    nombre: "Jesús",
    apellido: "Rivas",
  })
  const {closeModal} = props;
  const { areaToAdd, setAreaToAdd, areasToAdd, setAreasToAdd } = useContext(AddServiceContext);

  const saveArea = e => {
    e.preventDefault()
    setAreaToAdd({
        ...areaToAdd,
        [e.target.name] : e.target.value
    })
  }
  const submitArea = e => {
    e.preventDefault()
    setAreasToAdd(prevAareasToAdd => [...prevAareasToAdd, areaToAdd])
    console.log(areasToAdd);
    closeModal()
  }
  return (
    <Modal {...props}>
      <form onSubmit={submitArea}>
        <label htmlFor="estado">Estado</label>
        <input type="text" name="estado" onChange={saveArea}/>

        <label htmlFor="municipio">Municipio</label>
        <input type="text" name="municipio"onChange={saveArea}/>

        <label htmlFor="ciudad">Ciudad</label>
        <input type="text" name="ciudad" onChange={saveArea}/>

        <label htmlFor="parroquia">Parroquia</label>
        <input type="text" name="parroquia" onChange={saveArea}/>

        <button type="submit">Agregar Area</button>
      </form>
    </Modal>
  );
}

export default AddServiceAreasModal;
