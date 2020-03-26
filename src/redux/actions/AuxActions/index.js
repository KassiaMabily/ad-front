import * as types from "../../constants/aux_constant";

export const setLoading = (is_loading) => {
	return async dispatch => {
		dispatch({
			type: types.SET_LOADING,
			data: is_loading
		});
	}
};

export const setOpenPassword = (is_open) => {
	return async dispatch => {
		dispatch({
			type: types.SET_OPEN_PASSWORD,
			data: is_open
		});
	}
};