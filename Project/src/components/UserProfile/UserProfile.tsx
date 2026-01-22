import sprite from "../../art/sprite.svg";
import styles from "./UserProfile.module.scss";
import "../../art/styles/button.scss";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/api";
import { queryClient } from "../../api/queryClient";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hook";

const getAbbreviatedName = (
  name: string,
  surname: string
): string => {
  const abbreviatedName = name[0] + surname[0];
  return abbreviatedName.toUpperCase();
};

export const UserProfile = () => {
  const data = useAppSelector((state) => state.auth.userData);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      navigate("/");
    },
  });

  const handelOnClick = () => {
    mutate();
  };

  if (data) {
    return (
      <section className={styles.profile}>
        <div className={styles["profile__wrapper"]}>
          <div className={styles["profile__info"]}>
            <div className={styles["profile__logo"]}>
              {getAbbreviatedName(data.name, data.surname)}
            </div>
            <div className={styles["profile__content"]}>
              <span
                className={styles["profile__content-discription"]}
              >
                Имя Фамилия
              </span>
              <span className={styles["profile__content-data"]}>
                {data.name} {data.surname}
              </span>
            </div>
          </div>
          <div className={styles["profile__info"]}>
            <div className={styles["profile__logo"]}>
              <svg
                className={styles["profile__logo-icon"]}
                width="24"
                height="24"
                aria-hidden="true"
                focusable="false"
              >
                <use href={`${sprite}#icon-email`} />
              </svg>
            </div>
            <div className={styles["profile__content"]}>
              <span
                className={styles["profile__content-discription"]}
              >
                Электронная почта
              </span>
              <span className={styles["profile__content-data"]}>
                {data.email}
              </span>
            </div>
          </div>
        </div>
        <button
          className="btn btn--logout"
          type="button"
          onClick={handelOnClick}
        >
          Выйти из аккаунта
        </button>
      </section>
    );
  }
};
