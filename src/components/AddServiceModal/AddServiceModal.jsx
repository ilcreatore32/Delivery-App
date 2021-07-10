import React, { useEffect, useState, useContext } from "react";
import AddServiceAreasModal from "../AddServiceAreasModal/AddServiceAreasModal";
import { AddServiceContext } from '../../context/addServiceContext';
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import axiosClient from '../../config/axiosClient';
import { v4 as uuid } from 'uuid';

function AddServiceModal(props) {
  const { serviceToAdd, setServiceToAdd, areaToAdd, setAreaToAdd, areasToAdd } = useContext(AddServiceContext);
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
  const [sucessVehicle, setSucessVehicle] = useState('')

  const getVehicles = async () => {
    try {
      let vehiculos = await axiosClient.get(`/vehicles`)
      let vehiculos_usuario = vehiculos.data.filter(function(vehiculo) {
        return vehiculo.personas_cedula === user.cedula
      })
      setVehicles(vehiculos_usuario)
      setErrorVehicle('');
    } catch (err) {
      if (err.response) {
        setErrorVehicle(err.response.data.error);
        setVehicles([]);
      }
    }
  }
  const saveService = e => {
    e.preventDefault()
    setServiceToAdd({
        ...serviceToAdd,
        [e.target.name] : e.target.value
    })
  }
  const sendService = async e => {
    e.preventDefault()

    if (areasToAdd.length === 0) {
      setErrorVehicle('Ingrese un area de operaciones')
      setTimeout(() => {
        setErrorVehicle('')
      }, 3000);
      return
    }
    try {
      await axiosClient.post('/services', serviceToAdd)
      areasToAdd.map(async area => {
        try {
          await axiosClient.post('/areas', {
            estado : area.estado,
            municipio : area.municipio,
            ciudad : area.ciudad,
            parroquia : area.parroquia,
            idServicioTransporte : serviceToAdd.idServicioTransporte
          })

          setSucessVehicle('Exito al crear el servicio');
          setTimeout(() => {
            setSucessVehicle('')
            window.location.replace('/')
          }, 3000);
        } catch (err) {
          if (err) {
            setErrorVehicle(Object.values(err.response.data[0])[0]);
            setTimeout(() => {
              setErrorVehicle('')
            }, 3000);
          }
        }
      })
    } catch (err) {
      if (err) {
        setErrorVehicle(Object.values(err.response.data[0])[0]);
        setTimeout(() => {
          setErrorVehicle('')
        }, 3000);
      }
    }
  }
  useEffect(() => {
    setServiceToAdd({...serviceToAdd, idServicioTransporte: uuid(), personas_cedula: user.cedula})
    getVehicles()
  },[])

  return (
    <Modal {...props}>
      <form onSubmit={sendService}>
        {errorVehicle ? <span class="toast danger">{errorVehicle}</span> : null}
        {sucessVehicle ? <span class="toast success">{sucessVehicle}</span> : null}

        <label htmlFor="vehicle">Vehículo</label>
        <select name="idVehiculos" id="vehicle" onChange={saveService}>
          <optgroup>
            <option value=''>- Seleccione un vehículo -</option>
            {
              vehicles.length !== 0
              ? vehicles.map(vehicle => (
                <option value={vehicle.idVehiculos}>{vehicle.modelo}</option>
              ))
              : <option value="">No posee vehículos</option>
            }
          </optgroup>
        </select>

        <label htmlFor="vehicle">Medio de Transporte</label>
        <select name="medio_de_transporte" id="product-options" onChange={saveService}>
          <optgroup>
            <option>- Seleccionar Servicio -</option>
            <option value="Carro">Carro</option>
            <option value="Camion">Camion</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Bicicleta">Bicicleta</option>
            <option value="Pie">Pie</option>
            <option value="Otro">Otro</option>
          </optgroup>
        </select>

        <h3 htmlFor="areas">Areas de Operacion</h3>
        <button
          className="add-button flex-item small-flex-item"
          onClick={(e) => { e.preventDefault(); openAddServiceAreasModal() }}
        >
          +
        </button>

        <table className="mg">
          <tr>
            <th>Estado</th>
            <th>Municipio</th>
            <th>Ciudad</th>
            <th>Parroquia</th>
          </tr>
          {
            areasToAdd.length !== 0
            ? areasToAdd.map(area =>
              <tr>
                <td>{area.estado}</td>
                <td>{area.municipio}</td>
                <td>{area.ciudad}</td>
                <td>{area.parroquia}</td>
              </tr>
              )
            : null
          }
        </table>

        <label htmlFor="times">Horarios del Servicio</label>
        <div className="flex-container-modal evenly">
          <div>
            <label htmlFor="start-time">Inicio</label>
            <input type="time" id="start-time" name="inicio_de_horario" onChange={saveService} ></input>
          </div>
          <div>
            <label htmlFor="final-time">Fin</label>
            <input type="time" id="final-time" name="fin_de_horario" onChange={saveService} ></input>
          </div>
        </div>

        <label htmlFor="times">Costo por Kilometro (En dolares): </label>
        <div id="times">
          <input type="number" name="coste_por_kilometros" onChange={saveService}/>
        </div>

        <label htmlFor="disponibilidad">Disponibilidad</label>
        <div id="able">
          <label className="radio" htmlFor="true">
            Si
          </label>
          <input type="radio" id="true" name="disponibilidad" value="1" onChange={saveService}/>
          <label className="radio" htmlFor="false">
            No
          </label>
          <input type="radio" id="false" name="disponibilidad" value="0" onChange={saveService}/>
        </div>

        <button className="b-submit" type="submit">Publicar Servicio</button>
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
