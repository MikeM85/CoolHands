const db = require("../models");
const validateReviewInput = require("../validation/review");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Review.find(req.body)
      .sort({ changedate: -1 })
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Review
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const {errors, isValid} = validateReviewInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    };

    db.Review.find({UserId: req.body.UserId}).then(review => {
      if (review.length>0) {
        errors.review = "User has already submitted review for this Restaurant";
				return res.status(400).json(errors);
      } else {
        db.Review.create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
    })
    
  },
  update: function(req, res) {
    db.Review.findOneAndUpdate(
      { _id: req.params.id },
      {
        YelpId: req.body.YelpId,
        UserId: req.body.UserId,
        review: req.body.review,
        rating: req.body.rating,
        changedate: Date.now()
      }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Review
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
