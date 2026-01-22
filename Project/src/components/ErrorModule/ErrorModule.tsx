import styles from "./ErrorModule.module.scss";
import sprite from "../../art/sprite.svg";
import "../../art/styles/button.scss";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  resetErrorText,
  toggleIsError,
} from "../../store/ErrorSlice";

const ErrorModule = () => {
  const errorMessage = useAppSelector(
    (state) => state.error.errorText
  );
  const dispatch = useAppDispatch();

  const handelOnClick = () => {
    dispatch(resetErrorText());
    dispatch(toggleIsError(false));
  };

  if (errorMessage) {
    return (
      <div className={styles.error}>
        <p className={styles["error__text"]}>Упс... Что-то пошло не так! :(</p>
        {/* <p className={styles["error__text"]}>{errorMessage}</p> */}
        <button
          className="btn btn--form-close"
          type="button"
          onClick={handelOnClick}
          aria-label="Кнопка Закрыть"
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
      </div>
    );
  }
};

export default ErrorModule;
