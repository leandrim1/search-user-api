import axios from "axios";

const axiosConfig = axios.create({
    baseURL: 'https://apirotaryrailway-production.up.railway.app/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosConfig;