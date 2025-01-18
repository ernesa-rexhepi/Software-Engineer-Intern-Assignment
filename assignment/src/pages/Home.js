import React from "react";
import CharacterList from "../components/CharacterList";
import { FilterProvider, FilterControls } from "../components/Filter";
import { useTranslation } from "react-i18next";
import styles from "../style/home.module.css";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className={styles.title}>{t("title")}</h1>
      <FilterProvider>
        <FilterControls />
        <CharacterList />
      </FilterProvider>
    </div>
  );
};

export default Home;
