import sprite from "./art/sprite.svg";
import { Loader } from "./components/Loader/Loader";
import { Layout } from "./Layout/Layout";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useFetchMe } from "./hooks/useFetchMe";
import { useAppDispatch } from "./store/hook";
import { clearUserData, setUserData, toggleAuth } from "./store/AuthSlice";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage"));
const GenresPage = lazy(() => import("./Pages/GenresPage/GenresPage"));
const MoviesByGenrePage = lazy(() => import("./Pages/MoviesByGenrePage/MoviesByGenrePage"));
const MoviePage = lazy(() => import("./Pages/MoviePage/MoviePage"));
const AccountPage = lazy(() => import("./Pages/AccountPage/AccountPage"));

function App() {
  const dispatch = useAppDispatch();

  const { data, isSuccess } = useFetchMe();

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleAuth(true));
      dispatch(setUserData(data));
    }
    if (!isSuccess) {
      dispatch(toggleAuth(false));
      clearUserData();
    }
  }, [data, dispatch, isSuccess]);

  return (
    <>
      <div style={{ display: "none" }}>
        <img src={sprite} alt="" />
      </div>

      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="movie/genres" element={<GenresPage />} />
              <Route path="movie" element={<MoviesByGenrePage />} />
              <Route path="movie/:userId" element={<MoviePage />} />
              <Route path="favorites" element={<AccountPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
