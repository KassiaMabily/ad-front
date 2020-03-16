import React from "react";
import { connect } from "react-redux";
import Login from "../pages/Login";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { isAuthenticated } from "../services/auth";

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

const Main = withRouter(({ location }) => {
	return(
		<div>
			<PrivateRoute path="/" component={App}>
				<div>
					{/* {
						location.pathname != '/login' && <Navbar />
						
					} */}
					<main>
						<Switch>
							<PrivateRoute exact path='/' />
						</Switch>
					</main>
					{/* <Footer/> */}
				</div>
			</PrivateRoute>
			<Route path="/login" component={Login} />
		</div>
	)

})


function App() {
	return (
		<div data-testid="app">
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</div>
	);
}

export default connect()(App);

// export default App;

