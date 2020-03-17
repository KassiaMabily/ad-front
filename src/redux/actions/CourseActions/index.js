import * as types from "../../constants/courses";

import {
	getUserCoursesData,
	getUserCourseUnitsData,
	getUnitData,
	setFinishedUnitData
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

export const getUnit = (hash_course, hash_unit) => {
	return async dispatch => {
		const resp = await getUnitData(hash_course, hash_unit);
		dispatch({
			type: types.GET_CURRENT_UNIT,
			data: resp
		});
	}
};

export const setFinishedUnit = (hash_course, hash_unit) => {
	return async dispatch => {
		const resp = await setFinishedUnitData(hash_course, hash_unit);
		dispatch({
			type: types.SET_FINISHED_UNIT,
			data: { hash_course: hash_course, hash_unit: hash_unit }
		});
	}
};