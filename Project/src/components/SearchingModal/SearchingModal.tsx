import { useState } from "react";
import sprite from "../../art/sprite.svg";
import styles from "./SearchingModal.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../store/hook";
import { getSearchMovie } from "../../api/api";
import { setErrorText, toggleIsError } from "../../store/ErrorSlice";
import { SearchMovieCard } from "../cards/SearchMovieCard/SearchMovieCard";

interface SearchingModalProp {
  closeSearching: () => void;
}

const SearchingModal = ({ closeSearching }: SearchingModalProp) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const handleOnClear = () => {
    setInputValue("");
    setIsOpen(false);
    closeSearching();
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

        <button
          className={styles["search__btn--clear"]}
          type="button"
          aria-label="Очистить поле поиска"
          onClick={handleOnClear}
        >
          <svg
            width="24"
            height="24"
            aria-hidden="true"
            focusable="false"
          >
            <use href={`${sprite}#icon-small_close`} />
          </svg>
        </button>

        {isOpen && filtredList.length > 0 && (
          <ul className={styles["search__list"]}>
            {filtredList.map((film) => (
              <li className={styles["search__item"]} key={film.id}>
                <SearchMovieCard
                  data={film}
                  closeSearching={closeSearching}
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

export default SearchingModal;
