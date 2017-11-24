var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    M_Id : String,
    Receiver_Name : String,
    subject: String,
    I_Message : String,
    Sender_Name : String,
})

var Message = mongoose.model('Message',MessageSchema);

module.exports = Message;
