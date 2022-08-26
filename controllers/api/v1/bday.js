const User = require("../../../models/User");

const getBirthdayUsers = (req, res) => {
  const date = req.params.birthday;
  console.log(date);
  const dateObj = Date.parse(req.params.birthday);
  console.log(dateObj);
  const users = User.find({ birthday: dateObj })
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

module.exports.getBirthdayUsers = getBirthdayUsers;