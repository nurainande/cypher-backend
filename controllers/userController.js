const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");



 exports.userSignUpController = async (req, res) => {
    try {
        const { email, password, name } = req.body
        console.log(req.body)

        const user = await userModel.findOne({ email })

        console.log("user", user)

        if (user) {
            throw new Error("Already user exits.")
        }

        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }
        if (!name) {
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role: "user",
            password: hashPassword
        }

        // const saveUser = await userModel.create(payload)
        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfully!"
        })


    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}



exports.userSignInController = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)

        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }

        const user = await userModel.findOne({ email })
        console.log(user)

        if (!user) {
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        console.log("checkPassoword", checkPassword)

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 2 });
            console.log('token', token)

            // ======Initial one======

            // const tokenOption = {
            //     httpOnly: true,
            //     secure: true
            // }

            // res.cookie("token", token, tokenOption).status(200).json({
            //     message: "Login successfully",
            //     data: token,
            //     success: true,
            //     error: false
            // })

            // ======ends here======

            res.cookie("token", token, {
                httpOnly: true, // Prevents XSS attacks
                secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Allow cross-site cookies
                maxAge: 3600000, // 1 hour expiry
            });

            res.status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            });

        } else {
            throw new Error("Please check Password")
        }


    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }

}

exports.userLogoutController = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        // path: '/'
    });
    res.status(200).json({
        message: 'Logout successfully',
        success: true
    });
};


exports.userDetailsController = async(req, res) => {
    try {
        console.log("userId", req.userId)
        const user = await userModel.findById(req.userId)
        console.log(user)

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details"
        })

        console.log("user", user)

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


exports.getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json({
            length: users.length,
            data: users,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

exports.getSingleUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        console.log(req.params.id)
        res.status(200).json({
            data: user,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

exports.updateController = async(req,res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log(req.params.id)
        res.status(200).json({
            data: user,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
 
}

exports.deleteUserController = async (req,res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        console.log(req.params.id)
        res.status(200).json({
            message: "User deleted successfully",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

exports.updateBalController = async (req,res) => {
    try {
        const user = await User.findAndUpdate({name:'nurain'},{$set:{surname:'ande'}})
    } catch (error) {
        
    }
}