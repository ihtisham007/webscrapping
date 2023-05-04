const express = require('express');
const MobileControllers = require('./../controllers/MobileController');
const sessionMiddleware = require('./../middleware/sessionMiddleware');

const router = express.Router();

router
    .route('/')
    .get(sessionMiddleware.requireSession,MobileControllers.getMobileData)

router
    .route('/:id')
    .get(sessionMiddleware.requireSession,MobileControllers.mobileBrandPage)

module.exports = router;