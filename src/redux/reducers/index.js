import { combineReducers } from "redux";

import { PerfilReducer } from './PerfilReducer';
import { CourseReducer } from './CourseReducer'

const reducers = combineReducers({
	perfilState: PerfilReducer,
	courseState: CourseReducer,
});

export default reducers;