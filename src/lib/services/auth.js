import api from '../providers/api';
import { decode as atob, encode } from 'base-64'

export const TOKEN_KEY = "@adrockets-Token";
export const USER_KEY = "@adrockets-User";

export const loginData = async (user, password) => {
    api.defaults.headers.common['Authorization'] = 'Basic ' + encode(user + ':' + password);

    const { data } = await api.get('/token/', {});

    const { token } = data.data;
    localStorage.setItem(TOKEN_KEY, token);

    return data.data.user;
};

export const logout = () => {
    localStorage.clear();
}

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;