import {
	SET_LOADING
} from "../../constants/aux_constant";

const initialState = {
	is_loading: false
};

export const AuxReducer = (state = initialState, action) => {

	switch (action.type) {
		case SET_LOADING:
			return { ...state, is_loading: action.data };
		default:
			return state;
	}
};