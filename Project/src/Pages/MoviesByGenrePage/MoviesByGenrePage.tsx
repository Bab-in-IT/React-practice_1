import styles from "./MoviesByGenrePage.module.scss";
import "../../art/styles/button.scss";
import sprite from "../../art/sprite.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../store/hook";
import { MovieList } from "../../api/apiTypes";
import { getMoviesByProp } from "../../api/api";
import { setErrorText, toggleIsError } from "../../store/ErrorSlice";
import { Loader } from "../../components/Loader/Loader";
import { MoviesList } from "../../components/MovieList/MovieList";
import stylesMovieList from "../../components/MovieList/MovieList.module.scss";
import stylesMovieCard from "../../components/cards/MovieCard/MovieCard.module.scss";

const MoviesByGenrePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const title = location.state[0];
  const genre = location.state[1];
  const goBack = () => navigate(-1);

  const [displayCount, setDisplayCount] = useState(10);
  const COUNT = 50;

  const {
    data,
    isLoading,
    isError,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<MovieList>({
    queryFn: ({ pageParam }) =>
      getMoviesByProp(genre, pageParam as number, COUNT),

    queryKey: ["movies", "genre", genre],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < COUNT) {
        return undefined;
      }
      return allPages.length;
    },

    staleTime: Infinity,
  });

  //  ДАННЫЕ В ЕДИНЫЙ СПИСОК
  const allMovies = useMemo(() => {
    return data?.pages.flatMap((page) => page) ?? [];
  }, [data]);

  // Обработчик кнопки «Показать ещё»
  const loadMore = () => {
    setDisplayCount((prev) => prev + 10);

    // Если новое отображаемое количество ДОСТИГЛО или ПРЕВЫСИЛО
    // уже загруженное количество И есть еще страницы на сервере — запрашиваем следующую
    if (
      displayCount + 10 >= allMovies.length &&
      hasNextPage &&
      !isFetching
    ) {
      fetchNextPage(); // Вызываем встроенную функцию загрузки следующей страницы
    }
  };

  // Сортируем первые 10 фильмом по рейтингу, потом не сортируем

  const sortedMovies = useMemo((): MovieList => {
    if (allMovies.length === 0) return [];

    const limit = Math.min(allMovies.length, 10);
    return [...allMovies]
      .slice(0, limit)
      .sort((a, b) => b.tmdbRating - a.tmdbRating)
      .slice(0, 10);
  }, [allMovies]);

  const unsortedMovies = useMemo((): MovieList => {
    if (displayCount > 10) {
      const removeArr = new Set(sortedMovies.map((film) => film.id));
      return [...allMovies]
        .filter((movie) => !removeArr.has(movie.id))
        .slice(0, displayCount - 10);
    }
    return [];
  }, [allMovies, displayCount, sortedMovies]);

  if (isLoading) return <Loader />;

  if (isError) {
    console.log("Ошибка добавления в избранное", error);
    dispatch(setErrorText(error.message));
    dispatch(toggleIsError(true));
  }

  return (
    <section className={styles.movies}>
      <div className={styles["movies__upper"]}>
        <button
          className="btn btn--back"
          type="button"
          onClick={goBack}
          aria-label="Кнопка вернуться назад"
        >
          <svg
            className={styles["movies__icon"]}
            width="40"
            height="40"
            aria-hidden="true"
            focusable="false"
          >
            <use href={`${sprite}#icon-back`} />
          </svg>
        </button>
        <h3 className={styles["movies__title"]}>{title}</h3>
      </div>

      <MoviesList
        data={sortedMovies}
        listClass={stylesMovieList["list--genre-page"]}
        movieCardClass={stylesMovieCard["movie--genre-page"]}
      />
      <MoviesList
        data={unsortedMovies}
        listClass={stylesMovieList["list--genre-page"]}
        movieCardClass={stylesMovieCard["movie--genre-page"]}
      />

      {displayCount < allMovies.length && (
        <button
          className="btn btn--more"
          type="button"
          aria-label="Кнопка добавить еще фильмов"
          onClick={loadMore}
          disabled={isFetching}
        >
          Показать ещё
        </button>
      )}
    </section>
  );
};

export default MoviesByGenrePage;
