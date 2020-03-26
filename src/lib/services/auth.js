import api from '../providers/api';
import { encode } from 'base-64'

export const TOKEN_KEY = "@adrockets-Token";
export const COURSE_KEY = "@adrockets-Course";
export const MODULO_KEY = "@adrockets-Modulo";
export const UNIT_KEY = "@adrockets-Unit";
export const NEXT_UNIT_KEY = "@adrockets-NextUnit";

export const login = async (user, password) => {
    api.defaults.headers.common['Authorization'] = 'Basic ' + encode(user + ':' + password);

    const { data } = await api.get('/token/', {});

    const { token } = data.data;

    localStorage.setItem(TOKEN_KEY, token);

    return token;
};

export const forgotpassword = async (email) => {

    const { data } = await api.post('/user/password/', {email: email});

    return data;
};

export const resetpassword = async (password) => {

    const { data } = await api.put('/user/password/', { new_password: password });

    return data;
};

export const logout = () => {
    localStorage.clear();
}

export const getKey = (key) => { 
    return localStorage.getItem(key) 
};


export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;