const express = require('express')
const router = express.Router()

const {read, filter} = require('../controllers/nft')

router.get('/list', read)
router.post('/filter', filter)

module.exports  = router;