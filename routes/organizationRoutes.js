const express = require("express");
const {
  createOrganization,
  getOrganization,
  getUserOrganization,
} = require("../controller/organizationController");
const passport = require("passport");
const { isAdmin } = require("../controller/authController");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  createOrganization
);

router.get("/", getOrganization);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getUserOrganization
);

module.exports = router;
