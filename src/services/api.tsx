import axios from "axios";

const api = axios.create({
    baseURL: 'https://apirotaryrailway-production.up.railway.app/api/v1/Usuario/BuscarUsuarioPorId/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

