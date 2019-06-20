import React, { Component } from "react";
import { Col, Row } from "../grid";
import API from "../../utils/API";
import { FormBtn } from "../Form/index";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			comment: "",
			errors: {}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
		this.loadReviews();
	}

	loadReviews = () => {
		API.getReviews()
			.then(res =>
				this.setState({ reviews: res.data, rating: "", comment: "" })
			)
			.catch(err => console.log(err));
	};

	handleInputChange(event) {
		return function(e) {
			var state = {};
			state[event] = e.target.value;
			this.setState(state);
		}.bind(this);
	}

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.comment) {
			this.addReview();
		}
	};

	addReview = () => {
		API.addReview({
			UserId: this.props.auth.user.id,
			username: this.props.auth.user.username,
			displayname: this.props.auth.user.displayname,
			YelpId: this.props.passProp,
			restaurantname: this.props.restaurantName,
			rating: this.state.rating,
			review: this.state.comment,
		})
			.then(this.loadReviews())
			.catch(error=> {
				console.log(error.response.data)
				this.setState({
					errors: error.response.data
				})
			});
	}

	render() {
		const { user } = this.props.auth;
		return (
			<div className="card review">
				<Row>
					<Col size="md-2">
						<img className="comment-pic" src={user.profilePic} alt="profile" />
						<div className="text-center">{user.username}</div>
					</Col>
					<div className="col-md">
						<form>
							<div className="form-group">
								<label htmlFor="rating">Rating:</label>
								<select
									className="form-control"
									id="rating"
									value={this.state.rating}
									onChange={this.handleInputChange("rating")}
								>
									<option>0</option>
									<option>0.5</option>
									<option>1</option>
									<option>1.5</option>
									<option>2</option>
									<option>2.5</option>
									<option>3</option>
									<option>3.5</option>
									<option>4</option>
									<option>4.5</option>
									<option>5</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="comment">Comment:</label>
								<textarea
									className="form-control"
									id="comment"
									rows="3"
									placeholder="Comment (Required)"
									value={this.state.comment}
									onChange={this.handleInputChange("comment")}
								/>
								<p className="error">{this.state.errors.review}</p>
							</div>
							<FormBtn
								disabled={!this.state.comment}
								onClick={this.handleFormSubmit}
								className="btn btn-success"
							>
								Submit Review
							</FormBtn>
						</form>
					</div>
				</Row>
			</div>
		);
	}
}

CommentForm.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(CommentForm);
