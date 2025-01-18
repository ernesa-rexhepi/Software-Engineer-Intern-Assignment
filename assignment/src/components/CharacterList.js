import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../context/MainContext';
import { useFilters } from '../components/Filter';
import { dynamicSort } from '../components/Sort'; // Ensure this path is correct
import styles from '../style/home.module.css';

const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const { filters } = useFilters();
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order (ascending)
  const [currentPage, setCurrentPage] = useState(1); // Default to the first page
  const itemsPerPage = 10; // Set the number of items per page

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Apply filters to characters
  const filteredCharacters = data.characters.results.filter((character) => {
    return (
      (filters.status === '' || character.status === filters.status) &&
      (filters.species === '' || character.species === filters.species)
    );
  });

  // Sort filtered characters by name and origin
  const sortedCharacters = filteredCharacters.sort(dynamicSort(['name', 'origin'], sortOrder));

  // Pagination logic: Get the index of the last and first item for current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = sortedCharacters.slice(firstIndex, lastIndex);

  // Function to handle sorting when button is clicked
  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  // Handle next page click
  const nextPage = () => {
    if (currentPage < Math.ceil(sortedCharacters.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      {/* Sort button */}
      <div>
        <button className={styles.Sort} onClick={handleSort}>Sort by Name and Origin</button>
      </div>

      {/* Character table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Species</th>
            <th>Gender</th>
            <th>Origin</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((character) => (
            <tr key={character.name}>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
              <td>{character.gender}</td>
              <td>{character.origin.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button className={styles.PaginationButton} onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(sortedCharacters.length / itemsPerPage)}
        </span>
        <button className={styles.PaginationButton} onClick={nextPage} disabled={currentPage === Math.ceil(sortedCharacters.length / itemsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
