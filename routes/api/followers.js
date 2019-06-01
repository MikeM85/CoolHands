const router = require("express").Router();
const followersController = require("../../controllers/followersController");

// Matches with "/api/followers"
router.route("/")
  .get(followersController.findAll)
  .put(followersController.findAll)
  .post(followersController.create);

// Matches with "/api/followers/:id"
router
  .route("/:id")
  .get(followersController.findById)
  .put(followersController.update)
  .delete(followersController.remove);

module.exports = router;
