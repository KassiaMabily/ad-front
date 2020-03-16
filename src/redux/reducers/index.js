import { combineReducers } from "redux";

import { AuthReducer } from './AuthReducer';

const reducers = combineReducers({
	perfilState: AuthReducer,
});

export default reducers;