import React, { Component } from "react";

export default class UserReview extends Component {
	render() {
		return (
			<div className="card">
				<div className="row">
					<div className="col-md-3">
						<img
							className="restaruant-pic"
							src="https://picsum.photos/160"
							alt="restaurant"
						/>
					</div>
					<div className="col-md">
						<h3>Restaurant Name</h3>
						<div>Address</div>
						<div># of Reviews by Follows</div>
						<div>Yelp Rating</div>
						<div>Foodbook Rating</div>
					</div>
				</div>
			</div>
		);
	}
}
