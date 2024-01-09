const express = require("express");
const router = require("./routes/index");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({});
require("./utils/passport");

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

const mongodb_url = process.env.MONGO_URL;

app.listen(4000, async () => {
  await mongoose
    .connect(mongodb_url)
    .then((val) => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("Error:", err);
    });
  console.log("Server is listening to port 4000");
});

app.use((err, req, res, next) => {
  const status = err.status ?? 500;
  res.status(status).json({ message: err.message });
});

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});
