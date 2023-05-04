const express = require('express');
const MobileControllers = require('./../controllers/MobileController');

const router = express.Router();

router.get('/', MobileControllers.getMobileData)

module.exports = router;