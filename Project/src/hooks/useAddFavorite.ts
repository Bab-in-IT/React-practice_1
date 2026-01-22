import { useMutation } from "@tanstack/react-query";
import { addFavorite } from "../api/api";
import { queryClient } from "../api/queryClient";
import { useAppDispatch } from "../store/hook";
import { setErrorText, toggleIsError } from "../store/ErrorSlice";
import { toggleFavorite } from "../store/AuthSlice";

export const useAddFavorite = (id: number) => {
  const dispatch = useAppDispatch();
  const { mutate: addToFavorite } = useMutation({
    mutationFn: () => addFavorite(id.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      dispatch(toggleFavorite(true));
    },
    onError: (error) => {
      console.log("Ошибка добавления в избранное", error);
      dispatch(setErrorText(error.message));
      dispatch(toggleIsError(true));
    },
  });
  return { addToFavorite };
};
