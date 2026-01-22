import { useQuery } from "@tanstack/react-query";
import styles from "./GenresPage.module.scss";
import { useAppDispatch } from "../../store/hook";
import { getGenres } from "../../api/api";
import { Loader } from "../../components/Loader/Loader";
import { setErrorText, toggleIsError } from "../../store/ErrorSlice";
import { GenreCard } from "../../components/cards/GenreCard/GenreCard";

const GenresPage = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryFn: () => getGenres(),
    queryKey: ["genres"],
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log("Ошибка страницы жанров", error);
    dispatch(setErrorText(error.message));
    dispatch(toggleIsError(true));
  }

  return (
    <section className={styles.genre}>
      <h2 className={styles["genre__title"]}>Жанры фильмов</h2>
      <ul className={styles["genre__list"]}>
        {isSuccess &&
          data.map((genre, i) => (
            <li key={i}>
              <GenreCard genre={genre} index={i} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default GenresPage;
