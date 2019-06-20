const router = require("express").Router();
const reviewsController = require("../../controllers/reviewsController");

// Matches with "/api/books"
router.route("/")
  .get(reviewsController.findAll)
  .put(reviewsController.findAll)
  .post(reviewsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(reviewsController.findById)
  .put(reviewsController.update)
  .delete(reviewsController.remove);

module.exports = router;
