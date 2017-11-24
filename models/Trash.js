var mongoose = require('mongoose');

var TrashSchema = new mongoose.Schema({
    T_Id : String,
    S_Name : String,
    T_Message : {
        to : {type : String, required : true},
        subject : {type : String, required :  true},
        Message : {type : String},
        sent_date : {type : Date, default : Date.now}
    },
})

var Trash = mongoose.model('Trash',TrashSchema);

module.exports = Trash;