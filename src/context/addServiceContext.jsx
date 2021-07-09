import React, { createContext, useState, useEffect } from 'react';

export const AddServiceContext = createContext();

const AddServiceProvider = (props) => {

    const [serviceToAdd, setServiceToAdd] = useState({})
    const [areaToAdd, setAreaToAdd] = useState({
      estado : "",
      municipio : "",
      ciudad : "",
      parroquia : "",
      idServicioTransporte : ""
    })

    return (
        <AddServiceContext.Provider
            value={{
                serviceToAdd,
                setServiceToAdd,
                areaToAdd,
                setAreaToAdd
            }}
        >
            {props.children}
        </AddServiceContext.Provider>
     );
}

export default AddServiceProvider;
