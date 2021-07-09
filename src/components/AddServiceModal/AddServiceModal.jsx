import React, { useEffect, useState } from "react";
import AddServiceAreasModal from "../AddServiceAreasModal/AddServiceAreasModal";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import axiosClient from '../../config/axiosClient';
import { v4 as uuid } from 'uuid';

function AddServiceModal(props) {
  const [
    isAddServiceAreasOpenModal,
    openAddServiceAreasModal,
    closeAddServiceAreasModal,
  ] = useModal();
  const [user, setUser] = useState({
    cedula: 28044244,
    tipo_cedula: "V",
    nombre: "Jesús",
    apellido: "Rivas",
  })
  const [vehicles, setVehicles] = useState([])
  const [errorVehicle, setErrorVehicle] = useState('')
  const getVehicles = async () => {
    try {
      let vehiculos = await axiosClient.get(`/vehicles`)
      setVehicles(vehiculos.data)
      setErrorVehicle('');
    } catch (err) {
      if (err.response) {
        setErrorVehicle(err.response.data.error);
        setVehicles([]);
      }
    }
  }
  useEffect(() => {
    getVehicles()
  },[])

  return (
    <Modal {...props}>
      <form>
        <h3 htmlFor="vehicle">Medio de Transporte</h3>
        <select name="vehicle" id="vehicle">
          <optgroup>
            {
              vehicles.length !== 0
              ? vehicles.map(vehicle => (
                <option value={vehicle.idVehiculos}>{vehicle.modelo}</option>
              ))
              : <option value="">No posee vehículos</option>
            }
          </optgroup>
        </select>

        <h3 htmlFor="areas">Areas de Operacion</h3>
        <button
          className="add-button flex-item small-flex-item"
          onClick={(e) => { e.preventDefault(); openAddServiceAreasModal() }}
        >
          +
        </button>

        <h3 htmlFor="times">Horarios del Servicio</h3>
        <div id="times">
          <label htmlFor="start-time">Inicio</label>
          <input type="time" id="start-time"></input>
          <label htmlFor="final-time">Fin</label>
          <input type="time" id="final-time"></input>
        </div>

        <h3 htmlFor="times">Costo por Kilometro</h3>
        <div id="times">
          <input type="number" />
          <input type="range" />
        </div>

        <h3 htmlFor="able">Disponibilidad</h3>
        <div id="able">
          <input type="radio" id="true" name="option" value="true" />
          <label for="true">Si</label>
          <input type="radio" id="false" name="option" value="false" />
          <label for="false">No</label>
        </div>

        <button type="submit">Publicar Servicio</button>
      </form>

      <AddServiceAreasModal
        isOpen={isAddServiceAreasOpenModal}
        closeModal={closeAddServiceAreasModal}
        title="Agregar Area de Operación"
      />
    </Modal>
  );
}

export default AddServiceModal;
