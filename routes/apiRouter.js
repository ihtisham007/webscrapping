const express = require('express');
const apiController = require('./../controllers/apiController');

const router = express.Router();

router
    .route('/mobile-companies')
    .get(apiController.mobileCompaines)
    .post(apiController.saveCompany)

router
    .route('/search')
    .get(apiController.searchSingleBrand);

router
    .route('/mobile-company/:id')
    .get(apiController.getBrandData)

router
    .route('/single-mobile/:id')
    .get(apiController.getSingleBrandData)

module.exports = router;