const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname: String,
    email:{type:String, required:true, unique:true},
    phone:String,
    password:String,
    confirmPassword:String
});
module.exports = mongoose.model('User', userSchema);