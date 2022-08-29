const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let birthday = Date.parse(req.body.birthday);

  const userCredentials = {
    username: username,
    password: password,
    birthday: birthday,
  };
  console.log(userCredentials);

  const user = new User({
    username: username,
    birthday: birthday,
  });

  console.log(user);

  await user.setPassword(password);
  await user
    .save()
    .then((result) => {
      let token = jwt.sign(
        {
          uid: result._id,
          username: result.username,
        },
        "Secret"
      );

      res.json({
        status: "success",
        data: {
          token: token,
        },
      });
    })
    .catch((error) => {
      res.json({
        status: "error",
      });
    });
};

const login = async (req, res, next) => {
  const user = await User.authenticate()(req.body.username, req.body.password)
    .then((result) => {
      if (!result.user) {
        res.json({
          status: "failed",
          message: "Failed to login!",
        });
      }

      let token = jwt.sign(
        {
          uid: result.user._id,
          username: result.user.username,
        },
        "Secret"
      );

      return res.json({
        status: "success",
        data: {
          token: token,
        },
      });
    })
    .catch((error) => {
      res.json({
        status: "error",
        message: error,
      });
    });
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find({})
    .then((result) => {
      return res.json({
        status: "success",
        data: result,
      });
    })

    .catch((error) => {
      res.json({
        status: "error",
        message: error,
      });
    });
};

const getAllUsersWithBirthday = async (req, res, next) => {
  let reqBirthday = Date.parse(req.body.birthday);
  console.log(reqBirthday);
  const users = await User.find({ birthday: reqBirthday })
    .then((result) => {
      return res.json({
        status: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.json({
        status: "error",
        message: error,
      });
    });
};

const getBirthdays = async (req, res, next) => {
  let dateObj = req.params.birthday;
  console.log(dateObj);
};

const getUserFromJWT = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);
  let user = jwt.verify(token, "Secret");
  console.log(user);
  const userFromDb = await User.findOne({ username: user.username })
  console.log(userFromDb)
  res.json({
    status: "success",
    data: userFromDb
  });
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.getAllUsers = getAllUsers;
module.exports.getAllUsersWithBirthday = getAllUsersWithBirthday;
module.exports.getBirthdays = getBirthdays;
module.exports.getUserFromJWT = getUserFromJWT;