import { Link } from "react-router-dom";
import styles from "./MovieCard.module.scss";
import { Movie } from "../../../api/apiTypes";
import { useState } from "react";
import { useDeleteFavorite } from "../../../hooks/useDeleteFavorite";
import sprite from "../../../art/sprite.svg";

type MovieCardProps = {
  data: Movie;
  movieCardClass?: string;
};

export const MovieCard = ({
  data,
  movieCardClass,
}: MovieCardProps) => {
  const [removingId, setRemovingId] = useState(0);
  const { deleteFavorite } = useDeleteFavorite(removingId);

  const deletMovie = (id: number) => {
    setRemovingId(id);
    deleteFavorite();
  };

  return (
    <div className={`${styles.movie} ${movieCardClass || ""}`}>
      <Link
        className={styles["movie-link"]}
        to={`/movie/${data.id}`}
        aria-label={`Фильм ${data.title}`}
      >
        {data.posterUrl ? (
          <img
            className={styles["movie-link__img"]}
            src={data.posterUrl}
            alt={`Фильм ${data.title}`}
          />
        ) : (
          <div className={styles["movie-link__сap"]}>
            <h3 className={styles["movie-link__сap-title"]}>
              Фильм:
              <br />
              {data.title}
            </h3>
            <span className={styles["movie-link__сap-text"]}>
              К сожалению изображение отсутствует!
            </span>
          </div>
        )}
      </Link>
      {location.pathname == "/favorites" && (
        <button
          className={styles["movie__btn-del"]}
          type="button"
          onClick={() => deletMovie(data.id)}
          aria-label="Кнопка Закрыть"
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href={`${sprite}#icon-small_close`} />
          </svg>
        </button>
      )}
    </div>
  );
};
