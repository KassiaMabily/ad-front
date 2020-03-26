import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "../services/auth";

import Login from "../pages/Login";
import Courses from "../pages/Courses";
import CourseUnits from "../pages/CourseUnits";
import CourseUnitClass from "../pages/CourseUnitClass";
import PasswordForgot from "../pages/ForgotPassword";
import PasswordReset from "../pages/PasswordReset"

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

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


function App({ is_loading }) {
	const classes = useStyles();

	return (
		<BrowserRouter >
			<Backdrop className={classes.backdrop} open={is_loading}>
                <CircularProgress color="inherit" />
            </Backdrop> 
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/esqueci-senha" component={PasswordForgot} />
				<Route exact path="/user/password" component={PasswordReset} />
				<PrivateRoute exact path="/" component={Courses} />
				<PrivateRoute exact path="/:slug_course" component={CourseUnits} />
				<PrivateRoute exact path="/:slug_course/:slug_modulo/:slug_class" component={CourseUnitClass} />
			</Switch>
		</BrowserRouter>
	);
}

const mapStateToProps = state => ({
	is_loading: state.loadingState.is_loading,
});

export default connect(mapStateToProps)(App);

