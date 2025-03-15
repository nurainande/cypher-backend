const jwt = require('jsonwebtoken')
//This verifyToken is used for 3 major things;
// 1. To check if there is a TOKEN on the Cookies of the user's browser
// 2. To verify/make sure the TOKEN is valid if it is available 
// 3. To put the user id or details on the request
async function verifyToken(req, res, next) {
    try {
        const token = req.cookies?.token

        console.log("token in verifyToken", token)
        if (!token) {
            return res.status(200).json({
                message: "Please Login...!",
                error: true,
                success: false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
            console.log(err)
            console.log("decoded", decoded)

            if (err) {
                console.log("error auth", err)
            }

            req.userId = decoded?._id

            next()
        });


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        })
    }
}


module.exports = verifyToken