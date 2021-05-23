var mongoose = require("mongoose");

var Schema = mongoose.Schema

var UserSchema = new Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

     username:{type:String},

    photo:{type:String}
    
},{timestamps:true})

module.exports = mongoose.model("User", UserSchema)