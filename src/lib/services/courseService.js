import api from '../providers/api';
import string_to_slug from '../assets/Functions';

export const getUserCoursesData = async () => {

    const { data } = await api.get('/user/course/', {});

    var courses = [];
    
    for(var i = 0; i < data.data.courses.length; i++){
        courses.push(data.data.courses[i]);
        courses[i]['slug'] = string_to_slug(data.data.courses[i].title);
    }

    console.log(courses)
    return courses;
};