import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "../services/auth";

import Login from "../pages/Login";
import Courses from "../pages/Courses";
import CourseUnits from "../pages/CourseUnits";


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
			</Switch>
		</BrowserRouter>
	);
}

export default connect()(App);

