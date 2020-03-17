import api from '../providers/api';
import string_to_slug from '../assets/Functions';

export const getUserCoursesData = async () => {

    const { data } = await api.get('/user/course/', {});

    var courses = [];
    
    for(var i = 0; i < data.data.courses.length; i++){
        courses.push(data.data.courses[i]);
        courses[i]['slug'] = string_to_slug(data.data.courses[i].title);
    }
    return courses;
};


export const getUserCourseUnitsData = async (hash) => {

    const { data } = await api.get(`/user/course/${hash}/`, {});

    return {
        aulas: data.data.modules,
        nameCourse: data.data.title,
        currentUnit: data.data.current.unit,
        finished: data.data.finished,
        modulo: data.data.current.module_id,
        nextUnit: data.data.currentNext
    };
};