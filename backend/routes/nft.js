const express = require('express')
const router = express.Router()

const {read, filter, getToken, getData, relatedNft} = require('../controllers/nft')

router.get('/list', read)
router.post('/filter', filter)
router.get('/nft/:address', getToken)
router.get('/token/:id/:category', getData)
router.get('/related/:category', relatedNft)

module.exports  = router;