import React, { useState, useEffect } from "react";
import AddServiceModal from "../components/AddServiceModal/AddServiceModal";
import ShowServiceModal from '../components/ShowServiceModal/ShowServiceModal';
import useModal from "../hooks/useModal";
import axiosClient from '../config/axiosClient';

function Services() {
  const [isAddServiceOpenModal, openAddServiceModal, closeAddServiceModal] =
    useModal();
  const [isShowServiceOpenModal, openShowServiceModal, closeShowServiceModal] =
    useModal();
  const [services, setServices] = useState([])
  const [areas, setAreas] = useState([])
  const [people, setPeople] = useState([])

  const [error, setError] = useState('')

  const [selectedService, setSelectedService] = useState({})
  const [selectedServiceAreas, setSelectedServiceAreas] = useState([])
  const [selectedServicePerson, setSelectedServicePerson] = useState({})



  const getServices = async () => {
    try {
      let obtainedServices = await axiosClient.get('/services')
      let obtainedAreas = await axiosClient.get('/areas')
      let obtainedPeople = await axiosClient.get('/people')
      setServices(obtainedServices.data);
      setAreas(obtainedAreas.data);
      setPeople(obtainedPeople.data);
      setError('');

    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
        setServices([]);
        setAreas([]);
        setPeople([]);
      }
    }
  }
  const selectedServiceInformation = async (service, areas, person) => {
    await setSelectedService(service)
    await setSelectedServiceAreas(areas)
    await setSelectedServicePerson(person)
    openShowServiceModal()
  }
  useEffect(() => {
    getServices()
  },[])

  return (
    <div>
      <h2 className="tab-title">Explora los Servicios de Transporte</h2>
      <div className="flex-container">
        { error
          ? <p>{error}</p>
          : services.map(service => {
            const { medio_de_transporte, coste_por_kilometros, idServicioTransporte, personas_cedula } = service
            const area = areas.filter(function(area) {
              return area.idServicioTransporte === idServicioTransporte
            })
            const person = people.filter(function(person) {
              return person.cedula === personas_cedula
            })
            return (
              <div className="flex-item" key={idServicioTransporte} style={{ height: "auto",maxHeight: "700px" }}>
                <div className="transport_info_min" >
                  <h4>{medio_de_transporte}</h4>
                  <p>{coste_por_kilometros}</p>
                  {area.map(area =>
                    <p key={area.idAreaOperaciones}>{area.estado}</p>
                  )}
                  <p>{ person[0] ? person[0].nombre : null}</p>
                </div>
                <button className="detail-button" onClick={() => selectedServiceInformation(service, area, person[0])}>
                  Ver
                </button>
              </div>)
          })
        }

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
        selectedService={selectedService}
        selectedServiceAreas={selectedServiceAreas}
        selectedServicePerson={selectedServicePerson}
      />
    </div>
  );
}

export default Services;
