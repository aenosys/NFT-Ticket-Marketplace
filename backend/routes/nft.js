const express = require('express')
const router = express.Router()

const {read, filter, getToken} = require('../controllers/nft')

router.get('/list', read)
router.post('/filter', filter)
router.get('/nft/:address', getToken)

module.exports  = router;