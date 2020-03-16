import * as types from "../../constants/auth";
import { loginData } from "../../../lib/services/auth";

export const login = (user, password) => {
	return (dispatch) => {
		return loginData(user, password).then(userdata => {
			dispatch({
				type: types.GET_TOKEN,
				data: userdata
			});
		})
	}
};