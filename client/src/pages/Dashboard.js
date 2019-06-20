import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profileActions";
import { Col, Row, Container } from "../components/grid";
import API from "../utils/API";
import ReviewCard from "../components/cards/ReviewCard";
import { List, ListItem } from "../components/list";
import EditForm from "../components/comments/EditForm";
import { FormBtn } from "../components/Form/index";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			switch: true,
			reviews: [],
			yourReviews: [],
			followers: [{}],
			numfollowing: "",
			numfollowers: "",
			rating: 0,
			comment: "",
			numReviews: "",
			thisReview: {},
			modalState: "hide-modal",
			editContentClass: "modal-content-edit d-none",
			deleteContentClass: "modal-content-delete d-none",
		};
		this.handleSwitch = this.handleSwitch.bind(this);
		this.findFollowers = this.findFollowers.bind(this);
		this.findFollowing = this.findFollowing.bind(this);
		this.getReviews = this.getReviews.bind(this);
		this.closeModal = this.closeModal.bind(this);
		// this.getReviewFeed = this.getReviewFeed.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
		this.findFollowers();
		this.findFollowing();
		this.getReviewCount();
		this.getFeed();
	}

	// Find Followers
	findFollowers = () => {
		let query = {
			FollowingId: this.props.auth.user.id,
		};
		API.getfollowers(query)
			.then(results => {
				let numfollowers = results.data.length;
				this.setState({
					followers: results.data,
					numfollowers: numfollowers,
				});
			})
			.catch(error => console.log(error));
	};

	// Find Following
	findFollowing = () => {
		let query = {
			FollowerId: this.props.auth.user.id,
		};
		API.getfollowers(query)
			.then(results => {
				let numfollowing = results.data.length;
				this.setState({
					followers: results.data,
					numfollowing: numfollowing,
				});
			})
			.catch(error => console.log(error));
	};

	// Get Reviews for User
	getReviews = () => {
		const { user } = this.props.auth;
		API.getReviews({ UserId: user.id })
			.then(reviews => {
				for (let i in reviews.data) {
					reviews.data[i]["className"] = "deletebtn";
					reviews.data[i]["editClass"] = "editbtn";
				}
				this.setState({
					yourReviews: reviews.data,
				});
			})
			.catch(error => console.log(error));
	};

	deleteReview = event => {
		event.preventDefault();
		let reviewID = event.target.getAttribute("reviewid");
		this.setState({
			deleteContentClass: "modal-content-delete showContent",
			modalState: "show-modal",
			reviewID: reviewID,
		});
	};

	confirmDelete = event => {
		event.preventDefault();
		API.deleteReview(this.state.reviewID).then(() => {
			this.setState({
				yourReviews: [],
				modalState: "hide-modal",
				editContentClass: "modal-content-edit d-none",
				deleteContentClass: "modal-content-delete d-none",
			});
			this.getReviews();
		});
	};

	getReviewCount = () => {
		const { user } = this.props.auth;
		API.getReviews({ UserId: user.id })
			.then(reviews => {
				this.setState({
					numReviews: reviews.data.length,
				});
			})
			.catch(error => console.log(error));
	};

	getFeed = () => {
		API.getfollowers({ FollowerId: this.props.auth.user.id })
			.then(results => {
				let tempFollowers = [];
				for (let followOBJ of results.data) {
					tempFollowers.push(followOBJ.FollowingId);
				}
				this.findReviewsofFollowers(tempFollowers);
			})
			.catch(error => console.log(error));
	};

	findReviewsofFollowers = followers => {
		API.getReviews({ UserId: { $in: followers } }).then(reviews => {
			for (let i in reviews.data) {
				reviews.data[i]["className"] = "d-none";
				reviews.data[i]["editClass"] = "d-none";
			}
			this.setState({
				yourReviews: reviews.data,
			});
		});
	};

	editReview = event => {
		event.preventDefault();
		let reviewID = event.target.getAttribute("reviewid");
		API.getReviews({ _id: reviewID }).then(review => {
			this.setState({
				thisReview: review.data[0],
				modalState: "show-modal",
				editContentClass: "modal-content-edit showContent",
			});
		});
	};

	closeModal = event => {
		if (typeof event !== "undefined") {
			event.preventDefault();
		}
		this.setState({
			modalState: "hide-modal",
			editContentClass: "modal-content-edit d-none",
			deleteContentClass: "modal-content-delete d-none",
		});
		this.getReviews();
	};

	handleSwitchToReviews = () => {
		this.handleSwitch();
		this.getReviews();
	};

	handleSwitchToFeed = () => {
		this.handleSwitch();
		this.getFeed();
	};

	handleSwitch() {
		this.setState(state => ({
			switch: !state.switch,
		}));
	}

	render() {
		const { user } = this.props.auth;
		return (
			<div className="page-h">
				<Container>
					<div className="dashboard-bg">
						<div className="profile-header text-center">
							<Row>
								<Col size="md-12">
									<img
										className="profile-pic img-responsive m-3"
										src={user.profilePic || "https://picsum.photos/250/?random"}
										alt="Profile"
									/>
								</Col>
							</Row>
							<div className="row text-bg">
								<Col size="md-4" value={this.state.numReviews}>
									# of Reviews
									<strong> {this.state.numReviews}</strong>
								</Col>
								<Col size="md-4" value={this.state.numfollowers}>
									# of Followers <strong>{this.state.numfollowers}</strong>
								</Col>
								<Col size="md-4" value={this.state.numfollowing}>
									# Following <strong>{this.state.numfollowing}</strong>
								</Col>
							</div>
							<div className="row text-bg">
								<hr className="m-2" />
							</div>
							<div className="row text-bg">
								<Col size="md-6">
									{this.state.switch ? (
										<button>Review Feed ▼</button>
									) : (
										<button onClick={this.handleSwitchToFeed}>
											Review Feed ▶
										</button>
									)}
								</Col>
								<Col size="md-6" value={this.state.numfollowing}>
									{this.state.switch ? (
										<button onClick={this.handleSwitchToReviews}>
											Your Reviews ▶
										</button>
									) : (
										<button>Your Reviews ▼</button>
									)}
								</Col>
							</div>
						</div>
					</div>
					<Row>
						<Col size="md-12">
							{/* Need to populate list here. Review Feed(findFollowing?) in the second arg, the user's reviews(getReviews?) in the third. */}
							{this.state.switch ? (
								<List>
									<ListItem key={user.username}>
										<strong>{user.displayname + "'s Review Feed"}</strong>
									</ListItem>
								</List>
							) : (
								<List>
									<ListItem key={user.username}>
										<strong>{user.displayname + "'s Reviews"}</strong>
									</ListItem>
								</List>
							)}
						</Col>
					</Row>
					{this.state.yourReviews.map(yourReview => (
						<ReviewCard
							id={yourReview.UserId}
							name={yourReview.restaurantname}
							yelpid={yourReview.YelpId}
							key={yourReview._id}
							rating={yourReview.rating}
							review={yourReview.review}
							username={yourReview.username}
							displayname={yourReview.displayname}
							myClass={yourReview.className}
							deletebtn={this.deleteReview}
							reviewid={yourReview._id}
							editClass={yourReview.editClass}
							editreview={this.editReview}
						/>
					))}
					<div id="modal" className={this.state.modalState}>
						<div id="dashboardmodel" className={this.state.editContentClass}>
							<Col size="md-12">
								<h3>{this.state.thisReview.restaurantname}</h3>
								<EditForm
									review={this.state.thisReview}
									closeModal={this.closeModal}
									refreshFunction={this.getReviews}
								/>
							</Col>
						</div>
						<div id="verifydelete" className={this.state.deleteContentClass}>
							<h3>Delete Review?</h3>
							<br />
							<div className="btngroup">
								<FormBtn
									onClick={this.confirmDelete}
									className="btn btn-success btn-left"
								>
									Delete
								</FormBtn>
								<FormBtn
									onClick={this.closeModal}
									className="btn btn-danger btn-right"
								>
									Cancel
								</FormBtn>
							</div>
						</div>
					</div>
				</Container>
			</div>
		);
	}
}

Dashboard.propTypes = {
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
)(Dashboard);
