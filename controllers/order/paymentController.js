const stripe = require('../../config/stripe')
const userModel = require('../../models/userModel')

const paymentController = async(request,response)=>{
    try {
        const  cartItems  = request.body
        console.log('CART-ITEMSss',typeof cartItems,cartItems)

        const user = await userModel.findOne({ _id : request.userId })

        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options : [
                {
                    shipping_rate: 'shr_1QDTF4P6msDdqKdeoqGxbEjT'
                }
            ],
            customer_email : user.email,
            metadata : {
                userId : request.userId
            },
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'ngn', // Currency as naira (or replace as per your setup)
                        product_data: {
                            name: item.productName, // The product name
                            images: [item.productImage], // The product image (array)
                            metadata: {
                                productId: item._id // Include any additional metadata
                            }
                        },
                        unit_amount: item.price * 100 // Price in cents (Stripe accepts the amount in the smallest currency unit)
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity // Quantity of the product
                };
            }),
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`
        };

        const session = await stripe.checkout.sessions.create(params)

        response.status(303).json(session)

    } catch (error) {
        response.json({
            message : error?.message || error,
            error : true,
            success : false,
            why:'paymentControlerError why'
        })
    }
}

module.exports = paymentController
