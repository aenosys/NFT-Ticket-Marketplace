const express = require('express');
const router = express.Router();

const { create, categoryById, read, list } = require('../controllers/category');

router.get('/category/:categoryId', read);
router.post('/category/create', create);
router.get('/categories', list);

router.param('categoryId', categoryById);

module.exports = router;