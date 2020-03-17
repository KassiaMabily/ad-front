import {
	GET_USER_COURSES, 
	GET_USER_COURSE_UNIT, 
	GET_CURRENT_UNIT, 
	SET_FINISHED_UNIT
} from "../../constants/courses";

const initialState = {
	courses: [],
	current_course_units: {},
	current_unit: {}
};

export const CourseReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_COURSES:
			return { ...state, courses: action.data };
		case GET_USER_COURSE_UNIT:
			return { ...state, current_course_units: action.data };
		case GET_CURRENT_UNIT:
			return { ...state, current_unit: action.data };
		case SET_FINISHED_UNIT:
			const hash_unit = action.data.hash_unit;

			let finished = state.current_unit.current.unit.finished ? false : true;

			return {
				...state,
				current_course_units: {
					...state.current_course_units,
					aulas: [
						...state.current_course_units.aulas,
						state.current_course_units.aulas.map(aula => {
							aula.units.map(unit => {
								if(unit.hash === hash_unit){
									let new_unit = unit
									new_unit.finished =true
									return { ...new_unit }
								}
								return unit;
							})
						})
					]
				},
				current_unit: { 
					...state.current_unit, 
					current: { 
						...state.current_unit.current, 
						unit: { 
							...state.current_unit.current.unit,
							finished: finished
						}
					} 
				}
			};
		default:
			return state;
	}
};