import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

import { lazy, memo, Suspense, useCallback, useState } from "react";
import { Loader } from "../components/Loader/Loader";

const Authorization = lazy(() => import("../Pages/Authtorization/Authorization"));
const ErrorModule = lazy(() => import("../components/ErrorModule/ErrorModule"));
const SearchingModal = lazy(() => import("../components/SearchingModal/SearchingModal"));

export const Layout = memo(() => {
  const [isSearching, setIsSearching] = useState(false);
  const isModal = useAppSelector((state) => state.auth.isModal);
  const isError = useAppSelector((state) => state.error.isError);

  const openSearching = useCallback(() => {
    setIsSearching(true);
  }, []);

  const closeSearching = useCallback(() => {
    setIsSearching(false);
  }, []);

  return (
    <>
      <Header openSearching={openSearching} />

      <main className="container">
        <Outlet />
      </main>
      <Footer />

      <Suspense fallback={<Loader />}>
        {isModal && <Authorization />}
        {isError && <ErrorModule />}
        {isSearching && <SearchingModal closeSearching={closeSearching} />}
      </Suspense>
    </>
  );
});
