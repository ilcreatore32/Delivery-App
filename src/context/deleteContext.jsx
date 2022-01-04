import { createContext, useState, useEffect } from 'react';

export const DeleteContext = createContext();

const DeleteProvider = (props) => {
    const [removeAreaService, setRemoveAreaService] = useState({})
    return (
        <DeleteContext.Provider
            value={{
                removeAreaService,
                setRemoveAreaService,
            }}
        >
            {props.children}
        </DeleteContext.Provider>
     );
}

export default DeleteProvider;
