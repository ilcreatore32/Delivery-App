import { createContext, useState, useEffect } from 'react';

export const OpenEditContext = createContext();

const OpenEditProvider = (props) => {
    const [openEditShippment, setOpenEditShippment] = useState(false);
    const [shippmentToEdit, setShippmentToEdit] = useState("")
    const [serviceToEdit, setServiceToEdit] = useState("")
    const [openEditService, setOpenEditService] = useState(false);
    const [vehicleToEdit, setVehicleToEdit] = useState("")
    const [openEditVehicle, setOpenEditVehicle] = useState(false);

    return (
        <OpenEditContext.Provider
            value={{
                openEditShippment,
                shippmentToEdit,
                serviceToEdit,
                openEditService,
                vehicleToEdit,
                openEditVehicle,
                setOpenEditShippment,
                setShippmentToEdit,
                setServiceToEdit,
                setOpenEditService,
                setVehicleToEdit,
                setOpenEditVehicle
            }}
        >
            {props.children}
        </OpenEditContext.Provider>
     );
}

export default OpenEditProvider;
