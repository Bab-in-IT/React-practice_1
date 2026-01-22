import { Link } from "react-router-dom";
import styles from "./GenreCard.module.scss";
import genresArr from "../../../helpers/genresArr";

type Props = {
  genre: string;
  index: number;
};

export const GenreCard = ({ genre, index }: Props) => {
  return (
    <Link
      className={styles["genre-card"]}
      to={"/movie"}
      state={[genresArr[index], genre]}
    >
      <img
        className={styles["genre-card__img"]}
        src={`/images/img-${genre}.png`}
        width={290}
        height={220}
        alt={`Жанр ${genre}`}
      />
      <div className={styles["genre-card__wrap"]}>
        <h3 className={styles["genre-card__title"]}>
          {genresArr[index]}
        </h3>
      </div>
    </Link>
  );
};
