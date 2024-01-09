const express = require("express");
const { getUsers, insertFakeUser } = require("../controller/userController");
const passport = require("passport");

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), getUsers);

router.post("/faker", insertFakeUser);

module.exports = router;
