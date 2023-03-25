const mongoose = require('mongoose');
const uri = process.env.CONNECTION_STRING_VBOXDB;

mongoose.set('strictQuery', false)
const db = async () => {
    await mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, (err) => {
        if(!err){
            console.log("Connected to db")
        } else {
            console.log("ERROR => connection", err)
        }
    })
}

module.exports = db;
