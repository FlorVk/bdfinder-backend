
const getAll = (req, res) => {
    bday.find({"user" : req.user.birthday}, (err, docs) => {
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
