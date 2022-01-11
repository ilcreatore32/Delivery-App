import { createContext, useState, useEffect } from 'react';

export const FilterContext = createContext();

const FilterProvider = (props) => {
    const [shippmentFilter, setShippmentFilter] = useState({});
    const [openEditShippment, setOpenEditShippment] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState("")
    const [openEditService, setOpenEditService] = useState(false);
    const [vehicleToEdit, setVehicleToEdit] = useState("")
    const [openEditVehicle, setOpenEditVehicle] = useState(false);
    const [paymentToEdit, setPaymentToEdit] = useState("")
    const [openEditPayment, setOpenEditPayment] = useState(false);

    return (
        <FilterContext.Provider
            value={{
                shippmentFilter,
                openEditShippment,
                serviceToEdit,
                openEditService,
                vehicleToEdit,
                openEditVehicle,
                paymentToEdit,
                openEditPayment,
                setShippmentFilter,
                setOpenEditShippment,
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
