import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../context/MainContext';
import { useFilters } from '../components/Filter';
import styles from '../style/home.module.css';

const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const { filters } = useFilters();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Apply filters to characters
  const filteredCharacters = data.characters.results.filter((character) => {
    return (
      (filters.status === '' || character.status === filters.status) &&
      (filters.species === '' || character.species === filters.species)
    );
  });

  return (
    <div className={styles.container}>
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
          {filteredCharacters.map((character) => (
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
    </div>
  );
};

export default CharacterList;
