const User = require("../models/user")
const _ = require('lodash');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.signup = async(req, res) => {
    const user = new User(req.body)
    await user.save((error, user) => {
        if (error) {
            console.log(error)
            return res.status(400).json({
              error: "Username is taken"
          })
        }
        res.json({
            user
        })
    })
}

exports.signin = async(req, res) => {
    const { walletAddress } = req.body;
    await User.findOne({ walletAddress }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that wallet address does not exist. Please signup'
            });
        }
        const { _id, name, walletAddress, photo} = user;
        return res.json({user: { _id, walletAddress, name,photo} });
    });
};