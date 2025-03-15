const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const paymentRouter = require('./routes/paymentRoutes');

const webhook = require('./controllers/order/webhook');
const webhooks = require('./controllers/order/webhook');

// Dotenv
dotenv.config();



const app = express();



app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

// app.use(cors())


app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); //parse body


// Endpoint to create a checkout session
app.post('/api/create-checkout-session', async (req, res) => {
    const { items, userId } = req.body;

    const lineItems = items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: {
                userId: userId,
            },
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Endpoint to handle successful payment
app.get('/api/checkout-success', async (req, res) => {
    const sessionId = req.query.session_id;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const userId = session.metadata.userId;

        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
        const items = lineItems.data.map(item => ({
            productId: item.price.product,
            quantity: item.quantity,
            price: item.amount_total / 100,
        }));

        const newOrder = new Order({
            userId,
            items,
            totalAmount: session.amount_total / 100,
            paymentStatus: 'Paid',
            paymentId: session.id,
        });

        await newOrder.save();
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/webhook',webhooks)

app.use('/api/v1/user', userRouter )
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/payment', paymentRouter)


module.exports = app;