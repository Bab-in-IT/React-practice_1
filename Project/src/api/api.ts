import {
  Movie,
  movieList,
  MovieList,
  MovieSchema,
  genresSchema,
  GenresSchema,
  RegistrationType,
  User,
  UserSchema,
} from "./apiTypes";
import { validateResponse } from "./validateResponse";

export const API_URL = "https://cinemaguide.skillbox.cc";

// Случайный фильм
export const getRandomMovie = (): Promise<Movie> =>
  fetch(`${API_URL}/movie/random`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => MovieSchema.parse(data));

// Топ 10 фильмов
export const getTopTen = (): Promise<MovieList> =>
  fetch(`${API_URL}/movie/top10`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => movieList.parse(data));

// Запрос на список фильмов
export const getMovies = (): Promise<MovieList> =>
  fetch(`${API_URL}/movie`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => movieList.parse(data));

// Запрос на список жанров
export const getGenres = (): Promise<GenresSchema> =>
  fetch(`${API_URL}/movie/genres`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => genresSchema.parse(data));

// Запрос фильма по id
export const getMovie = (movieId: string): Promise<Movie> =>
  fetch(`${API_URL}/movie/${movieId}`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => MovieSchema.parse(data));

// Запрос фильма по названию
export const getSearchMovie = (title: string): Promise<MovieList> =>
  fetch(`${API_URL}/movie?${title}`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => movieList.parse(data));

// Запрос списка фильмов по жанру с учетом других страниц
export const getMoviesByProp = (
  genre: string,
  page: number,
  count: number
): Promise<MovieList> =>
  fetch(`${API_URL}/movie?genre=${genre}&page=${page}&count=${count}`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => movieList.parse(data));

// Авторизация пользователя
export const login = (form: {
  email: string;
  password: string;
}): Promise<void> => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then(validateResponse)
    .then(() => undefined);
};

// Регистрация пользователя
export const registration = (
  form: RegistrationType
): Promise<void> => {
  return fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then(validateResponse)
    .then(() => undefined);
};

// Получение данных пользователя
export const fetchMe = (): Promise<User> =>
  fetch(`${API_URL}/profile`, { credentials: "include" })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));

// Выход из профиля пользователя
interface LogoutResponse {
  result: boolean;
}
export const logout = (): Promise<LogoutResponse> =>
  fetch(`${API_URL}/auth/logout`, { credentials: "include" })
    .then(validateResponse)
    .then((response) => response.json());

// Удалени фильма из избранное
interface FavoriteResponse {
  result: boolean;
}
export const removeFavorite = (
  id: number
): Promise<FavoriteResponse> =>
  fetch(`${API_URL}/favorites/${id}`, {
    credentials: "include",
    method: "DELETE",
  })
    .then(validateResponse)
    .then((response) => response.json());

// Добавление фильма в избранное
export const addFavorite = (id: string): Promise<FavoriteResponse> =>
  fetch(`${API_URL}/favorites`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then(validateResponse)
    .then((response) => response.json());

// Получение избранных фильмов
export const getFavorites = () =>
  fetch(`${API_URL}/favorites`, {
    credentials: "include",
    method: "GET",
  })
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => movieList.parse(data));
