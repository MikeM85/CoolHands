const Validator = require("validator");
const isEmpty =  require("./is-empty.js");

module.exports = function validateReviewInput(data) {
    let errors = {};

    //data.rating = !isEmpty(data.rating) ? data.rating : "";
    data.review = !isEmpty(data.review) ? data.review : "";

    // if (Validator.isEmpty(data.rating)) {
    //     errors.rating = "Rating field is required";
    // }

    if (Validator.isEmpty(data.review)) {
        errors.review = "Review field is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}