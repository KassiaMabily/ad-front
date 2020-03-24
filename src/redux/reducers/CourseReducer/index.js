import {
	GET_USER_COURSES, 
	GET_USER_COURSE_UNIT, 
	GET_CURRENT_UNIT, 
	SET_FINISHED_UNIT,
	POST_COMMMENT_COURSE,
	POST_REPLY_COMMENT
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
			const finished = action.data.finished;
			return {
				...state,
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

		case POST_COMMMENT_COURSE:
			const post = { 
				post: {
					author: action.data.body.author,
					datetime: action.data.body.datetime,
					hash: action.data.body.hash,
					img_link: action.data.body.img_link,
					message: action.data.body.message,
				},
				reply: []
			}

			return {
				...state,
				current_unit: { 
					...state.current_unit, 
					current: { 
						...state.current_unit.current, 
						unit: { 
							...state.current_unit.current.unit,
							comments: [
								...state.current_unit.current.unit.comments,
								post
							]
						}
					} 
				}
			}

		case POST_REPLY_COMMENT:
			const comment_hash = action.data.hash_comment;
			const reply = { 
				author: action.data.body.author,
				datetime: action.data.body.datetime,
				hash: action.data.body.hash,
				img_link: action.data.body.img_link,
				message: action.data.body.message,
			}

			let { current_unit } = state
			let index = 0;
			for(var i=0; i < current_unit.current.unit.comments.length; i++){
				if(current_unit.current.unit.comments[i].post.hash === comment_hash ){
					index = i;
				}

			}

			let new_state = current_unit;
			new_state.current.unit.comments[index].reply.push(reply);

			return {  ...state,  current_unit: new_state }
		default:
			return state;
	}
};