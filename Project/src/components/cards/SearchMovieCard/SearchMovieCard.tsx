import { getRatingColor } from "../../../utilsFn/getRatingColor";
import styles from "./SearchMovieCard.module.scss";
import sprite from "../../../art/sprite.svg";
import { formatRunTime } from "../../../utilsFn/formatRunTime";
import { Movie } from "../../../api/apiTypes";
import { Link } from "react-router-dom";

interface SearchMovieCardProp {
  data: Movie;
  closeSearching: () => void;
  cleanInput: () => void;
}

export const SearchMovieCard = ({
  data,
  closeSearching,
  cleanInput,
}: SearchMovieCardProp) => {
  const handleOnClick = () => {
    closeSearching();
    cleanInput();
  };

  if (!data) {
    return;
  }
  return (
    <Link
      className={styles.found}
      to={`/movie/${data.id}`}
      onClick={handleOnClick}
    >
      {data.posterUrl ? (
        <img
          className={styles["found__img"]}
          src={data.posterUrl}
          width={40}
          height={52}
          alt={`Изображение фильма: ${data.title}`}
        />
      ) : (
        <div className={styles["found__сap"]}>
          <span className={styles["found__сap-text"]}>Not Img</span>
        </div>
      )}

      <div className={styles["found__info"]}>
        <div className={styles["found__quality"]}>
          <div
            className={`${styles["found__rating"]}`}
            style={getRatingColor(data.tmdbRating)}
          >
            <svg 
             className={`${styles["found__rating-icon"]}`}
            width="16" height="16" aria-hidden="true">
              <use href={`${sprite}#icon-star`} />
            </svg>

            <span className={styles["found__rating-text"]}>
              {parseFloat(String(data.tmdbRating).slice(0, 3))}
            </span>
          </div>
          <span className={styles["found__release"]}>
            {data.releaseYear}
          </span>
          <span className={styles["found__genre"]}>
            {data.genres[0]}
          </span>
          <span className={styles["found__runtime"]}>
            {formatRunTime(data.runtime)}
          </span>
        </div>
        <h3 className={styles["found__title"]}>{data.title}</h3>
      </div>
    </Link>
  );
};
