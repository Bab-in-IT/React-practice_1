export const formatRunTime = (time: number): string => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${String(hours)} ч ${String(minutes)} мин`;
};
