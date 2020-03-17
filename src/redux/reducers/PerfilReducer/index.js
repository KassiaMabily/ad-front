import {
	GET_USER
} from "../../constants/perfil";

const initialState = {
	perfil: {}
};

export const PerfilReducer = (state = initialState, action) => {

	switch (action.type) {
		case GET_USER:
			return { ...state, perfil: action.data };
		default:
			return state;
	}
};