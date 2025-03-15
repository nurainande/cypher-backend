const express = require('express')
const verifyToken = require('../middlewere/verifyToken')
const paymentController = require('../controllers/order/paymentController')

const router = express.Router()

router.post('/checkout',verifyToken,paymentController)





module.exports = router;