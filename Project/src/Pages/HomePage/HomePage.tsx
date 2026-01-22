import { getRandomMovie, getTopTen } from "../../api/api";
import { Movie, MovieList } from "../../api/apiTypes";
import { Hero } from "../../components/Hero/Hero";
import { Loader } from "../../components/Loader/Loader";
import { MoviesList } from "../../components/MovieList/MovieList";
import { setErrorText, toggleIsError } from "../../store/ErrorSlice";
import { useAppDispatch } from "../../store/hook";
import styles from "./HomePage.module.scss";
import stylesMoviList from "../../components/MovieList/MovieList.module.scss";
import { useQuery } from "@tanstack/react-query";
import "../../art/styles/visually-hidden.scss";

const HomePage: React. FC = () => {
  const dispatch = useAppDispatch();

  const {
    data: randomMovieData,
    isLoading: isRandomLoading,
    isError: isRandomError,
    error: randomError,
    refetch,
  } = useQuery<Movie>({
    queryFn: () => getRandomMovie(),
    queryKey: ["movie", "random"],
    staleTime: 180000,
  });

  const {
    data: topTenData,
    isLoading: isTopTenLoading,
    isError: isTopTenError,
    error: topTenError,
  } = useQuery<MovieList>({
    queryFn: () => getTopTen(),
    queryKey: ["movies", "top"],
    staleTime: 180000,
  });

  if (isTopTenLoading || isRandomLoading) {
    return <Loader />;
  }

  if (isRandomError) {
    console.log("Ошибка вызова случайного фильма", randomError);
    dispatch(setErrorText(randomError.message));
    dispatch(toggleIsError(true));
  }

  if (isTopTenError) {
    console.log("Ошибка вызова 10 лучших фильма", topTenError);
    dispatch(setErrorText(topTenError.message));
    dispatch(toggleIsError(true));
  }

  return (
    <>
      <h1 className="visually-hidden">Видео-платформа ВK Маруся</h1>
      {randomMovieData && (
        <Hero data={randomMovieData} refetch={refetch} />
      )}

      {topTenData && (
        <section className={styles.topten}>
          <h3 className={styles["topten__title"]}>Топ 10 фильмов</h3>
          <MoviesList
            data={topTenData}
            listClass={stylesMoviList["list--home-page"]}
          />
        </section>
      )}
    </>
  );
};

export default HomePage;
