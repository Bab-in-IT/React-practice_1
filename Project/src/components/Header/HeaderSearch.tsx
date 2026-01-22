import { useEffect, useRef, useState } from "react";
import sprite from "../../art/sprite.svg";
import styles from "./HeaderSearch.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../store/hook";
import { getSearchMovie } from "../../api/api";
import { setErrorText, toggleIsError } from "../../store/ErrorSlice";
import { SearchMovieCard } from "../cards/SearchMovieCard/SearchMovieCard";

export const HeaderSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);

  const dispatch = useAppDispatch();

  const { data, isSuccess, error, isError } = useQuery({
    queryFn: () => getSearchMovie(inputValue),
    queryKey: ["movie", "search", inputValue],
    enabled: inputValue.length > 0,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value !== "") {
      setIsOpen(true);
    } else if (e.target.value == "") {
      setIsOpen(false);
    }
  };

  const filtredList =
    isSuccess && data
      ? data
          .filter((film) =>
            film.title
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          )
          .slice(0, 5)
      : [];

  // Клик мышью за пределами поискового списка
  useEffect(() => {
    const handleOnClickOutside = (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOnClickOutside);
    return () => {
      document.addEventListener("mousedown", handleOnClickOutside);
    };
  }, [isOpen]);

  if (isError) {
    console.log("Ошибка поиска фильма", error);
    dispatch(setErrorText(error.message));
    dispatch(toggleIsError(true));
  }

  return (
    <div className={styles.search}>
      <label className={styles["search__lable"]}>
        <svg
          width="24"
          height="24"
          aria-hidden="true"
          focusable="false"
        >
          <use href={`${sprite}#icon-loupe`} />
        </svg>

        <input
          className={styles["search__input"]}
          type="search"
          id="search"
          name="search"
          placeholder="Поиск"
          value={inputValue}
          onChange={handleOnChange}
          autoComplete="off"
        />

        {isOpen && filtredList.length > 0 && (
          <ul className={styles["search__list"]} ref={listRef}>
            {filtredList.map((film) => (
              <li className={styles["search__item"]} key={film.id}>
                <SearchMovieCard
                  data={film}
                  closeSearching={() => setIsOpen(false)}
                  cleanInput={() => setInputValue("")}
                />
              </li>
            ))}
          </ul>
        )}
      </label>
    </div>
  );
};
