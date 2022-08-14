const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bdaySchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    user: String,

})

const Bday = mongoose.model('Bday', bdaySchema);

module.exports = Bday;