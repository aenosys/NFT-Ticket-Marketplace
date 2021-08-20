const express = require('express')
const router = express.Router()

const {signup,signin} = require('../controllers/user')
const {userSignupValidator} = require("../validator")

router.post("/user/signup", userSignupValidator, signup)
router.post("/user/login", signin)

module.exports  = router;