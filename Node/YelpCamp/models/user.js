var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//schema setup
var userSchema = new mongoose.Schema({
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongoose); //takes care of hashing passwords & salt & everything

User = mongoose.model("User", userSchema);
module.exports = User;