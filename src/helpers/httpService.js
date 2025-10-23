

//usamos una variable de entorno para la url del backend
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const get = async(ruta) => {
    const response = await fetch(`${URL}${ruta}`,{method: "GET"})
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return response.json();
}