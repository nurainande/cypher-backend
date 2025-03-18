const express = require('express')
const verifyToken = require('../middlewere/verifyToken')
const paymentController = require('../controllers/order/paymentController')
const orderModel = require('./../models/orderModel')

const router = express.Router()

router.post('/checkout',verifyToken,paymentController)

router.post('/get-order', async(req, res) => {
    try {
        const {email} = req.body
        console.log('email',email)
        // const orders = await orderModel.find({ email: 'nurainande@gmail.com' })
        const orders = await orderModel.find({ email:email })

        res.status(200).json({
            length: orders.length,
            data: orders,
            error: false,
            success: true,
            message: 'orders fetched successfully'
        })
    }
    catch (error) {
        // console.log('req.body',req.body)
        // const { email } = req.body
        // console.log('email query failed', email)
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
})

router.get('/all-orders', (req,res)=>{
    res.send('hello i am just testing')
})

router.route('/my-orders/:id').get(async(req,res)=>{
    const param = req.params.id
    console.log(param)
    console.log(`hello i am just testing with ${param}`)

    try {
        // const order = await orderModel.findById({ _id: '67d8343b12916c4c31da7c05' })
        const order = await orderModel.findById({ _id: param })

        res.status(200).json({
            data: order,
            error: false,
            success: true,
            message: 'order fetched successfully'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
})




module.exports = router;