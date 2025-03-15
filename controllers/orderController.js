const orderModel = require("../models/orderModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



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