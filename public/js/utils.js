export const getDate = function () {
  const today = new Date();
  const date = today.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return date;
};
