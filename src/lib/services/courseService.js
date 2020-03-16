import api from '../providers/api';


export const getUserCoursesData = async () => {

    const { data } = await api.get('/user/course/', {});

    return data.data.courses;
};