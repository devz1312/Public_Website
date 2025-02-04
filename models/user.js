const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{type:String,required:true,unique:true},
    password: String,
    articleshipFirm: String,
    caFinalAttempt: String,
});



module.exports = mongoose.model('User', userSchema);
