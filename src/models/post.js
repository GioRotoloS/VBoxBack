const mongoose = require('mongoose');
 
const Company = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    connection_string: {
        server: String,
        port: Number,
        user: String,
        password: String,
        database: String
    },
    picture: {
        type: String
    },
    created_at: {
        type: String,
        required: true
    },
    cid: {
        type: String,
        required:true,
        unique: true
    }
});
 
module.exports = mongoose.model('Companies', Company);