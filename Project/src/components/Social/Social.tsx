import sprite from "../../art/sprite.svg";
import styles from "./Social.module.scss";
import { Link } from "react-router-dom";

export const Social = () => {
  return (
    <div className={styles.social}>
      <Link
        className={styles["social__link"]}
        to="https://vk.com/"
        aria-label="Ссылка на Вконтакте"
      >
        <svg
          className={styles["social__link-icon"]}
          width="36"
          height="36"
          aria-hidden="true"
          focusable="false"
        >
          <use href={`${sprite}#icon-vk`} />
        </svg>
      </Link>
      <Link
        className={styles["social__link"]}
        to="https://www.youtube.com/"
        aria-label="Ссылка на Ютьюб"
      >
        <svg
          className={styles["social__link-icon"]}
          width="36"
          height="36"
          aria-hidden="true"
          focusable="false"
        >
          <use href={`${sprite}#icon-youtube`} />
        </svg>
      </Link>
      <Link
        className={styles["social__link"]}
        to="https://ok.ru/"
        aria-label="Ссылка на Однокласники"
      >
        <svg
          className={styles["social__link-icon"]}
          width="36"
          height="36"
          aria-hidden="true"
          focusable="false"
        >
          <use href={`${sprite}#icon-ok`} />
        </svg>
      </Link>
      <Link
        className={styles["social__link"]}
        to="https://t.me/telegram"
        aria-label="Ссылка на Телеграм"
      >
        <svg
          className={styles["social__link-icon"]}
          width="36"
          height="36"
          aria-hidden="true"
          focusable="false"
        >
          <use href={`${sprite}#icon-telegram`} />
        </svg>
      </Link>
    </div>
  );
};
