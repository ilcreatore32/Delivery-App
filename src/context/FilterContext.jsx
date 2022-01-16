import { createContext, useState, useEffect } from 'react';

export const FilterContext = createContext();

const FilterProvider = (props) => {
    const [shippmentFilter, setShippmentFilter] = useState({});

    return (
        <FilterContext.Provider
            value={{
                shippmentFilter,
                setShippmentFilter,
            }}
        >
            {props.children}
        </FilterContext.Provider>
     );
}

export default FilterProvider;
