import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../context/MainContext";
import { useFilters } from "../components/Filter";
import { dynamicSort } from "../components/Sort";
import { useTranslation } from "react-i18next";
import styles from "../style/home.module.css";

const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const { filters } = useFilters();
  const { t } = useTranslation();

  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error")}: {error.message}</p>;

  const filteredCharacters = data.characters.results.filter((character) => {
    return (
      (filters.status === "" || character.status === filters.status) &&
      (filters.species === "" || character.species === filters.species)
    );
  });

  const sortedCharacters = filteredCharacters.sort(dynamicSort(["name", "origin"], sortOrder));

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = sortedCharacters.slice(firstIndex, lastIndex);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(sortedCharacters.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.Sort} onClick={handleSort}>
          {t("sort")}
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("status")}</th>
            <th>{t("species")}</th>
            <th>{t("gender")}</th>
            <th>{t("origin")}</th>
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

      <div className={styles.pagination}>
        <button
          className={styles.PaginationButton}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          {t("previous")}
        </button>
        <span>
          {t("page")} {currentPage} {t("of")} {Math.ceil(sortedCharacters.length / itemsPerPage)}
        </span>
        <button
          className={styles.PaginationButton}
          onClick={nextPage}
          disabled={currentPage === Math.ceil(sortedCharacters.length / itemsPerPage)}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
