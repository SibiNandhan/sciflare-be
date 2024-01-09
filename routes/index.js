const express = require("express");
const authRoute = require("./authRoutes");
const orgRoute = require("./organizationRoutes");
const userRoute = require("./userRoutes");

const router = express();

router.use("/auth", authRoute);

router.use("/org", orgRoute);

router.use("/user", userRoute);

module.exports = router;
