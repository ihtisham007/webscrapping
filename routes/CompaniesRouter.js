const express = require('express');
const MobileControllers = require('./../controllers/MobileController');

const router = express.Router();

router
    .route('/')
    .get(MobileControllers.getMobileData)

router
    .route('/:id')
    .get(MobileControllers.mobileBrandPage)

module.exports = router;