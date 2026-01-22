import { Movie } from "../../api/apiTypes";
import styles from "./MovieInfo.module.scss";
import { languageCodes } from "../../helpers/lanuageArr";
import { memo } from "react";

type MovieInfoProp = {
  data: Movie;
};

const formatPrice = (value: string | null) => {
  if (value === null) {
    return;
  }
  const price = Number(value);
  return new Intl.NumberFormat("ru-RU").format(price) + " USD";
};

export const MovieInfo = memo(({ data }: MovieInfoProp) => {
  return (
    <section className={styles.info}>
      <h3 className={styles["info__title"]}>О фильме</h3>

      <div className={styles["info__wrapper"]}>
        {data.language === null || (
          <>
            <div className={styles["info__designation"]}>
              <span className={styles["info__name"]}>
                Язык оригинала
              </span>
              <span className={styles["info__dots"]}></span>
            </div>

            <span className={styles["info__data"]}>
              {languageCodes[data.language]}
            </span>
          </>
        )}

        {data.budget === null || (
          <>
            <div className={styles["info__designation"]}>
              <span className={styles["info__name"]}>Бюджет</span>
              <span className={styles["info__dots"]}></span>
            </div>
            <span className={styles["info__data"]}>
              {formatPrice(data.budget)}
            </span>
          </>
        )}

        {data.revenue === null || (
          <>
            <div className={styles["info__designation"]}>
              <span className={styles["info__name"]}>Выручка</span>
              <span className={styles["info__dots"]}></span>
            </div>
            <span className={styles["info__data"]}>
              {formatPrice(data.revenue)}
            </span>
          </>
        )}

        {data.director === null || (
          <>
            <div className={styles["info__designation"]}>
              <span className={styles["info__name"]}>Режиссёр</span>
              <span className={styles["info__dots"]}></span>
            </div>
            <span className={styles["info__data"]}>
              {data.director}
            </span>
          </>
        )}

        {data.production === null || (
          <>
            {" "}
            <div className={styles["info__designation"]}>
              <span className={styles["info__name"]}>Продакшен</span>
              <span className={styles["info__dots"]}></span>
            </div>
            <span className={styles["info__data"]}>
              {data.production}
            </span>
          </>
        )}

        {data.awardsSummary === null || (
          <>
            <div className={styles["info__designation"]}>
              <span className={styles["info__name"]}>Награды</span>
              <span className={styles["info__dots"]}></span>
            </div>
            <span className={styles["info__data"]}>
              {data.awardsSummary}
            </span>
          </>
        )}
      </div>
    </section>
  );
});
