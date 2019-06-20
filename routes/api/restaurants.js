const router = require("express").Router();
const restaurantController = require("../../controllers/restaurantsController");

// Matches with "/api/restaurants"
router.route("/")
  .get(restaurantController.findAll)
  .put(restaurantController.findAll)
  .post(restaurantController.create);

// Matches with "/api/restaurants/:id"
router
  .route("/:id")
  .get(restaurantController.findById)
  .put(restaurantController.update)
  .delete(restaurantController.remove);

module.exports = router;
