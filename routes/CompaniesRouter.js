const express = require('express');
const router = express.Router();

router.get('/api', (req,res,next)=>{
    res.json({
        "msg": "yes"
    })
})

module.exports = router;