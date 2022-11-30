const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const reveiwController = require('../controllers/reviewController')
const userController = require('../controllers/userController')



router.post('/register',userController.createUser)
router.post('/login',userController.userLogin)








module.exports = router