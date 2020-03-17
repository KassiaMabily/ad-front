import {
	GET_USER_COURSES, GET_USER_COURSE_UNIT
} from "../../constants/courses";


const initialState = {
	courses: [],
	current_course_units: {}
};

export const CourseReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_COURSES:
			return { ...state, courses: action.data };
		case GET_USER_COURSE_UNIT:
			return { ...state, current_course_units: action.data };
		default:
			return state;
	}
};