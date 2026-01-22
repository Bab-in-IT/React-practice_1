import styles from "./Forms.module.scss";
import "../../art/styles/button.scss";
import "../../art/styles/visually-hidden.scss";
import sprite from "../../art/sprite.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../../api/api";
import { useAppDispatch } from "../../store/hook";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { toggleModal } from "../../store/AuthSlice";
import { setErrorText, toggleIsError } from "../../store/ErrorSlice";

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();

  const { mutate } = useMutation({
    mutationFn: (data: LoginForm) => login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      dispatch(toggleModal(false));
      setIsError(false);
    },
    onError: (error) => {
      console.error("Ошибка авторизации", error);
      dispatch(setErrorText(error.message));
      dispatch(toggleIsError(true));
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    mutate(data);
  };

  const getLabelClass = (fieldName: keyof LoginForm) => {
    const className = errors[fieldName]
      ? `${styles["form__label"]} ${styles["form__label--error"]}`
      : `${styles["form__label"]}`;
    return className;
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form__wrapper"]}>
          <label className={getLabelClass("email")} htmlFor="email">
            <svg
              className={styles["form__icon"]}
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href={`${sprite}#icon-email`} />
            </svg>
            <input
              className={styles["form__input"]}
              type="email"
              placeholder="Электронная почта"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Введите корректный email адрес",
                },
              })}
              onChange={() => setIsError(false)}
            />
          </label>
          {errors.email && (
            <p className={styles["form__error"]}>
              {errors.email.message}
            </p>
          )}
          <label
            className={getLabelClass("password")}
            htmlFor="password"
          >
            <svg
              className={styles["form__icon"]}
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href={`${sprite}#icon-password`} />
            </svg>

            <input
              className={styles["form__input"]}
              type="password"
              placeholder="Пароль"
              {...register("password", {
                required: true,
              })}
              onChange={() => setIsError(false)}
            />
          </label>
          {isError && (
            <p className={styles["form__error"]}>Данные не верны.</p>
          )}
        </div>
        <button
          className="btn btn--form-submit"
          type="submit"
          aria-label="Кнопка Войти"
        >
          Войти
        </button>
      </form>
    </>
  );
};
