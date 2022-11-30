const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const userController = require('../controllers/userController')


router.post('/books',bookController.createBook)
router.get('/books',bookController.getBooks)







module.exports = router