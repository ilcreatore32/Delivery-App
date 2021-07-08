import React, { useEffect, useState } from "react";
import axiosClient from '../config/axiosClient';
import AddProductModal from "../components/AddProductModal/AddProductModal";
import ShowProductModal from '../components/ShowProductModal/ShowProductModal';
import useModal from "../hooks/useModal";

function Products() {

  const [isAddProductOpenModal, openAddProductModal, closeAddProductModal] = useModal();
  const [isShowProductOpenModal, openShowProductModal, closeShowProductModal] = useModal();

  const [requests, setRequests] = useState([])
  const [people, setPeople] = useState([])
  const [error, setError] = useState('')

  const [selectedRequest, setSelectedRequest] = useState({})
  const [selectedRequestPerson, setSelectedRequestPerson] = useState({})

  const getRequests = async () => {
    try {
      let obtainedRequests = await axiosClient.get('/requests')
      let obtainedPeople = await axiosClient.get('/people')
      setRequests(obtainedRequests.data);
      setPeople(obtainedPeople.data);
      setError('');

    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
        setRequests([]);
        setPeople([]);
      }
    }
  }
  const formatDate = (fecha) => {
    let date = new Date(fecha)
    return date.toISOString().split("T")[0]
  }
  const selectedRequestInformation = async (request, person) => {
    await setSelectedRequest(request)
    await setSelectedRequestPerson(person)
    openShowProductModal()
  }
  useEffect(() => {
    getRequests()
  },[])

  return (
    <div>
      <h2 className="tab-title">Explora Envíos</h2>
      <div className="flex-container">
        { error
          ? <p>{error}</p>
          : requests.map(request => {
            const { idSolicitudEnvio, fecha, ciudad, personas_cedula } = request
            const person = people.filter(function(person) {
              return person.cedula === personas_cedula
            })
            return (
              <div className="flex-item" key={idSolicitudEnvio}>
                <div className="transport_info_min">
                  <h4>{ person[0] ? person[0].nombre : null}</h4>
                  <p>{ciudad}</p>
                  <p>{ fecha ? formatDate(fecha) : null }</p>
                </div>
                <button className="detail-button" onClick={() => selectedRequestInformation(request, person[0])}>
                  Ver
                </button>
              </div>)
          })
        }
        <button className="add-button flex-item" onClick={openAddProductModal}>
          +
        </button>
      </div>
      <AddProductModal
        isOpen={isAddProductOpenModal}
        closeModal={closeAddProductModal}
        title="Crear Nueva Solicitud de Envío"
      />

      <ShowProductModal
        isOpen={isShowProductOpenModal}
        closeModal={closeShowProductModal}
        title="Detalles del Envío"
        selectedRequest={selectedRequest}
        selectedRequestPerson={selectedRequestPerson}
      />
    </div>
  );
}

export default Products;
