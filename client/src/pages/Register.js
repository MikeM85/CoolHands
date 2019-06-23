import React, { Component } from "react";

//might not need withRouter
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import TextFieldGroup from "../components/common/TextFieldGroup";
import API from "../utils/API";

class Register extends Component {
	state = {
		username: "",
		displayname: "",
		email: "",
		password: "",
		password2: "",
		city: "",
		stateName: "",
		profilePic: "",
		errors: {},
		modalState: "hide-modal",
		message: "",
		
	};

	

	
	// Check to see if logged in
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
		console.log("state"+Component);
	}
	
	//redux
	//test for errors property
	//errors from component state
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	// onChange
	onChange = e => {
		e.preventDefault();
		if (e.target.name === "username") {
			if (/^([a-zA-Z0-9]){0,15}$/.test(e.target.value)) {
				this.setState({ [e.target.name]: e.target.value });
			}
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}

		if (e.target.name === "username") {
			API.getUsers({ username: e.target.value }).then(user => {
				if (user.data.length > 0) {
					let temperrors = this.state.errors;
					temperrors.username = "Username unavailable";
					this.setState({ errors: temperrors });
				} else {
					let temperrors = this.state.errors;
					temperrors.username = "";
					this.setState({ errors: temperrors });
				}
			});
		} else if (e.target.name === "password") {
			if (!/^([a-zA-Z0-9-_]){0,15}$/.test(e.target.value)) {
				let temperrors = this.state.errors;
				temperrors.password =
					"Invalid Characters. Use Only: a-z, A-Z, 0-9, '_', '-'";
				this.setState({ errors: temperrors });
			} else {
				let temperrors = this.state.errors;
				temperrors.password = "";
				this.setState({ errors: temperrors });
			}
		} else if (e.target.name === "password2") {
			if (!/^([a-zA-Z0-9-_]){0,15}$/.test(e.target.value)) {
				let temperrors = this.state.errors;
				temperrors.password2 =
					"Invalid Characters. Use Only: a-z, A-Z, 0-9, '_', '-'";
				this.setState({ errors: temperrors });
			} else if (
				e.target.value.length > 0 &&
				e.target.value !== this.state.password
			) {
				let temperrors = this.state.errors;
				temperrors.password2 = "Passwords do not match";
				this.setState({ errors: temperrors });
			} else {
				let temperrors = this.state.errors;
				temperrors.password2 = "";
				this.setState({ errors: temperrors });
				console.log("temperrors"+ temperrors);
			}
		}
	};


	//onSubmit
	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			username: this.state.username,
			displayname: this.state.displayname.trim(),
			email: this.state.email.trim(),
			password: this.state.password.trim(),
			password2: this.state.password2.trim(),
			city: this.state.city.trim(),
			stateName: this.state.stateName.trim(),
		};
		console.log("newUser" + newUser);
		if (this.state.profilePic.length > 0) {
			newUser.profilePic = this.state.profilePic;
		}
		this.props
			.registerUser(newUser, this.props.history)
			.then(results => {
				this.setState({
					modalState: "show-modal",
					message: "Thank you for signing up. Please go to the login page to login."
				});
			})

			// console.log("newUser"+newUser);
			.catch(error => {
				this.setState({
					errors: error.response.data,
				});
			});
	};

	closeModal = event => {
		if (event.target.id === "closeme") {
			event.preventDefault();
			this.setState({ modalState: "hide-modal" });
			this.props.history.push("/login");
		}
	};

	render() {
		const { errors } = this.state;
		console.log("errors at render"+errors)

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center font-weight-bold white">
								Sign Up
							</h1>
							<p className="lead text-center">Create your CoolHands account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<TextFieldGroup
										placeholder="Username"
										name="username"
										type="name"
										value={this.state.username}
										onChange={this.onChange}
										error={errors.username}
									/>

									<TextFieldGroup
										placeholder="Display Name"
										name="displayname"
										type="name"
										value={this.state.displayname}
										onChange={this.onChange}
										error={errors.displayname}
									/>

									<TextFieldGroup
										placeholder="Email Address"
										name="email"
										type="email"
										value={this.state.email}
										onChange={this.onChange}
										error={errors.email}
									/>

									<TextFieldGroup
										placeholder="Profile Pic"
										name="profilePic"
										type=""
										value={this.state.profilePic}
										onChange={this.onChange}
										error={errors.profilePic}
									/>

									<TextFieldGroup
										placeholder="City"
										name="city"
										type=""
										value={this.state.city}
										onChange={this.onChange}
										error={errors.city}
									/>

									<TextFieldGroup
										placeholder="State"
										name="stateName"
										type=""
										value={this.state.stateName}
										onChange={this.onChange}
										error={errors.stateName}
									/>

									<TextFieldGroup
										placeholder="Password"
										name="password"
										type="password"
										value={this.state.password}
										onChange={this.onChange}
										error={errors.password}
									/>

									<TextFieldGroup
										placeholder="Confirm Password"
										name="password2"
										type="password"
										value={this.state.password2}
										onChange={this.onChange}
										error={errors.password2}
									/>

									<input
										type="submit"
										className="btn btn-info btn-block mt-4"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div
					id="modal"
					className={this.state.modalState}
					onClick={this.closeModal}
				>
					<div id="portfolioscreen" className="modal-content">
						<div>
							<h2 className="message">{this.state.message}</h2>
						</div>
						<button
							id="closeme"
							className="btn btn-outline-danger closebtn"
							onClick={this.closeModal}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		);
	}
}

//For Redux
Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});



export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
