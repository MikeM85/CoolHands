const router = require("express").Router();
const restaurantRoutes = require("./restaurants");
const reviewRoutes = require("./reviews");
const userRoutes = require("./users");
const queryRoutes = require("./query");
const followerRoutes = require("./followers");
const autocompRoutes = require("./autocomp");
const geocodeRoutes = require("./geocode");
const searchRoutes = require("./searchId");
const confirmationRoutes = require("./confirmation");


router.use("/restaurants", restaurantRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);
router.use("/query", queryRoutes);
router.use("/followers", followerRoutes);
router.use("/autocomp", autocompRoutes);
router.use("/geocode", geocodeRoutes)
router.use("/searchId",searchRoutes);
router.use("/confirmation", confirmationRoutes);

module.exports = router;
