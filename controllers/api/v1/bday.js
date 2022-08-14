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

module.exports.getAll = getAll;
