import React, { Component } from "react";
import { Row } from "../grid";
import API from "../../utils/API";
import { FormBtn } from "../Form/index";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EditForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			comment: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
		this.loadReviews();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ 
			rating: nextProps.review.rating,
			comment: nextProps.review.review
		});
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
			this.updateReview();
		}
	};

	updateReview = () => {
		API.updateReview({
			_id: this.props.review._id,
			UserId: this.props.auth.user.id,
			username: this.props.auth.user.username,
			displayname: this.props.auth.user.displayname,
			YelpId: this.props.review.YelpId,
			restaurantname: this.props.review.restaurantname,
			rating: this.state.rating,
			review: this.state.comment
		}).then(()=> {
			this.props.closeModal();
			this.props.refreshFunction();
			this.loadReviews();
		})
		  .catch(err => console.log(err));
	}

	render() {
		return (
			<div className="card">
				<Row>
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
							</div>
							
						</form>
					</div>
				</Row>
				<div className="btngroup">
					<FormBtn
						disabled={!this.state.comment}
						onClick={this.handleFormSubmit}
						className="btn btn-success btn-left"
					>
						Update Review
					</FormBtn>
					<FormBtn
						onClick={this.props.closeModal}
						className="btn btn-danger btn-right"
					>
						Cancel
					</FormBtn>
				</div>
			</div>
		);
	}
}

EditForm.propTypes = {
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
)(EditForm);
