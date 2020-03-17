import * as types from "../../constants/courses";

import {
	getUserCoursesData,
	getUserCourseUnitsData
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

export const getUserCourseUnits = (hash) => {
	return async dispatch => {
		const resp = await getUserCourseUnitsData(hash);
		dispatch({
			type: types.GET_USER_COURSE_UNIT,
			data: resp
		});
	}
};