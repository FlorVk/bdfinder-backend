const Bday = require('../../../models/Bday');

const getAll = (req, res) => {
    bday.find({"bday" : "25-11-1998"}, (err, docs) => {
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "bdays": docs
                }
            });
        }
    });
}

const getBirthdays = (req, res) => {
    let dateObj = req.user.birthday;
    let birthday = dateObj.toString();
    res.render(
        "birthday",
        {
            id: req.params.birthday
        },
        {
            user: req.user.username,
            birthday: birthday,
        }
    );
}

module.exports.getAll = getAll;
module.exports.getBirthdays = getBirthdays;
