import React, { useState, useEffect, Fragment } from "react";
import Modal from "../Modal/Modal";
import axiosClient from '../../config/axiosClient';

function ShowServiceModal(props) {
  const { selectedService, selectedServiceAreas, selectedServicePerson } = props;

  const [vehicleSelected, setVehiclesSelected] = useState({})
  const [errorVehicle, setErrorVehicle] = useState('')

  const getVehicle = async (vehiculoId) => {
    try {
      let vehiculo = await axiosClient.get(`/vehicles/${vehiculoId}`)
      setVehiclesSelected(vehiculo.data)
      setErrorVehicle('');
    } catch (err) {
      if (err.response) {
        setErrorVehicle(err.response.data.error);
        setVehiclesSelected({});
      }
    }
  }
  useEffect(() => {
    if ( selectedService.idVehiculos ) {
      getVehicle(selectedService.idVehiculos)
      return
    } else {
      setVehiclesSelected({})
      return
    }
  },[selectedService])
  return (
    <Modal {...props}>
      {
        errorVehicle
        ? <p>{errorVehicle}</p>
        : <Fragment>
            <h3>Prestador del servicio: { selectedServicePerson ? ` ${selectedServicePerson.nombre} ${selectedServicePerson.apellido}` : null}</h3>
            <h3>Cédula de Identidad: { selectedServicePerson ? ` ${selectedServicePerson.cedula}` : null}</h3>
            <h3>Medio de Transporte: { selectedService ? selectedService.medio_de_transporte : null}</h3>
            <h3>Hora de Inicio(Formato de 24 horas): { selectedService ? selectedService.inicio_de_horario : null}</h3>
            <h3>Hora de Finalización(Formato de 24 horas): { selectedService ? selectedService.fin_de_horario : null}</h3>
            <h3>Coste por Kilomentro: { selectedService ? selectedService.coste_por_kilometros : null}$</h3>
            <h3>Disponibilidad:
              { selectedService
                ? selectedService.disponibilidad === 1
                  ? ' Disponible' : ' No Disponible'
                : null
              }
            </h3>
            { Object.keys(vehicleSelected).length !== 0
              ? (
                <Fragment>
                  <h3>Modelo del Vehículo: { vehicleSelected ? vehicleSelected.modelo : null}</h3>
                  <h3>Año del Vehículo: { vehicleSelected ? vehicleSelected.year : null}</h3>
                  <h3>Cantidad de Casajeros del Vehículo: { vehicleSelected ? vehicleSelected.cantidad_pasajeros : null}</h3>
                  <h3>Capacidad de Carga del Vehículo (Kg): { vehicleSelected ? vehicleSelected.capacidad_carga : null}</h3>
                  <h3>Kilomentros del Vehículo: { vehicleSelected ? vehicleSelected.kilometros : null}</h3>
                </Fragment>
                )
              : null
            }
          </Fragment>
      }

    </Modal>
  );
}

export default ShowServiceModal;
