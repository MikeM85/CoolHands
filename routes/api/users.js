const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("passport");
const jwt = require('jsonwebtoken');

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .put(usersController.findAll);

// Matches with "/api/users/current"
router.route("/current")
  .get(passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
});

//Matches with "/api/users/register"
router.route("/register")
  .post(usersController.create);

router.route("/login")
  .post(usersController.login);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
