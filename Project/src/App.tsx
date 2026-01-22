import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import sprite from "./art/sprite.svg";
import { store } from "./store/store";
import { queryClient } from "./api/queryClient";
import { Layout } from "./Layout/Layout";
import { lazy, Suspense } from "react";
import { Loader } from "./components/Loader/Loader";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage"));
const GenresPage = lazy(
  () => import("./Pages/GenresPage/GenresPage")
);
const MoviesByGenrePage = lazy(
  () => import("./Pages/MoviesByGenrePage/MoviesByGenrePage")
);
const MoviePage = lazy(() => import("./Pages/MoviePage/MoviePage"));
const AccountPage = lazy(
  () => import("./Pages/AccountPage/AccountPage")
);

function App() {
  return (
    <>
      <div style={{ display: "none" }}>
        <img src={sprite} alt="" />
      </div>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route
                    path="movie/genres"
                    element={<GenresPage />}
                  />
                  <Route
                    path="movie"
                    element={<MoviesByGenrePage />}
                  />
                  <Route
                    path="movie/:userId"
                    element={<MoviePage />}
                  />
                  <Route path="favorites" element={<AccountPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
