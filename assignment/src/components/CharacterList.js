import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../context/MainContext";
import { useFilters } from "../components/Filter";
import { dynamicSort } from "../components/Sort";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../style/home.module.css";

const CharacterList = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 }, // Initial page
  });
  const { filters } = useFilters();
  const { t } = useTranslation();

  const [sortOrder, setSortOrder] = React.useState("asc");

  const fetchMoreData = () => {
    if (data?.characters?.info?.next) {
      fetchMore({
        variables: {
          page: data.characters.info.next, // Fetch the next page directly from the API
        },
      });
    }
  };

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error")}: {error.message}</p>;

  // Filter and sort characters
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
          display: "flex",
          flexDirection: "column-reverse", // Keep the scroll bar at the bottom
        }}
      >
        <InfiniteScroll
          dataLength={sortedCharacters.length}
          next={fetchMoreData}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true} // Items load from the bottom
          hasMore={data?.characters?.info?.next !== null} // Check if there's more data
          loader={<h4>{t("Loading...")}</h4>}
          scrollableTarget="scrollableDiv"
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("Name")}</th>
                <th>{t("status")}</th>
                <th>{t("species")}</th>
                <th>{t("gender")}</th>
                <th>{t("origin")}</th>
              </tr>
            </thead>
            <tbody>
              {sortedCharacters.map((character) => (
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
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default CharacterList;
