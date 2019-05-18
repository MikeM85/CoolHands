const router = require("express").Router();
const confirmationController = require("../../controllers/confirmationController");

router.route("/")
  .post(confirmationController.resend)

router.route("/:token")
  .get(confirmationController.confirm)

module.exports = router;