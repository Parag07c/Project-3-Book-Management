const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const userController = require('../controllers/userController')

router.post('/register',userController.createUser)
router.post('/login',userController.userLogin)
router.post("/books",bookController.createBook)
router.get("/books",bookController.getBooks)
router.get("/books/:bookId",bookController.getBookById)
router.put("/books/:bookId",bookController.updateBook)
router.delete("/books/:bookId",bookController.deleteBook)
router.post("/books/:bookId/review",reviewController.createReviews)
// router.put("/books/:bookId/review/:reviewId",reviewController.updateReviews)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReviews)


module.exports = router