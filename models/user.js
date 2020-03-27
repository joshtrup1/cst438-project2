var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

userSchema = new mongoose.Schema({
    username: String,
    password: String,
    itemsInCart: [
         {
             type:mongoose.Schema.Types.ObjectId,
             ref:"Item"
         }
     ],
    itemsCreated: [
        {
            type:mongoose.Schema.Types.ObjectId,
             ref:"Item"
        }
    ] 

});
userSchema.plugin(passportLocalMongoose);



module.exports = mongoose.model("User",userSchema);