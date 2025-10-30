//usamos una variable de entorno para la url del backend
const URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:51559/api";

export const get = async (url, params) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${URL}${url}?${queryString}`, {
    method: "GET",
    
  });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  // Si el status es 204 (No Content), no hay cuerpo para parsear
  if (response.status === 204) return null;
  return response.json();
};

export const post = async (url, data) => {
  const response = await fetch(`${URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  // Si el status es 204 (No Content), no hay cuerpo para parsear
  if (response.status === 204) return null;
  return response.json();
};

export const put = async (url, data) => {
  const response = await fetch(`${URL}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  // Si el status es 204 (No Content), no hay cuerpo para parsear
  if (response.status === 204) return null;
  return response.json();
};

export const remove = async (url) => {
  const response = await fetch(`${URL}${url}`, {
    method: "DELETE",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  console.log(response);
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  // Si el status es 204 (No Content), no hay cuerpo para parsear
  if (response.status === 204) return null;

  // Leer el contenido una sola vez
  const text = await response.text();

  // Si no hay texto, retornar null
  if (!text || text.trim() === "") {
    return null;
  }

  // Intentar parsear como JSON
  try {
    return JSON.parse(text);
  } catch {
    console.warn("Respuesta no es JSON válido:", text);
    return text; // Retornar el texto tal como está
  }
};

export const patch = async (url, data) => {
  const response = await fetch(`${URL}${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  // Si el status es 204 (No Content), no hay cuerpo para parsear
  if (response.status === 204) return null;
  return response.json();
};
