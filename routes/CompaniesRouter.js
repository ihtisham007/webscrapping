const express = require('express');
const MobileControllers = require('./../controllers/MobileController');
const sessionMiddleware = require('./../middleware/sessionMiddleware');

const router = express.Router();

router
    .route('/')
    .get(sessionMiddleware.requireSession,MobileControllers.getMobileData)

router
    .route('/search')
    .get(sessionMiddleware.requireSession,MobileControllers.searchBrand);

router
    .route('/:id')
    .get(sessionMiddleware.requireSession,MobileControllers.mobileBrandPage);

//single page


router
    .route('/singlepage/:id')
    .get(sessionMiddleware.requireSession,MobileControllers.singleBrandPage)



module.exports = router;