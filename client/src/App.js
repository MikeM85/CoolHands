import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";


import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";


import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


import "./App.css";

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token, get User info and expiration
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set User and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout User
		store.dispatch(logoutUser());
		// Clear current profile
		store.dispatch(clearCurrentProfile());
		// Redirect to Login
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App page-b">
						<div className="dark-overlay">
						<Navbar />
							<div className="container page-h">
								<Switch>
									<Route exact path="/" component={Landing} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/login" component={Login} />
									<PrivateRoute path="/dashboard" component={Dashboard} />
									

						
								</Switch>
							</div>
							
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
