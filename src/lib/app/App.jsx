import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { isAuthenticated } from "../services/auth";

import Login from "../pages/Login";
import Courses from "../pages/Courses";



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
				<PrivateRoute exact path="/" component={Courses} />
				<Route path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	);
}

export default connect()(App);

// export default App;

