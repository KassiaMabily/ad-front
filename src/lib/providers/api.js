import axios from 'axios';
import { errorMessage } from '../services/messageService';
import { logout } from '../services/auth';
export const TOKEN_KEY = "@adrockets-Token";
const api = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/v0' : 'https://api.adgrouptraining.com/v0'
    // baseURL: 'http://18.219.149.117/v0'
    baseURL: 'https://api.adgrouptraining.com/v0'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
        config.headers.token = `${token}`;
    }

    return config;
})

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error.response)
    if (error.response) {
        if (error.response.status === 400) {
            errorMessage('', error.response.data.message);
        } else if (error.response.status === 404) {
            errorMessage('', 'O recurso não foi encontrado');
        } else if (error.response.status === 500) {
            errorMessage('', 'Ocorreu um erro inesperado.');
        } else if (error.response.status === 401) {
            errorMessage('', error.response.data.message);
            if(error.response.data.message === "ERROR: Token do usuario invalido"){
                logout();
                window.location.reload();
            }
        }
    }

    return Promise.reject(error);
})

export default api;
