import React, { useState} from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../context/MainContext";
import { useFilters } from "../components/Filter";
import { dynamicSort } from "../components/Sort";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../style/home.module.css";

const CharacterList = () => {
  const { filters } = useFilters(); 
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      status: filters.status, 
      species: filters.species,
    },
  });
  const { t } = useTranslation();
  const [sortOrder, setSortOrder] = useState("asc"); 


  const fetchMoreData = () => {
    if (data?.characters?.info?.next) {
      fetchMore({
        variables: {
          page: data.characters.info.next, 
          status: filters.status, 
          species: filters.species, 
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          
          
          return {
            ...prev,
            characters: {
              ...fetchMoreResult.characters,
              results: [
                ...prev.characters.results,
                ...fetchMoreResult.characters.results,
              ],
            },
          };
        },
      });
    }
  };

 
  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error")}: {error.message}</p>;

 
  const filteredCharacters = data.characters.results.filter((character) => {
    return (
      (filters.status === "" || character.status === filters.status) &&
      (filters.species === "" || character.species === filters.species)
    );
  });

  
  const sortedCharacters = filteredCharacters.sort(dynamicSort(["name", "origin"], sortOrder));

  
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.Sort} onClick={handleSort}>
          {t("sort")}
        </button>
      </div>

      <div
        id="scrollableDiv"
        style={{
          height: "400px",
          overflow: "auto",
        }}
      >
        <InfiniteScroll
          dataLength={data.characters.results.length} 
          next={fetchMoreData} 
          inverse={false}
          hasMore={data.characters.info.next !== null} 
          loader={<h4>{t("Loading...")}</h4>}
          scrollableTarget="scrollableDiv"
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("Name")}</th>
                <th>{t("Status")}</th>
                <th>{t("Species")}</th>
                <th>{t("Gender")}</th>
                <th>{t("Origin")}</th>
              </tr>
            </thead>
            <tbody>
              {sortedCharacters.map((character) => (
                <tr key={character.name + character.origin.name}>
                  <td>{character.name}</td>
                  <td>{character.status}</td>
                  <td>{character.species}</td>
                  <td>{character.gender}</td>
                  <td>{character.origin.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default CharacterList;
