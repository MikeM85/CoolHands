import React from "react";

export function List({ children }) {
	return (
		<div className="list-overflow-container">
			<ul className="list-group">{children}</ul>
		</div>
	);
}

export function ListItem({ children }) {
	return <li className="list-group-item">{children}</li>;
}

// export default class Comment extends Component {
// 	state = {
// 		reviews: [],
// 		rating: "",
// 		comment: "",
// 		yelpid: "",
// 	};

// 	componentDidMount() {
// 		this.getReviews();
// 	}

// 	getReviews = () => {
// 		API.getReviews({ YelpId: this.state.yelpid }).then(reviews => {
// 			console.log(reviews);
// 		});
// 	};

// 	render() {
// 		return (
// 			<div className="card">
// 				<div className="row">
// 					<div className="col-md-2">
// 						<img
// 							className="comment-pic"
// 							src="https://picsum.photos/160"
// 							alt="profile"
// 						/>
// 						<div className="text-center">User Name</div>
// 					</div>
// 					<div className="col-md">
// 						<div>
// 							<div>Rating ★★★★</div>
// 							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
// 							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
// 							enim ad minim veniam, quis nostrud exercitation ullamco laboris
// 							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
// 							reprehenderit in voluptate velit esse cillum dolore eu fugiat
// 							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
// 							sunt in culpa qui officia deserunt mollit anim id est laborum.
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }
