import axios, { AxiosInstance } from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:4000/api', // URL base de la API
  timeout: 5000, // Tiempo máximo de espera para las solicitudes (en milisegundos
});

export default api  