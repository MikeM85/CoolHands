import axios from "axios";

export default {
	queryRestaurants: function(query) {
		return axios.put("/api/query", query);
	},
	getfollowers: function(query) {
		return axios.put("/api/followers/", query);
	},
	followUser: function(query) {
		return axios.post("/api/followers/", query);
	},
	addRestaurant: function(restaurantData) {
		return axios.post("/api/restaurants", restaurantData);
	},
	getRestaurants: function(restaurantData) {
		return axios.put("/api/restaurants", restaurantData);
	},
	addReview: function(reviewData) {
		return axios.post("/api/reviews", reviewData);
	},
	getReviews: function(reviewData) {
		return axios.put("/api/reviews", reviewData);
	},
	deleteReview: function(reviewId) {
		return axios.delete("/api/reviews/" + reviewId);
	},
	deleteRestaurant: function(restaurantID) {
		return axios.delete("/api/restaurants/" + restaurantID);
	},
	updateReview: function(reviewOBJ) {
		return axios.put("/api/reviews/" + reviewOBJ._id, reviewOBJ);
	},
	updateRestaurant: function(restaurantOBJ) {
		return axios.put("/api/restaurants/" + restaurantOBJ._id, restaurantOBJ);
	},
	updateUser: function(userOBJ) {
		return axios.put("/api/users/" + userOBJ._id, userOBJ);
	},
	getUsers: function(userOBJ) {
		return axios.put("/api/users/", userOBJ);
	},
	getOneUser: function(userOBJ) {
		return axios.get("/api/users/" + userOBJ._id);
	},
	deleteFollower: function(followerId) {
		return axios.delete("/api/followers/" + followerId);
	},
	autocomplete: function(searchTxt) {
		return axios.post("/api/autocomp", searchTxt);
	},
	geocode: function(location) {
		return axios.post("/api/geocode", location);
	},
	addFollower: function(followerOBJ) {
		return axios.post("/api/followers", followerOBJ);
	},
	searchId: function(yelpId) {
		return axios.put("/api/searchId", yelpId);
	},
};

//searchId;