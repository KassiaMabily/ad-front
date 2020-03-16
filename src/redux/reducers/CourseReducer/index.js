import {
	GET_USER_COURSES
} from "../../constants/courses";


const initialState = {
	courses: [],
	course: {}
};

export const CourseReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_COURSES:
			return { ...state, courses: action.data };
		default:
			return state;
	}
};