// Importamos fetch nativo de Node.js
import fetch from 'node-fetch';

//usamos una variable de entorno para la url del backend
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:59714/api";

export const get = async (url, params) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${URL}${url}?${queryString}`, { method: 'GET' });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  return response.json();
};

export const post = async (url, data) => {
  const response = await fetch(`${URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  return response.json();
};

export const put = async (url, data) => {
  const response = await fetch(`${URL}${url}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  return response.json();
};

export const remove = async (url) => {
  const response = await fetch(`${URL}${url}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  return response.json();
};

export const patch = async (url, data) => {
  const response = await fetch(`${URL}${url}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  return response.json();
};