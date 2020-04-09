import {
	SET_LOADING,
	SET_OPEN_PASSWORD
} from "../../constants/aux_constant";

const initialState = {
	is_loading: false,
	openPassword: false,
};

export const AuxReducer = (state = initialState, action) => {

	switch (action.type) {
		case SET_LOADING:
			return { ...state, is_loading: action.data };
		case SET_OPEN_PASSWORD:
			return { ...state, openPassword: action.data };
		default:
			return state;
	}
};