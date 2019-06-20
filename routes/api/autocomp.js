const router = require("express").Router();
const API = require("../utils/API");


//CURRENT FUNCTION just returns YELP data to use to autocomplete 
router.route("/").post(function(req, res) {
    API.autocomp(req.body)
        .then((results) => {
            res.send(results.data)
        }).catch( err => console.log(err))
});

module.exports = router;