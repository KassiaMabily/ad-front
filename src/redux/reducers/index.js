import { combineReducers } from "redux";

import { PerfilReducer } from './PerfilReducer';
import { CourseReducer } from './CourseReducer';
import { AuxReducer } from './AuxReducer'

const reducers = combineReducers({
	perfilState: PerfilReducer,
	courseState: CourseReducer,
	loadingState: AuxReducer
});

export default reducers;