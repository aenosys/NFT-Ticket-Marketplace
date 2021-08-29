const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
 {
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    photo:{
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        trim: true,
        required: true
    }
 },
    {timestamps: true}
)

module.exports = mongoose.model('User', userSchema);