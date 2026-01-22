import "../../art/styles/button.scss";
import sprite from "../../art/sprite.svg";
import { Movie } from "../../api/apiTypes";
import { useNavigate } from "react-router-dom";
import { memo, useCallback, useEffect, useState } from "react";
import { TrailerModal } from "../TrailerModal/TrailerModal";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { toggleFavorite, toggleModal } from "../../store/AuthSlice";
import { useDeleteFavorite } from "../../hooks/useDeleteFavorite";
import { useAddFavorite } from "../../hooks/useAddFavorite";

type ButtonsProps = {
  data: Movie;
  refetch: () => void;
  classTrailerBtn?: string;
  classFavouriteBtn?: string;
};

export const HeroButtons = memo(
  ({
    data,
    refetch,
    classTrailerBtn,
    classFavouriteBtn,
  }: ButtonsProps) => {
    const [isTrailer, setIsTrailer] = useState(false);

    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const isFavorite = useAppSelector(
      (state) => state.auth.isFavorite
    );
    const userData = useAppSelector((state) => state.auth.userData);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { addToFavorite } = useAddFavorite(data.id);
    const { deleteFavorite } = useDeleteFavorite(data.id);

    useEffect(() => {
      if (
        isAuth &&
        userData &&
        userData.favorites.includes(data.id.toString())
      ) {
        dispatch(toggleFavorite(true));
      }
    }, [isAuth, data.id, dispatch, userData]);

    // Кнопка нажития на избранные
    const setFavouriteOnClick = useCallback(() => {
      if (!isAuth) {
        dispatch(toggleModal(true));
        return;
      }
      const inFavorite = userData?.favorites.includes(
        data.id.toString()
      );
      if (!inFavorite) {
        addToFavorite();
      } else {
        deleteFavorite();
      }
    }, [
      isAuth,
      userData,
      data.id,
      dispatch,
      addToFavorite,
      deleteFavorite,
    ]);

    // Кнопка нажития на о фильме
    const handelAboutMovie = () => {
      navigate(`/movie/${data.id}`, {
        state: data.id,
      });
    };

    // Кнопка нажития на трейлер
    const handelTrailerOn = useCallback(() => {
      setIsTrailer(true);
    }, []);

    return (
      <>
        <button
          className={`btn btn--trailer ${classTrailerBtn || ""}`}
          type="button"
          aria-label="Трейлер"
          onClick={handelTrailerOn}
        >
          Трейлер
        </button>

        {location.pathname == "/" && (
          <button
            className="btn btn--about"
            type="button"
            aria-label="Переход на страницу фильма"
            onClick={handelAboutMovie}
          >
            О фильме
          </button>
        )}

        <button
          className={
            isFavorite && isAuth
              ? `btn btn--favourite btn--favourite--active ${
                  classFavouriteBtn || ""
                }`
              : `btn btn--favourite ${classFavouriteBtn || ""}`
          }
          type="button"
          onClick={setFavouriteOnClick}
          aria-label="Добавление или удаление фильма из избранного"
        >
          <svg width="24" height="24" aria-hidden="true">
            <use
              href={`${sprite}${
                isFavorite && isAuth
                  ? `#icon-heart_active`
                  : `#icon-heart`
              }`}
            />
          </svg>
        </button>

        {location.pathname == "/" && (
          <button
            className="btn btn--reload"
            type="button"
            aria-label="Новый случайный фильм"
            onClick={refetch}
          >
            <svg width="24" height="24" aria-hidden="true">
              <use href={`${sprite}#icon-arrows`} />
            </svg>
          </button>
        )}

        {isTrailer && (
          <TrailerModal
            trailerURL={data.trailerUrl}
            closeModal={() => setIsTrailer(false)}
            isTrailer={isTrailer}
          />
        )}
      </>
    );
  }
);
