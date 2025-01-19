import React, { useState, createContext, useContext } from 'react';
import style from "../style/home.module.css"

const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    status: '',
    species: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, handleFilterChange }}>
      {children}
    </FilterContext.Provider>
  );
};

export const FilterControls = () => {
  const { filters, handleFilterChange } = useFilters();

  return (
    <div style={{ marginBottom: '10px' }}>
      <select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        className={style.filtersWrapper}>
        <option value="">All Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="Unknown">Unknown</option>
      </select>

      <select
        name="species"
        value={filters.species}
        onChange={handleFilterChange}
        className={style.filtersWrapper}>
        <option value="">All Species</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Humanoid">Humanoid</option>
     
      </select>
    </div>
  );
};
