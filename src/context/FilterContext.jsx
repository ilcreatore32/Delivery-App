import { createContext, useState } from 'react';

export const FilterContext = createContext();

const FilterProvider = (props) => {
    const [shippmentFilter, setShippmentFilter] = useState({});
    const [serviceFilter, setServiceFilter] = useState({})
    const [vehicleFilter, setVehicleFilter] = useState({})
    const [paymentFilter, setPaymentFilter] = useState({})
    const [userFilter, setUserFilter] = useState({})

    return (
        <FilterContext.Provider
            value={{
                shippmentFilter,
                serviceFilter,
                vehicleFilter,
                paymentFilter,
                userFilter,
                setShippmentFilter,
                setServiceFilter,
                setVehicleFilter,
                setPaymentFilter,
                setUserFilter
            }}
        >
            {props.children}
        </FilterContext.Provider>
     );
}

export default FilterProvider;
