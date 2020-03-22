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

    var aulas = [];
    
    
    for(var i = 0; i < data.data.modules.length; i++){
        aulas.push(data.data.modules[i]);
        aulas[i]['slug'] = string_to_slug(data.data.modules[i].title);
        for(var j = 0; j < aulas[i].units.length; j++){
            aulas[i].units[j]['slug'] = string_to_slug(aulas[i].units[j].title);
        }
        
    }
    
    return {
        aulas: aulas,
        nameCourse: data.data.title,
        slugCourse: string_to_slug(data.data.title),
        hashCourse: data.data.hash,
        currentUnit: data.data.current.unit,
        finished: data.data.finished,
        modulo: data.data.current.module_id,
        nextUnit: data.data.currentNext,
        producer: data.data.producer.name,
        img_link: data.data.img_link
    };
};

export const getUnitData = async (hash_course, hash_unit) => {

    const { data } = await api.get(`/user/course/${hash_course}/unit/${hash_unit}/`, {});

    return data.data;
};

export const setFinishedUnitData = async (hash_course, hash_unit, type) => {
    if(type === "button"){
        await api.put(`/user/progress/course/${hash_course}/unit/${hash_unit}/`, {});

    }else{
        await api.put(`/user/progress/conclusion/course/${hash_course}/unit/${hash_unit}/`, {});
    }
    return true;
}

export const postCommentData = async (hash_course, hash_unit, data_comment) => {

    const { data } = await api.post(`/user/comment/course/${hash_course}/unit/${hash_unit}/`, data_comment);

    // return data.data;

    return data.data;
}

export const postReplyData = async (hash_comment, data_comment) => {

    const { data } = await api.post(`/user/comment/${hash_comment}/reply/`, data_comment);

    return data.data;
}