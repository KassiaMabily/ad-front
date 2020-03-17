import * as types from "../../constants/perfil";
import { getUserData } from "../../../lib/services/perfilService";

export const getUser = () => {
	return async dispatch => {
		const resp = await getUserData();
		dispatch({
			type: types.GET_USER,
			data: resp
		});
	}
};