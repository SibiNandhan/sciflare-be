const express = require("express");
const {
  login,
  signup,
  createAdminWithOrganization,
} = require("../controller/authController");
const passport = require("passport");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/org-admin", createAdminWithOrganization);

module.exports = router;
