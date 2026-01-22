import styles from "./Forms.module.scss";
import "../../art/styles/button.scss";
import sprite from "../../art/sprite.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { registration } from "../../api/api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { RegistrationType } from "../../api/apiTypes";
import { setErrorText, toggleIsError } from "../../store/ErrorSlice";
import { useAppDispatch } from "../../store/hook";

interface RegistrationProps {
  onSuccess: () => void;
}

interface LoginForm {
  emailReg: string;
  name: string;
  surname: string;
  passwordReg: string;
  nextPassword: string;
}

export const Registration = ({ onSuccess }: RegistrationProps) => {
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<LoginForm>();

  const { mutate } = useMutation({
    mutationFn: (data: RegistrationType) => registration(data),
    onSuccess: () => {
      onSuccess();
      setIsError(false);
    },
    onError: (error) => {
      console.error("Ошибка регистрации", error);
      dispatch(setErrorText(error.message));
      dispatch(toggleIsError(true));
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    const form = {
      email: data.emailReg,
      name: data.name,
      surname: data.surname,
      password: data.passwordReg,
    };

    mutate(form);
  };

  const getLabelClass = (fieldName: keyof LoginForm) => {
    const className = errors[fieldName]
      ? `${styles["form__label"]} ${styles["form__label--error"]}`
      : `${styles["form__label"]}`;
    return className;
  };

  return (
    <form
      className={styles.form}
      action="#"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles["form__wrapper"]}>
        <label
          className={getLabelClass("emailReg")}
          htmlFor="emailReg"
        >
          <svg
            className={styles["form__label-icon"]}
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
            {...register("emailReg", {
              required: "Полеобязательно для заполнения",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Введите корректный email адрес",
              },
            })}
            onChange={() => setIsError(false)}
          />
        </label>
        {errors.emailReg && (
          <p className={styles["form__error"]}>
            {errors.emailReg.message}
          </p>
        )}
        <label className={getLabelClass("name")} htmlFor="name">
          <svg
            className={styles["form__label-icon"]}
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use href={`${sprite}#icon-user`} />
          </svg>

          <input
            className={styles["form__input"]}
            type="text"
            placeholder="Имя"
            {...register("name", {
              required: "Полеобязательно для заполнения",
            })}
            onChange={() => setIsError(false)}
          />
        </label>
        {errors.name && (
          <p className={styles["form__error"]}>
            {errors.name.message}
          </p>
        )}
        <label className={getLabelClass("surname")} htmlFor="surname">
          <svg
            className={styles["form__label-icon"]}
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use href={`${sprite}#icon-user`} />
          </svg>
          <input
            className={styles["form__input"]}
            type="text"
            placeholder="Фамилия"
            {...register("surname", {
              required: "Полеобязательно для заполнения",
            })}
            onChange={() => setIsError(false)}
          />
        </label>
        {errors.surname && (
          <p className={styles["form__error"]}>
            {errors.surname.message}
          </p>
        )}
        <label
          className={getLabelClass("passwordReg")}
          htmlFor="passwordReg"
        >
          <svg
            className={styles["form__label-icon"]}
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
            {...register("passwordReg", {
              required: "Полеобязательно для заполнения",
              minLength: {
                value: 6,
                message: "Минимальная длина пароля 6 символов",
              },
            })}
            onChange={() => setIsError(false)}
          />
        </label>
        {errors.passwordReg && (
          <p className={styles["form__error"]}>
            {errors.passwordReg.message}
          </p>
        )}
        <label
          className={getLabelClass("nextPassword")}
          htmlFor="nextPassword"
        >
          <svg
            className={styles["form__label-icon"]}
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use href={`${sprite}#icon-password`} />
          </svg>

          <input
            className={styles["form__input"]}
            type="password"
            placeholder="Подтвердите пароль"
            {...register("nextPassword", {
              required: "Полеобязательно для заполнения",
              minLength: {
                value: 6,
                message: "Минимальная длина пароля 6 символов",
              },
              validate: (value) => {
                const passwordValue = getValues("passwordReg");
                return (
                  value === passwordValue || "Пароли не совпадают"
                );
              },
            })}
            onChange={() => setIsError(false)}
          />
        </label>
        {errors.nextPassword && (
          <p className={styles["form__error"]}>
            {errors.nextPassword.message}
          </p>
        )}
        {isError && (
          <p className={styles["form__error"]}>
            Пользователь&nbsp;уже&nbsp;существует!
          </p>
        )}
      </div>
      <button
        className="btn btn--form-submit"
        type="submit"
        aria-label="Кнопка Войти"
      >
        Создать аккаунт
      </button>
    </form>
  );
};
