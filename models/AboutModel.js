const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({

    description: {
        type: String,
        required: true
    },
});

module.exports = {About: mongoose.model('about', AboutSchema )};