const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const fs = require("fs");
const { default: rateLimit } = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const UserModel = require("./model/user.model");
const path = require("path");
const app = express();

app.enable("trust proxy");

app.use(cors());
app.options("*", cors());

app.use(helmet());

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(morgan("combined", { stream: accessLogStream }));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());
app.use(compression());

app.get("/", async (req, res) => {
  const doc = await UserModel.find().sort({ createdAt: desc });
  res.json({
    data: doc,
  });
});
app.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    birthday,
    street,
    city,
    state,
    zip,
    email,
    password,
  } = req.body;
  const doc = await UserModel.create({
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    street: street,
    city: city,
    state: state,
    zip: zip,
    email: email,
    password: password,
  });
  res.json({
    data: doc,
  });
});

module.exports = app;
