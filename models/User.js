var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    
    U_Id : {type : String},
    U_Name: {type : String, required : true},
    U_Pass : {type : String, required : true},

})
var User = mongoose.model('User',UserSchema);

module.exports = User;
