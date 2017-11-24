var mongoose = require('mongoose');

var SentSchema = new mongoose.Schema({
    
    S_Id : String,
    from : String,
    S_Message : [{
        to : {type : String, required : true},
        subject : {type : String, required :  true},
        message : {type : String},
        sent_date : {type : Date, default : Date.now}
    }],
})

var Sent = mongoose.model('Sent',SentSchema);

module.exports = Sent;