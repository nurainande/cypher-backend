const express = require('express')
const verifyToken = require('../middlewere/verifyToken')
// const paymentController = require('../controllers/paymentController')

const router = express.Router()

// router.post('/pay', paymentController )
router.get('/',(req,res)=>{
    res.send('Payment Page')
    //res.send(req.headers)
})




module.exports = router;