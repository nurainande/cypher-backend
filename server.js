const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')


// Dotenv if the file is = config.env
// dotenv.config({ path: './config.env' });

// Dotenv
dotenv.config();

// MongoDb database
const DB = process.env.CONNECTION_STRING
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB connection sucessfull')).catch(err => console.log('cant connect to database'));
console.log('FRONTEND',process.env.FRONTEND_URL)

// App listen
const port = 8080;
app.listen(port, err => {
    if (err) {
        console.log(err)
    }
    console.log(`App is running on port ${port}`);
    console.log('Starting', process.env.LOCAL_CLIENT_URL)
});


