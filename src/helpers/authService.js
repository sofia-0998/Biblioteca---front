import { estaVencidoToken } from "./jwtUtils";

export const estaAutenticado = () => {
  const token = localStorage.getItem("token");
  return token && !estaVencidoToken(token);
};

export const cerrarSesion = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  window.location.href = "/login";
};
