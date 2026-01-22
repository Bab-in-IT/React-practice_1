export const getRatingColor = (rating: number) => {
  if (rating >= 0 && rating < 5) {
    return { backgroundColor: "#c82020" };
  }
  if (rating >= 5 && rating < 7) {
    return { backgroundColor: "#777777" };
  }
  if (rating >= 7 && rating < 8) {
    return { backgroundColor: "#308e21" };
  }
  if (rating >= 8 && rating) {
    return { backgroundColor: "#a59400" };
  }
};
