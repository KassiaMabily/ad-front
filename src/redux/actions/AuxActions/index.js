import * as types from "../../constants/aux_constant";

export const setLoading = (is_loading) => {
	return async dispatch => {
		dispatch({
			type: types.SET_LOADING,
			data: is_loading
		});
	}
};