import * as types from "../../constants/courses";

import {
	getUserCoursesData
} from "../../../lib/services/courseService";


export const getUserCourses = () => {
	return async dispatch => {
		const resp = await getUserCoursesData();
		dispatch({
			type: types.GET_USER_COURSES,
			data: resp
		});
	}
};