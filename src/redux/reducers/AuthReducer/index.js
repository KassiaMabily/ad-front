import {
	GET_TOKEN
} from "../../constants/auth";

const initialState = {
	perfil: {}
};

export const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TOKEN:
			return {
				...state,
				perfil: action.data
			};
		default:
			return state;
	}
};
