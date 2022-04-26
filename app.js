require("dotenv").config();
const client = require("./helpers/connectRedis");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const { errorHandle } = require("./helpers/errorHandle");
const auth = require("./middlewares/authMiddleware");
client.set("foo", "LeSyThanh");
client.get("foo", (err, result) => {
  if (err) throw createError.BadRequest();

  console.log(result);
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Router
app.use("/api", require("./routers/authRouter"));
app.use("/api", require("./routers/campaignRouter"));

app.all("*", (req, res, next) => {
  next(createError.NotFound("The router can not be found"));
});

//Error Handle
app.use(errorHandle);

// Connect MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

module.exports = app;
