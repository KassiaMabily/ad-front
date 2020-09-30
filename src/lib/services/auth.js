import api from '../providers/api';
import { encode } from 'base-64'

import TagManager from "react-gtm-module";

export const TOKEN_KEY = "@adrockets-Token";
export const COURSE_KEY = "@adrockets-Course";
export const MODULO_KEY = "@adrockets-Modulo";
export const UNIT_KEY = "@adrockets-Unit";
export const NEXT_UNIT_KEY = "@adrockets-NextUnit";

export const login = async (user, password) => {
    api.defaults.headers.common['Authorization'] = 'Basic ' + encode(user + ':' + password);

    const { data } = await api.get('/token/', {});

    const { token } = data.data;

    await localStorage.setItem(TOKEN_KEY, token);

    await TagManager.dataLayer({
        dataLayer: {
          event: 'login_plataforma',
        },
      })

    return token;
};

export const register = async (data_registration) => {

    const { data } = await api.post('/registration/user/', data_registration);

    return data;
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