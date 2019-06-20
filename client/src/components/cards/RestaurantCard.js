import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
//import ph from "../../img/ph.png";
const RestaurantCard = props => {
	return (
		<div className="card d-flex flex-row whiteback">
			<div className="img-wrap d-flex justify-content-center">
				<img
					style={{ height: 100 + "px", width: 100 + "px" }}
					id={props.id}
					alt={props.id}
					src={props.image}
				/>
			</div>
			<div
				className="main-content d-flex flex-column justify-content-between"
				style={{ flex: 1, marginLeft: 5 }}
			>
				<div className="d-flex flex-row row1">
					<div style={{ flex: 1 }}>
						<p className="title">{props.name}</p>
					</div>

					<div
						className="d-flex flex-row justify-content-md-end muted"
						style={{ flex: 1 }}
					>
						<p>0.5 miles</p>
					</div>
				</div>

				<div className="d-flex flex-row" style={{ flex: 1 }}>
					<div className="d-flex flex-row row2" style={{ flex: 1 }}>
						<StarRatings
							rating={props.rating}
							starRatedColor="yellow"
							numberOfStars={5}
							name="rating"
							starDimension="25px"
							starSpacing="5px"
						/>

						<div
							className="d-flex flex-row justify-content-end muted"
							style={{ flex: 1 }}
						>
							<p>{props.price}</p>
						</div>
					</div>
				</div>

				<p>{props.category}</p>

				<div className="d-flex flex-row" style={{ flex: 1 }}>
					<div className="d-flex flex-row" style={{ flex: 1 }}>
						<p className="muted" style={{ width: 100 + "%" }}>
							{props.address}
						</p>

						<Link
							to={{
								pathname: "/search/id",
								state: { yelpId: props.id },
							}}
							className="btn btn-dark justify-content-end"
							style={{ float: "right", margin: 1 }}
						>
							More Info
						</Link>
					</div>
				</div>
			</div>

			<p />
		</div>
	);
};

export default RestaurantCard;

//removed so the page wouldn't break while designing

// placeholder="Name"
// name="name"
// type="name"
// value={this.state.name}
// onChange={this.onChange}
// error={errors.name}
