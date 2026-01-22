import { useMutation } from "@tanstack/react-query";
import { removeFavorite } from "../api/api";
import { useAppDispatch } from "../store/hook";
import { setErrorText, toggleIsError } from "../store/ErrorSlice";
import { queryClient } from "../api/queryClient";
import { toggleFavorite } from "../store/AuthSlice";

export const useDeleteFavorite = (id: number) => {
  const dispatch = useAppDispatch();

  const { mutate: deleteFavorite } = useMutation({
    mutationFn: () => removeFavorite(id),
    onSuccess: () => {
      if (location.pathname === "/favorites") {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
        queryClient.invalidateQueries({
          queryKey: ["movie", "favorites"],
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
        dispatch(toggleFavorite(false));
      }
    },
    onError: (error) => {
      console.error("Ошибка удаления из избраннова", error);
      dispatch(setErrorText(error.message));
      dispatch(toggleIsError(true));
    },
  });

  return { deleteFavorite };
};
