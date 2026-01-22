import styles from "./MovieList.module.scss";
import { MovieList } from "../../api/apiTypes";

import "../../art/styles/button.scss";
import { MovieCard } from "../cards/MovieCard/MovieCard";
import { memo } from "react";

interface MoviesListProp {
  data: MovieList;
  listClass?: string;
  itemClass?: string;
  movieCardClass?: string;
}

export const MoviesList = memo(
  ({
    data,
    listClass,
    itemClass,
    movieCardClass,
  }: MoviesListProp) => {
    return (
      <ul className={`${styles.list} ${listClass || ""}`}>
        {data.map((film, i) => (
          <li
            className={`${styles["list__item"]} ${itemClass || ""}`}
            key={film.id}
          >
            {location.pathname == "/" && (
              <span className={styles["list__item-counter"]}>
                {i + 1}
              </span>
            )}
            <MovieCard data={film} movieCardClass={movieCardClass} />
          </li>
        ))}
      </ul>
    );
  }
);
