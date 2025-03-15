const express = require('express')
// const verifyToken = require('../middlewere/verifyToken')
const productController = require('../controllers/productController')

const router = express.Router()

router.route('/').post(productController.createProductController).patch(productController.updateProductController).get(productController.getAllProductsController)

router.route('/:id').get(productController.getSingleProductController).patch(productController.updateProductController).delete(productController.deleteProductController)

router.route("/category/:category").get(productController.getProductsByCategoryController)


module.exports = router