const router = require("express").Router();
const API = require("../utils/API");


//CURRENT FUNCTION just returns YELP data to use to autocomplete 
router.route("/").post(function(req, res) {
    API.geocode(req.body)
        .then((results) => {
            res.send(results.data.results[0].geometry.location)
        }).catch( err => console.log(err))
});

module.exports = router;