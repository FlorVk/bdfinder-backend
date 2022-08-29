const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

//const indexRouter = require("./routes/indexRoute");
const usersRouter = require("./routes/usersRoute");
const apiBdayRouter = require("./routes/api/v1/bday");
const chatRouter = require("./routes/chatRoute");
const passport = require("./passport/passport");

const mongoose = require("mongoose");
try {
  mongoose.connect(
    "mongodb+srv://admin:admin@bdayflor.llax4ck.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
//app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(
  "/api/v1/bday",
  passport.authenticate("jwt", { session: false }),
  apiBdayRouter
);
app.use("/auth", usersRouter);
app.use("/chat", chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;