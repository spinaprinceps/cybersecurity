const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});


const clientModel = mongoose.model('User', UsersSchema, 'user');

module.exports = clientModel;
