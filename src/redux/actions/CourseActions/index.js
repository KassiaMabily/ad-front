import * as types from "../../constants/courses";

import {
	getUserCoursesData,
	getUserCourseUnitsData,
	getUnitData,
	setFinishedUnitData,
	postCommentData,
	postReplyData
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

export const setFinishedUnit = (hash_course, hash_modulo, hash_unit, type) => {
	return async dispatch => {
		const resp = await setFinishedUnitData(hash_course, hash_unit, type);
		dispatch({
			type: types.SET_FINISHED_UNIT,
			data: { hash_modulo: hash_modulo, hash_unit: hash_unit, finished: resp.finished }
		});
	}
};

export const postComment = (hash_course, hash_unit, data) => {
	return async dispatch => {
		const resp = await postCommentData(hash_course, hash_unit, data);
		dispatch({
			type: types.POST_COMMMENT_COURSE,
			data: { hash_course: hash_course, hash_unit: hash_unit, body: resp }
		});
	}
};

export const postReply = (hash_comment, data) => {
	return async dispatch => {
		const resp = await postReplyData(hash_comment, data);
		dispatch({
			type: types.POST_REPLY_COMMENT,
			data: { hash_comment: hash_comment, body: resp }
		});
	}
};