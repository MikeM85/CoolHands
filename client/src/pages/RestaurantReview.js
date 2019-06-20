import React, { Component } from "react";
import ReviewCard from "../components/cards/ReviewCard";
import "./styles.css";
import CommentForm from "../components/comments/CommentForm";
import API from "../utils/API";
import { Row, Col, Container } from "../components/grid/index";
import { getCurrentProfile } from "../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditForm from "../components/comments/EditForm";
import { FormBtn } from "../components/Form/index";
import StarRatings from "react-star-ratings";

class Restaurants extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			comment: "",
			restaurant: {},
			searchObj: {},
			searchVal: "",
			stateVal: "",
			cityVal: "",
			locationVal: {},
			yelpId: "",
			reviews: [],
			yourReviews: [],
			thisReview: {},
			modalState: "hide-modal",
			editContentClass: "modal-content-edit d-none",
			deleteContentClass: "modal-content-delete d-none"
		};
		this.getReviews = this.getReviews.bind(this);
	}
	
	componentDidMount() {
		this.props.getCurrentProfile();
		var temp = { id: this.props.location.state.yelpId };
		API.searchId(temp).then(res => {
			let categories = "";
			let location = "";
			for (let i in res.data.categories) {
				if (i !== '0') {
					categories += ", " + res.data.categories[i].title
				} else {
					categories += res.data.categories[i].title
				}
			}
			for (let i in res.data.location.display_address) {
				if (i !== '0') {
					location += ", " + res.data.location.display_address[i]
				} else {
					location += res.data.location.display_address[i]
				}
			}
			this.setState({
				restaurant: res.data,
				categories: categories,
				address: res.data.location.display_address,
				location: location,
				maplink: "https://maps.google.com/?q=" + location,
				phone: res.data.display_phone,
				url: res.data.url
			});
			this.getReviews();
		});
	}

	getReviews = () => {
		API.getReviews({ YelpId: this.props.location.state.yelpId })
			.then(reviews => {
				let total = 0;
				let count = 0;
				let average = 0;
				for (let i in reviews.data) {
					if (reviews.data[i].UserId === this.props.auth.user.id) {
						reviews.data[i]["className"] = "deletebtn"
						reviews.data[i]["editClass"] = "editbtn"
						
					} else {
						total += reviews.data[i].rating;
						count++;
						reviews.data[i]["className"] = "d-none"
						reviews.data[i]["editClass"] = "d-none"
					}
				}
				if (count > 0) {
					average = total/count;
				}
				
				this.setState({
					numReviews: reviews.data.length,
					yourReviews: reviews.data,
					restaurantavg: average,
					restaurantreviewcount: count
				});
				
			})
			.catch(error => console.log(error));
	};

	deleteReview = event => {
		event.preventDefault();
		let reviewID = event.target.getAttribute("reviewid")
    this.setState({
      deleteContentClass: "modal-content-delete showContent",
      modalState: "show-modal",
      reviewID: reviewID
    })
	}

	confirmDelete = (event) => {
		event.preventDefault();
		API.deleteReview(this.state.reviewID).then(() => {
				this.setState({
			yourReviews: [],
			modalState: "hide-modal",
			editContentClass: "modal-content-edit d-none",
			deleteContentClass: "modal-content-delete d-none"
		});
				this.getReviews();
			});
	}

	editReview = event => {
		event.preventDefault();
		let reviewID = event.target.getAttribute("reviewid");
		API.getReviews({_id: reviewID}).then(review => {
			this.setState({
				thisReview: review.data[0],
        modalState: "show-modal",
        editContentClass: "modal-content-edit showContent"
			})
		});
  }
  
  closeModal = (event) => {
    if (typeof(event) !== "undefined") {
      event.preventDefault();
    }
    this.setState({
      modalState: "hide-modal",
      editContentClass: "modal-content-edit d-none",
      deleteContentClass: "modal-content-delete d-none"
    })
    this.getReviews();
  };


	render() {
		const passProp = this.props.location.state.yelpId;
		const restaurant = this.state.restaurant;
		return (
			<div className="page-h dark-overlay">
				<form className="d-flex flex-column" style={{ width: 100 + "%" }}>
					<div className="d-flex flex-row" style={{ flex: 1 }} />
				</form>
				<Container>
					<Row>
						<Col size="md-12">
							<div className="container datapage">
								<div>
									<h3>{this.state.restaurant.name}</h3>
									<h6>Yelp Rating: 
										<StarRatings
											rating={this.state.restaurant.rating}
											starRatedColor="red"
											numberOfStars={5}
											name="rating"
											starDimension="20px"
											starSpacing="3px"
										/> <em>({this.state.restaurant.review_count} reviews)</em>
									</h6>
									<h6>Following Rating: 
										<StarRatings
											rating={this.state.restaurantavg}
											starRatedColor="blue"
											numberOfStars={5}
											name="rating"
											starDimension="20px"
											starSpacing="3px"
										/> <em>({this.state.restaurantreviewcount} reviews)</em>
									</h6>
									<h6>{this.state.restaurant.price} • {this.state.categories}</h6>
									<img className="restaurantimg" src={this.state.restaurant.image_url} alt=""></img>

									<div className="contact">
										<h6>Location: <a href={this.state.maplink} target="_blank" rel="noopener noreferrer">{this.state.location}</a></h6>
										<h6>Phone: {this.state.phone}</h6>
										<h6><a href={this.state.url} target="_blank" rel="noopener noreferrer">Website</a></h6>
									</div>	
									<div className="floatright">


									</div>						
								</div>
								<CommentForm
									restaurantName = {this.state.restaurant.name}
									passProp={passProp} />
							</div>
						</Col>
					</Row>

					<Row>
						<Col size="md-12" className="carddisplay">
							<div className="carddisplay">
								{this.state.yourReviews.map(yourReview => (
									<ReviewCard
										id={yourReview.UserId}
										name={restaurant.name}
										key={yourReview._id}
										username = {yourReview.username}
										displayname = {yourReview.displayname}
										rating={yourReview.rating}
										review={yourReview.review}
										myClass={yourReview.className}
										deletebtn={this.deleteReview}
										reviewid={yourReview._id}
										editClass={yourReview.editClass}
										editreview={this.editReview}
									/>
								))}
							</div>
						</Col>
					</Row>
				</Container>
				<div id="modal" className={this.state.modalState}>
          <div id="dashboardmodel" className={this.state.editContentClass}>
            <Col size="md-12">
              <h3>{this.state.thisReview.restaurantname}</h3>
							<EditForm
							review = {this.state.thisReview}
							closeModal={this.closeModal}
							refreshFunction={this.getReviews}
							 />
						</Col>
          </div>
          <div id="verifydelete" className={this.state.deleteContentClass}>
          <h3>Delete Review?</h3>
          <br/>
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
			</div>
		);
	}
}

Restaurants.propTypes = {
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
)(Restaurants);


