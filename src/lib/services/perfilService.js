import api from '../providers/api';

export const getUserData = async () => {

    const { data } = await api.get('user/', {});

    return data.data;
};