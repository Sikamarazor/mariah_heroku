var mongoose = require('mongoose');

var RecipientSchema = new mongoose.Schema({ 
    R_Id : String,
    R_Name : String,
})

var Recipient = mongoose.model('Recipient',RecipientSchema);

module.exports = Recipient;