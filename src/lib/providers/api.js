import axios from 'axios';
import { errorMessage, errorToastr } from '../services/messageService';
export const TOKEN_KEY = "@adrockets-Token";
const api = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://api.adgrouptraining.com/v0'
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
            const responseData = error.response.data;

            if (typeof(responseData) == 'string') {
                errorMessage(null, responseData);
            } else if (typeof(responseData) == 'object') {
                const handleError = (error, key) => {
                    if ((!key) || (key === 'non_field_errors'))
                        errorToastr(`${error}`);
                    else
                        errorToastr(`${key}: ${error}`);
                };

                Object.keys(responseData).forEach(function(key) {
                if (typeof(responseData[key]) == 'string') {
                    handleError(responseData[key]);
                } else {
                    responseData[key].forEach(s => {
                    handleError(s, key);
                    });
                }
                });
            }
        } else if (error.response.status === 404) {
            errorMessage('', 'O recurso não foi encontrado');
        } else if (error.response.status === 500) {
            errorMessage('', 'Ocorreu um erro inesperado.');
        } else if (error.response.status === 401) {
            errorMessage('', error.response.data.message);
        }
    }

  return Promise.reject(error);
})

export default api;
