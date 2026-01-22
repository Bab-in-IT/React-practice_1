import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { Hero } from "../../components/Hero/Hero";
import { MovieInfo } from "../../components/MovieInfo/MovieInfo";
import { setErrorText, toggleIsError } from "../../store/ErrorSlice";
import { useAppDispatch } from "../../store/hook";
import { getMovie } from "../../api/api";
import stylesHeroPanel from "../../components/Hero/Hero.module.scss";

const MoviePage = () => {
  const dispatch = useAppDispatch();

  const { userId } = useParams();

  const { data, isLoading, isError, isSuccess, refetch, error } =
    useQuery({
      queryFn: () => getMovie(userId!),
      queryKey: ["movie", "one", userId],
      enabled: !!userId,
    });

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    return (
      <>
        <Hero
          data={data}
          refetch={refetch}
          panelClass={stylesHeroPanel["hero__panel--movie-page"]}
          classTrailerBtn="btn__trailer--move-page"
          classFavouriteBtn="btn__favourite--move-page"
        />
        <MovieInfo data={data} />
      </>
    );
  }
  if (isError) {
    console.log("Ошибка конкретного фильма", error);
    dispatch(setErrorText(error.message));
    dispatch(toggleIsError(true));
  }
};

export default MoviePage;
