const express = require('express')
const verifyToken = require('../middlewere/verifyToken')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/all-users', userController.getAllUsersController)

router.route('/all-users/:id').get(userController.getSingleUserController).patch(userController.updateController).delete(userController.deleteUserController)


router.post('/signup', userController.userSignUpController)
router.post('/signin', userController.userSignInController)
router.get('/signout', userController.userLogoutController)

router.get('/user-details', verifyToken, userController.userDetailsController)

module.exports = router;