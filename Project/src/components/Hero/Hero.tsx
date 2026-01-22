import styles from "./Hero.module.scss";
import sprite from "../../art/sprite.svg";
import { Movie } from "../../api/apiTypes";
import { formatRunTime } from "../../utilsFn/formatRunTime";
import { getRatingColor } from "../../utilsFn/getRatingColor";
import { HeroButtons } from "./HeroButtons";
import { memo } from "react";

type HeroProps = {
  data: Movie;
  refetch: () => void;
  panelClass?: string;
  classTrailerBtn?: string;
  classFavouriteBtn?: string;
};

export const Hero = memo(
  ({
    data,
    refetch,
    panelClass,
    classTrailerBtn,
    classFavouriteBtn,
  }: HeroProps) => {
    return (
      <section className={styles.hero}>
        <div className={styles["hero__wrapper"]}>
          <div className={styles["hero__info"]}>
            <div className={styles["hero__data"]}>
              <div className={styles["hero__quality"]}>
                <div
                  className={`${styles["hero__rating"]}`}
                  style={getRatingColor(data.tmdbRating)}
                >
                  <svg width="16" height="16" aria-hidden="true">
                    <use href={`${sprite}#icon-star`} />
                  </svg>
                  <span className={styles["hero__rating-text"]}>
                    {parseFloat(String(data.tmdbRating).slice(0, 3))}
                  </span>
                </div>
                <span className={styles["hero__release"]}>
                  {data.releaseYear}
                </span>
                <span className={styles["hero__genre"]}>
                  {data.genres[0]}
                </span>
                <span className={styles["hero__runtime"]}>
                  {formatRunTime(data.runtime)}
                </span>
              </div>
              <h2 className={styles["hero__title"]}>{data.title}</h2>
              <p className={styles["hero__description"]}>
                {data.plot}
              </p>
            </div>
            <div className={`${styles["hero__panel"]} ${panelClass}`}>
              <HeroButtons
                data={data}
                refetch={refetch}
                classTrailerBtn={classTrailerBtn}
                classFavouriteBtn={classFavouriteBtn}
              />
            </div>
          </div>
          {data.backdropUrl ? (
            <img
              className={styles["hero__img"]}
              src={data.backdropUrl}
              width={680}
              height={522}
              alt={`Изображение фильма: ${data.title}`}
            />
          ) : (
            <div className={styles["hero__сap"]}>
              <span className={styles["hero__сap-text"]}>
                К сожалению изображение отсутствует
              </span>
            </div>
          )}
        </div>
      </section>
    );
  }
);
