const User = require("../models/user")
const _ = require('lodash');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); 

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

exports.login = async(req, res) => {
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

exports.signin = (req, res) => {
    // find the user based on email
    const { name, password } = req.body;
    User.findOne({ name }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // if user is found make sure the name and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Name and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, role } = user;
        return res.json({ token, user: { _id, name, role }});
    });
};