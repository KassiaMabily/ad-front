import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "../services/auth";

import Login from "../pages/Login";
import Courses from "../pages/Courses";
import CourseUnits from "../pages/CourseUnits";
import CourseUnitClass from "../pages/CourseUnitClass";

const PrivateRoute = ({ component: Component, ...rest }) => (
	
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
					<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
				)
		}
	/>
)


function App() {
	return (
		<BrowserRouter >
			<Switch>
				<Route path="/login" component={Login} />
				<PrivateRoute exact path="/" component={Courses} />
				<PrivateRoute exact path="/:slug_course" component={CourseUnits} />
				<PrivateRoute exact path="/:slug_course/:slug_modulo/:slug_class" component={CourseUnitClass} />
			</Switch>
		</BrowserRouter>
	);
}

export default connect()(App);

