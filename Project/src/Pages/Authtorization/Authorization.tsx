import sprite from "../../art/sprite.svg";
import styles from "./Authorization.module.scss";
import "../../art/styles/button.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { toggleModal } from "../../store/AuthSlice";
import { Registration } from "../../components/authForms/Registration";
import { Login } from "../../components/authForms/Login";

type AuthType = "login" | "registration";

const Authorization = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [authType, setAuthType] = useState<AuthType>("login");

  const isModal = useAppSelector((state) => state.auth.isModal);
  const dispatch = useAppDispatch();

  const setForm = (): void => {
    if (authType == "login") {
      setAuthType("registration");
    } else {
      setAuthType("login");
    }
  };

  return (
    <dialog className={styles.modal} open={isModal}>
      <div className={styles["modal__wrapper"]}>
        <Link
          className={styles["modal__logo"]}
          to={"/"}
          onClick={() => dispatch(toggleModal(false))}
        >
          <svg
            width="132"
            height="30"
            aria-hidden="true"
            focusable="false"
          >
            <use href={`${sprite}#icon-logo`} />
          </svg>
        </Link>
        {isSuccess && (
          <>
            <h2 className={styles["modal__title"]}>
              Регистрация завершена
            </h2>
            <p className={styles["modal__text"]}>
              Используйте вашу электронную почту для входа
            </p>
            <button
              className="btn btn--form-submit"
              type="button"
              aria-label="Кнопка Войти"
              onClick={() => {
                setIsSuccess(false);
                setAuthType("login");
              }}
            >
              Войти
            </button>
          </>
        )}

        {!isSuccess && (
          <>
            {authType == "login" ? (
              <h2 className="visually-hidden">Окно авторизации</h2>
            ) : (
              <h2 className={styles["modal__title"]}>Регистрация</h2>
            )}
            {authType == "login" ? (
              <Login />
            ) : (
              <Registration onSuccess={() => setIsSuccess(true)} />
            )}
          </>
        )}

        {!isSuccess && (
          <button
            className="btn btn--form-change"
            type="button"
            onClick={() => setForm()}
            aria-label={
              authType == "login"
                ? "Кнопка: Зарегистрироваться"
                : "Кнопка: У меня есть пароль"
            }
          >
            {authType == "login"
              ? " Регистрация"
              : "У меня есть пароль"}
          </button>
        )}
        <button
          className="btn btn--form-close"
          type="button"
          onClick={() => dispatch(toggleModal(false))}
          aria-label="Кнопка Закрыть"
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
      </div>
    </dialog>
  );
};

export default Authorization;
