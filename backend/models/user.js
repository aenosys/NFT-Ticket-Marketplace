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

// virtual field
userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};


module.exports = mongoose.model('User', userSchema);