import { combineReducers } from "redux";

// import { AuthReducer } from './AuthReducer';
import { CourseReducer } from './CourseReducer'

const reducers = combineReducers({
	// perfilState: AuthReducer,
	courseState: CourseReducer,
});

export default reducers;