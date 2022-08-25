const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let birthday = req.body.birthday;

    const user = new User({
        username: username,
        birthday: birthday
    });

    await user.setPassword(password);
    await user.save().then(result => {
        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, "Secret");

        res.json({
            "status": "success",
            "data": {
                "token": token
            }
        })
    }).catch(error => {
        res.json({
            "status": "error"
        })
    });
};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        if(!result.user){
            res.json({
                "status": "failed",
                "message": "Failed to login!"
            })
        }

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username
        }, "Secret");

        return res.json({
            "status": "success",
            "data": {
                "token": token
            }
        });
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        });
    });
};

module.exports.signup = signup;
module.exports.login = login;