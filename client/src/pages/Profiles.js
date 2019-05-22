import React, { Component } from "react";
import ProfileCard from "../components/cards/ProfileCard";
import { FormBtn, Input } from "./Search";
import API from "../utils/API";
import { getCurrentProfile } from "../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles.css";

class Profiles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			users: [],
		};
		this.findReviews = this.findReviews.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.findFollowers = this.findFollowers.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleClick = event => {
		event.preventDefault();
		API.getUsers({ username: { $regex: this.state.query } }).then(results => {
			this.findFollowers(results.data);
		});
	};

	findFollowers = results => {
		let userdata = results.map(user => {
			return new Promise(function(res) {
				API.getfollowers({
					FollowingId: user._id,
				}).then(function(resultsOBJ) {
					let numfollowers = resultsOBJ.data.length;
					user["followers"] = numfollowers;
					res(user);
				});
			});
		});
		Promise.all(userdata).then(alldata => {
			this.findReviews(alldata);
		});
	};

	findReviews = results => {
		let userdata = results.map(user => {
			return new Promise(function(res) {
				API.getReviews({
					UserId: user._id,
				}).then(function(resultsOBJ) {
					let numReviews = resultsOBJ.data.length;
					user["reviews"] = numReviews;
					res(user);
				});
			});
		});
		Promise.all(userdata).then(alldata => {
			this.findIfFollowing(alldata);
		});
	};

	findIfFollowing = results => {
		let userdata = results.map(user => {
			return new Promise(res => {
				API.getfollowers({
					FollowerId: this.props.auth.user.id,
					FollowingId: user._id,
				}).then(resultsOBJ => {
					let isFollowing = "Follow";
					let className = "btn btn-primary";
					if (user._id === this.props.auth.user.id) {
						isFollowing = "Me";
						className = "d-none";
					} else if (resultsOBJ.data.length > 0) {
						isFollowing = "Unfollow";
						className = "btn btn-danger";
					}
					user["isFollowing"] = isFollowing;
					user["className"] = className;
					res(user);
				});
			});
		});
		Promise.all(userdata).then(alldata => {
			this.setState({ users: alldata });
		});
	};

	handleFollow = event => {
		event.preventDefault();
		let userid = event.target.getAttribute("userid");
		let usernum = null;
		let tempusers = this.state.users;
		for (let num in this.state.users) {
			if (this.state.users[num]._id === userid) {
				usernum = num;
			}
		}
		API.getfollowers({
			FollowerId: this.props.auth.user.id,
			FollowingId: userid,
		}).then(results => {
			if (results.data.length > 0) {
				API.deleteFollower(results.data[0]._id).then(resultsOBJ => {
					tempusers[usernum].followers -= 1;
					tempusers[usernum].isFollowing = "Follow";
					tempusers[usernum].className = "btn btn-primary";
					this.setState({ users: tempusers });
				});
			} else {
				API.addFollower({
					FollowerId: this.props.auth.user.id,
					FollowingId: userid,
				}).then(resultsOBJ => {
					tempusers[usernum].followers += 1;
					tempusers[usernum].isFollowing = "Unfollow";
					tempusers[usernum].className = "btn btn-danger";
					this.setState({ users: tempusers });
				});
			}
		});
	};

	render() {
		return (
			<div className="profiles">
				<form
					className="d-flex flex-column"
					type="submit"
					style={{ width: 100 + "%" }}
				>
					<h1>
						<strong>Foodies</strong>
					</h1>
					<div className="d-flex flex-row" style={{ flex: 1 }}>
						<Input
							className="d-flex flex-row"
							style={{ flex: 1, width: 100 + "%" }}
							value={this.state.query}
							onChange={this.handleInputChange}
							name="query"
							placeholder="Search by username..."
						/>
						<FormBtn
							className="d-flex flex-row justify-content-end search-btn"
							style={{ flex: 1, float: "right", padding: 5 }}
							// disabled={!this.state.query}
							onClick={this.handleClick}
						/>
					</div>
				</form>
				<div className="carddisplay">
					{this.state.users.map(user => (
						<ProfileCard
							id={user._id}
							imageurl={user.profilePic}
							name={user.displayname}
							username={user.username}
							key={user._id}
							followers={user.followers}
							reviews={user.reviews}
							follow={this.handleFollow}
							location={user.city + ", " + user.stateName}
							isFollowing={user.isFollowing}
							className={user.className}
						/>
					))}
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
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
)(Profiles);
