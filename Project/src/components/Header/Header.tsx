import { Link, useMatch, useNavigate } from "react-router-dom";
import { HeaderSearch } from "./HeaderSearch";
import styles from "./header.module.scss";
import "../../art/styles/button.scss";
import sprite from "../../art/sprite.svg";
import { useAppDispatch } from "../../store/hook";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/api";
import { clearUserData, setUserData, toggleAuth, toggleModal } from "../../store/AuthSlice";
import { memo } from "react";

interface HeaderProp {
  openSearching: () => void;
}

export const Header = memo(({ openSearching }: HeaderProp) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const matchHome = useMatch("/");
  const matchGenre = useMatch("/movie/genres");

  const { data, isSuccess } = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 1,
    enabled: false,
  });

  if (isSuccess) {
    dispatch(toggleAuth(true));
    dispatch(setUserData(data));
  }
  if (!isSuccess) {
    dispatch(toggleAuth(false));
    clearUserData();
  }

  const handleOnClick = () => {
    if (isSuccess) {
      navigate("/favorites", { state: data });
    } else {
      dispatch(toggleModal(true));
    }
  };

  const toggleLinkHomePageClassName = () => {
    let className = `${styles["header__link-home"]}`;
    if (matchHome) {
      className = `${className} ${styles["header__link-home--active"]}`;
    }
    return className;
  };
  const toggleLinkGenrePageClassName = () => {
    let className = `${styles["header__link-genre"]}`;
    if (matchGenre) {
      className = `${className} ${styles["header__link-genre--active"]}`;
    }
    return className;
  };

  const toggleBtnLoginClassName = () => {
    let btnLoginClassName = "btn btn--login";
    if (location.pathname == "/favorites") {
      btnLoginClassName = "btn btn--login btn--login--active";
    }
    return btnLoginClassName;
  };

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles["header__wrapper"]}>
            <Link
              className={styles["header__logo"]}
              to={"/"}
              aria-label="Ссылка на главную страницу"
            >
              <svg
                className={styles["header__logo-icon"]}
                width="143"
                height="32"
                aria-hidden="true"
                focusable="false"
              >
                <use href={`${sprite}#icon-logo`} />
              </svg>
            </Link>

            <div className={styles["header__nav"]}>
              <Link
                className={toggleLinkHomePageClassName()}
                to={"/"}
                aria-label="Ссылка на главную страницу"
              >
                <span className={styles["header__text"]}>Главная</span>
              </Link>
              <Link
                className={toggleLinkGenrePageClassName()}
                to={"/movie/genres"}
                aria-label="Ссылка на главную страницу жанров"
              >
                <span className={styles["header__text"]}>Жанры</span>

                <svg
                  className={styles["header__icon"]}
                  width="24"
                  height="24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href={`${sprite}#icon-genre`} />
                </svg>
              </Link>
              <button
                className="btn btn--search"
                type="button"
                aria-label="Открыть поиск"
                onClick={openSearching}
              >
                <svg width="24" height="24" aria-hidden="true" focusable="false">
                  <use href={`${sprite}#icon-loupe`} />
                </svg>
              </button>

              <HeaderSearch />
              <button
                className={toggleBtnLoginClassName()}
                type="button"
                onClick={handleOnClick}
                aria-label={data ? data.surname : "Авторизация"}
              >
                {isSuccess ? (
                  <span className="btn--login__text">{data.surname} </span>
                ) : (
                  <span className="btn--login__text">Войти</span>
                )}

                <svg
                  className={styles["header__icon"]}
                  width="24"
                  height="24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href={`${sprite}#icon-user`} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});
