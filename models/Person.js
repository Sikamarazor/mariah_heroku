var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

/*var connection = mongoose.createConnection("mongodb://localhost/email");

autoIncrement.initialize(connection);*/

var PersonSchema = new mongoose.Schema({
    U_Name: {type:String,unique: true,required : true,dropDups : true},
    U_Pass : {type : String, required : true},
    F_Name : {type : String, required : true},
    L_Name :{type : String, required : true},
    ID_Number: { type: String, unique: true, required: true, dropDups: true},
    U_Country : {type : String, required : true},
    Age: { type: Number, required: true },
    Gender : {type : String, required : true},
    Contact_details : {
        Cell_no : {type:String,unique: true,required : true,dropDups : true},
        Email_address : {type:String,required : true},
    },
    Security_question : {
        question : {type : String, required : true},
        answer : {type : String, required : true},
    },


})
var Person = mongoose.model('Person',PersonSchema);

/*PersonSchema.plugin(autoIncrement.plugin, {
    model: 'Person',
    field: 'U_Id',
    startAt: 2000,
    incrementBy: 3
});
*/


module.exports = Person;
