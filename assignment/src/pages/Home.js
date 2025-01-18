import React from 'react';
import CharacterList from '../components/CharacterList';
import { FilterProvider, FilterControls } from '../components/Filter';
import styles from "../style/home.module.css"
const Home = () => {
  return (
    <div>
        <h1 className={styles.title}>Rick and Morty Characters</h1>
      <FilterProvider>
        <FilterControls />
        <CharacterList />
      </FilterProvider>
    </div>
  );
};

export default Home;
