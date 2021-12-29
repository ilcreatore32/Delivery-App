import { createContext, useState, useEffect } from 'react';

export const OpenEditContext = createContext();

const OpenEditProvider = (props) => {
    const [openEditShippment, setOpenEditShippment] = useState(false);
    const [shippmentToEdit, setShippmentToEdit] = useState("")
    return (
        <OpenEditContext.Provider
            value={{
                openEditShippment,
                shippmentToEdit,
                setOpenEditShippment,
                setShippmentToEdit
            }}
        >
            {props.children}
        </OpenEditContext.Provider>
     );
}

export default OpenEditProvider;
