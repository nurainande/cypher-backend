const productModel = require("../models/productModel")

exports.createProductController = async (req, res) => {
    try {
        const newProduct = new productModel(req.body)
        const savedProducts = await newProduct.save()

        res.status(201).json({
            message:'Products uploaded successfully',
            error: false,
            success: true,
            data: savedProducts
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

exports.updateProductController = async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({
            message: 'Product updated successfully',
            error: false,
            success: true,
            data: updatedProduct
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

exports.getAllProductsController = async (req,res) => {
    try {
        const products = await productModel.find()
        res.status(200).json({
            length: products.length,
            data: products,
            error: false,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

exports.getSingleProductController = async (req,res) => {
    try {
        const product = await productModel.findById(req.params.id)
        res.status(200).json({
            data: product,
            error: false,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

exports.getProductsByCategoryController = async (req, res) => {
    try {
        const products = await productModel.find({category: req.params.category})
        console.log(req.params.category)
        res.status(200).json({
            length: products.length,
            data: products,
            error: false,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

exports.deleteProductController = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Product deleted successfully',
            error: false,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}