const userModel = require('../models/userModel')
const stripe = require('../config/stripe')

const paymentController = async(request,response) => {
    try {
        const { cartItem } = request.body 

        const user = await userModel.findOne({_id: request.userId})
        const params = {
            submit_type:'pay',
            mode:'payment',
            paymnet_method_type: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1QDTF4P6msDdqKdeoqGxbEjT' 
                },
            ],
            customer_email: user.email,
            line_items: cartItem.map((item,index)=>{
                return {
                    price_data: {
                        currency: 'ngn',
                        product_data: {
                            name: item.productName,
                            images: [item.productImage],
                            unit_amount: item.price * 100
                        },
                        quantity: item.quantity
                    },
                    description: item.productDescription,
                    currency: 'ngn',
                    quantity: item.quantity,
                    type: 'sku',
                    parent: item.productId
                }
            })
        }
        const session = await stripe.checkout.sessions.create(params)
        response.status(303).json(session)
    } catch (error) {
        response.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = paymentController