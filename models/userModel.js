const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add the username']
    },
    email: {
        type: String,
        required: [true, 'Please add the email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add the password'],
        minlength: 6
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);