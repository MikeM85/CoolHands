import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import TextFieldGroup from "../components/common/TextFieldGroup";

class Login extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		errors: {},
	};

	// Check to see if logged in
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	//redux
	//test for errors property
	//errors from component state
	componentWillReceiveProps(nextProps) {
		// test if user isAuthenticated redirect to dashboard
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	//onChange
	onChange = e => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	// onSubmit
	onSubmit = e => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};

		this.props.loginUser(userData);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center font-weight-bold white">
								Log In
							</h1>
							<p className="lead text-center">
								Sign in to your Cool Hands account
							</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Email Address"
									name="email"
									type="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
								/>

								<TextFieldGroup
									placeholder="Password"
									name="password"
									type="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>

								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
