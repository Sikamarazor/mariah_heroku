var mongoose = require('mongoose');

var InboxSchema = new mongoose.Schema({
    M_Id : String,
    U_Name : String,
    I_Message : String,
    Sender_Name : String,
    

})

var Inbox = mongoose.model('Inbox',InboxSchema);

module.exports = Inbox;
