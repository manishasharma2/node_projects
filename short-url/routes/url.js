const express = require('express');
const {
    generateShortUrl,
    getAnalytics,
    originalURL
} = require('../controllers/url');

const { get } = require('mongoose');
const router = express.Router();

router.post('/',generateShortUrl)
router.get('/analytics/:id', getAnalytics)
router.get('/:id',originalURL)

module.exports = router;