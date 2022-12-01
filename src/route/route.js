const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const userController = require('../controllers/userController')

router.post('/register',userController.createUser)
router.post('/login',userController.userLogin)
router.post("/books",bookController.createBook)
router.get("/books",bookController.getBooks)













router.post("/books/:bookId/review",reviewController.createReviews)












module.exports = router