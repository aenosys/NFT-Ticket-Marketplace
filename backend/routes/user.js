const express = require('express')
const router = express.Router()

const {signup,signin, login} = require('../controllers/user')
const {userSignupValidator} = require("../validator")

router.post("/user/signup", userSignupValidator, signup)
router.post("/user/login", login)
router.post('/user/signin', signin)

module.exports  = router;