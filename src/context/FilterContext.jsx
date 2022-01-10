import { createContext, useState, useEffect } from 'react';

export const FilterContext = createContext();

const FilterProvider = (props) => {
    const [openEditShippment, setOpenEditShippment] = useState(false);
    const [shippmentToEdit, setShippmentToEdit] = useState("")
    const [serviceToEdit, setServiceToEdit] = useState("")
    const [openEditService, setOpenEditService] = useState(false);
    const [vehicleToEdit, setVehicleToEdit] = useState("")
    const [openEditVehicle, setOpenEditVehicle] = useState(false);
    const [paymentToEdit, setPaymentToEdit] = useState("")
    const [openEditPayment, setOpenEditPayment] = useState(false);

    return (
        <FilterContext.Provider
            value={{
                openEditShippment,
                shippmentToEdit,
                serviceToEdit,
                openEditService,
                vehicleToEdit,
                openEditVehicle,
                paymentToEdit,
                openEditPayment,
                setOpenEditShippment,
                setShippmentToEdit,
                setServiceToEdit,
                setOpenEditService,
                setVehicleToEdit,
                setOpenEditVehicle,
                setPaymentToEdit,
                setOpenEditPayment
            }}
        >
            {props.children}
        </FilterContext.Provider>
     );
}

export default FilterProvider;
