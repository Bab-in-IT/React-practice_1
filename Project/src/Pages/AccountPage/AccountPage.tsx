import sprite from "../../art/sprite.svg";
import styles from "./AccountPage.module.scss";
import { UserProfile } from "../../components/UserProfile/UserProfile";
import { useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch } from "../../store/hook";
import { setErrorText, toggleIsError } from "../../store/ErrorSlice";
import { MoviesList } from "../../components/MovieList/MovieList";
import { getFavorites } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { MovieList } from "../../api/apiTypes";
import stylesMovieList from "../../components/MovieList/MovieList.module.scss";

type ActiveSectionType = "favorites" | "user";

const AccountPage = () => {
  const dispatch = useAppDispatch();

  const [activeSection, setActiveSection] =
    useState<ActiveSectionType>("favorites");

  const { data, isLoading, isError, error, isSuccess } =
    useQuery<MovieList>({
      queryFn: () => getFavorites(),
      queryKey: ["movie", "favorites"],
    });

  const hendelFavoritesClick = () => {
    setActiveSection("favorites");
  };
  const hendelUserClick = () => {
    setActiveSection("user");
  };

  const BtnClassName = styles["account__button"];
  const BtnClassNameActive = `${BtnClassName} ${styles["account__button--active"]}`;

  if (isError) {
    console.log("Ошибка добавления в избранное", error);
    dispatch(setErrorText(error.message));
    dispatch(toggleIsError(true));
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className={styles.account}>
        <h2 className={styles["account__title"]}>Мой аккаунт</h2>
        <div className={styles["account__panel"]}>
          <button
            className={`${
              activeSection == "favorites"
                ? BtnClassNameActive
                : BtnClassName
            }`}
            type="button"
            onClick={hendelFavoritesClick}
            aria-label="Показить Избранные фильмы"
          >
            <svg
              width="24"
              height="24"
              aria-hidden="true"
              focusable="false"
            >
              <use href={`${sprite}#icon-heart`} />
            </svg>
            <span className={styles["account__button-text"]}>
              Избранные фильмы
            </span>
            <span className={styles["account__button-text--tablet"]}>
              Избранное
            </span>
          </button>
          <button
            className={`${
              activeSection == "user"
                ? BtnClassNameActive
                : BtnClassName
            }`}
            type="button"
            onClick={hendelUserClick}
            aria-label="Показить Настройка аккаунта"
          >
            <svg
              width="24"
              height="24"
              aria-hidden="true"
              focusable="false"
            >
              <use href={`${sprite}#icon-user`} />
            </svg>

            <span className={styles["account__button-text"]}>
              Настройка аккаунта
            </span>
            <span className={styles["account__button-text--tablet"]}>
              Настройки
            </span>
          </button>
        </div>
      </section>
      <section className={styles["account__favorites"]}>
        {activeSection == "favorites" ? (
          isSuccess && (
            <MoviesList
              data={data}
              listClass={stylesMovieList["list--account-page"]}
              itemClass={stylesMovieList["list__item--favorites"]}
            />
          )
        ) : (
          <UserProfile />
        )}
      </section>
    </>
  );
};

export default AccountPage;
