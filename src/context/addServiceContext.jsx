import React, { createContext, useState, useEffect } from 'react';

export const AddServiceContext = createContext();

const AddServiceProvider = (props) => {
  const [user, setUser] = useState({
    cedula: 28044244,
    tipo_cedula: "V",
    nombre: "Jesús",
    apellido: "Rivas",
  })
    const [serviceToAdd, setServiceToAdd] = useState({
      idServicioTransporte: '',
      medio_de_transporte: '',
      inicio_de_horario: '',
      fin_de_horario: '',
      coste_por_kilometros: 0,
      disponibilidad: true,
      idVehiculos: '',
      personas_cedula: user.cedula
    })
    const [areaToAdd, setAreaToAdd] = useState({
      estado : "",
      municipio : "",
      ciudad : "",
      parroquia : "",
      idServicioTransporte : ""
    })
    const [areasToAdd, setAreasToAdd] = useState([])

    return (
        <AddServiceContext.Provider
            value={{
                serviceToAdd,
                setServiceToAdd,
                areaToAdd,
                setAreaToAdd,
                areasToAdd,
                setAreasToAdd
            }}
        >
            {props.children}
        </AddServiceContext.Provider>
     );
}

export default AddServiceProvider;
