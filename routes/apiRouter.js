const express = require('express');
const apiController = require('./../controllers/apiController');

const router = express.Router();

router
    .route('/mobile-companies')
    .get(apiController.mobileCompaines)
    .post(apiController.saveCompany)

module.exports = router;