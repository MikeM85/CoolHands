import React, { Component } from "react";
import RestaurantCard from "../components/cards/RestaurantCard";
import { FormBtn, Input } from "../components/search/Search";
import "./styles.css";
import API from "../utils/API";
// import { Link } from "react-router-dom";
// localhost:3000/search

class Restaurants extends Component {
	state = {
		restaurants: [],
		searchObj: {},
		searchVal: "",
		stateVal: "",
		cityVal: "",
		locationVal: {},
	};

	handleFormSubmit = event => {
		event.preventDefault();
		let location = this.state.cityVal + ", " + this.state.stateVal;
		let query = {
			term: this.state.searchVal,
			location: location,
			categories: "restaurants",
		};
		API.queryRestaurants(query).then(res => {
			this.setState({ restaurants: res.data });
		});
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	// takes state and city value and geocodes it to lat long
	handleGeocode = event => {
		this.handleInputChange(event);
		// let response;
		API.geocode(this.cityVal + this.stateVal).then(res => {
			this.setState({
				locationVal: res.data,
			});
		});
	};

	handleAutocomp = event => {
		this.handleInputChange(event);

		if (this.state.searchVal.length > 2) {
			API.autocomplete({
				text: this.state.searchVal,
				lat: this.state.locationVal.lat,
				lng: this.state.locationVal.lng,
			}).then(res => {
				this.setState({
					searchObj: {
						categories: res.data.categories,
						businesses: res.data.businesses,
						terms: res.data.terms,
					},
				});
			});
		} else {
			this.setState({ searchObj: {} });
		}
	};

	render() {
		return (
			<div className="searcher page-h">
				<div
					className="container d-flex flex-column"
					style={{ width: 100 + "%", height: 100 + "%" }}
				>
					<h1 className="white">Restaurants</h1>
					<div className="d-flex flex-row" style={{ flex: 1 }}>
						<div
							className="d-flex flex-row"
							style={{ flex: 1, width: 100 + "%" }}
						>
							<Input
								id="city"
								className="d-flex flex-row"
								style={{ flex: 1, width: 100 + "%" }}
								// value={this.state.query}
								// onChange={this.handleInputChange}
								name="cityVal"
								placeholder="City"
								value={this.state.cityVal}
								onChange={this.handleInputChange}
							/>
							<Input
								id="state"
								className="d-flex flex-row"
								style={{ flex: 1, width: 100 + "%" }}
								// value={this.state.query}
								// onChange={this.handleInputChange}
								name="stateVal"
								disabled={!this.state.cityVal}
								placeholder="State"
								value={this.state.stateVal}
								onChange={this.handleGeocode}
							/>
						</div>
						<Input
							className="d-flex flex-row"
							style={{ flex: 1, width: 100 + "%" }}
							value={this.state.searchVal}
							onChange={this.handleInputChange}
							name="searchVal"
							placeholder="Search for restuarants, bars..."
							disabled={!this.state.stateVal || !this.state.cityVal}
						/>
						<FormBtn
							className="d-flex flex-row justify-content-end search-btn"
							style={{ flex: 1, float: "right", padding: 5 }}
							disabled={!this.state.searchVal}
							onClick={this.handleFormSubmit}
						/>
					</div>

					<div
						className="d-flex flex-row my-2 carddisplay"
						style={{ height: 100 + "%" }}
					>
						<div
							className="col whiteback"
							style={{ height: 100 + "%", flex: 0.307, width: 100 + "%" }}
						>
							Sidebar filter searches, navigate to other pages..something
						</div>
						{this.state.restaurants.length ? (
							<div className="col carddisplay" style={{ width: 100 + "%" }}>
								{this.state.restaurants.map((restaurant, index) => {
									return (
										<RestaurantCard
											key={restaurant.id}
											id={restaurant.id}
											name={restaurant.name}
											link={restaurant.url}
											image={restaurant.image_url}
											rating={restaurant.rating}
											location={restaurant.coordinates}
											price={restaurant.price}
											address={restaurant.location.display_address}
											phone={restaurant.display_phone}
											distance={restaurant.distance}
											idx={index}
											category={restaurant.categories[0].title}
										/>
									);
								})}
							</div>
						) : (
							<div
								className="col "
								style={{ height: 100 + "%", flex: 1, width: 100 + "%" }}
							/>
						)}

						<div
							className="col whiteback"
							style={{ height: 100 + "%", flex: 0.4, width: 100 + "%" }}
						>
							AD SPACE
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Restaurants;
