import { createContext, useState, useEffect } from 'react';

export const OpenEditContext = createContext();

const OpenEditProvider = (props) => {
    const [openEditShippment, setOpenEditShippment] = useState(false);
    const [shippmentToEdit, setShippmentToEdit] = useState("")
    const [serviceToEdit, setServiceToEdit] = useState("")
    const [openEditService, setOpenEditService] = useState(false);

    return (
        <OpenEditContext.Provider
            value={{
                openEditShippment,
                shippmentToEdit,
                serviceToEdit,
                openEditService,
                setOpenEditShippment,
                setShippmentToEdit,
                setServiceToEdit,
                setOpenEditService
            }}
        >
            {props.children}
        </OpenEditContext.Provider>
     );
}

export default OpenEditProvider;
