import { createContext, useState, useEffect } from 'react';

export const DeleteContext = createContext();

const DeleteProvider = (props) => {
    const [removeAreaService, setRemoveAreaService] = useState({})
    const [shippmentToDelete, setShippmentToDelete] = useState("")
    const [openDeleteShippment, setOpenDeleteShippment] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState("")
    const [openDeleteService, setOpenDeleteService] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState("")
    const [openDeleteVehicle, setOpenDeleteVehicle] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState("")
    const [openDeletePayment, setOpenDeletePayment] = useState(false);

    return (
        <DeleteContext.Provider
            value={{
                removeAreaService,
                shippmentToDelete,
                openDeleteShippment,
                serviceToDelete,
                openDeleteService,
                vehicleToDelete,
                openDeleteVehicle,
                paymentToDelete,
                openDeletePayment,
                setRemoveAreaService,
                setShippmentToDelete,
                setOpenDeleteShippment,
                setServiceToDelete,
                setOpenDeleteService,
                setVehicleToDelete,
                setOpenDeleteVehicle,
                setPaymentToDelete,
                setOpenDeletePayment
            }}
        >
            {props.children}
        </DeleteContext.Provider>
     );
}

export default DeleteProvider;
