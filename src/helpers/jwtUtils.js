export const decodificarToken = (token) => {
  try {
    const partes = token.split(".");
    if (partes.length !== 3) {
      throw new Error("token invalido");
    }
    const payload = partes[1];
    const payloadpadded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const tokendecodificado = JSON.parse(atob(payloadpadded));
    return tokendecodificado;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

export const estaVencidoToken = (token) => {
  const tokenDecodificado = decodificarToken(token);
  if (tokenDecodificado && tokenDecodificado.exp) {
    const ahora = Math.floor(Date.now() / 1000);
    return tokenDecodificado.exp < ahora;
  }
};
