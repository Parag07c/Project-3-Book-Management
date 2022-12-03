const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const userController = require('../controllers/userController')
const {authentication,authorisation}=require("../middleware/auth")

//<<<<<<<<============[ Book-Management Project]================>>>>>>>>>>>>

//--------------------User & Login Api-----------------
router.post('/register',userController.createUser)
router.post('/login',userController.userLogin)

//--------------------Book Api-------------------------
router.post("/books",authentication,authorisation,bookController.createBook)
router.get("/books",authentication,bookController.getBooks)
router.get("/books/:bookId",authentication,bookController.getBookById)
router.put("/books/:bookId",authentication,authorisation,bookController.updateBook)
router.delete("/books/:bookId",authentication,authorisation,bookController.deleteBook)

//--------------------Review Api-------------------------
router.post("/books/:bookId/review",reviewController.createReviews)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReviews)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReviews)

//-----------------Error Handling Api-----------------------
router.all("/*",function(req,res){
   return res.status(400).send({status:false,message:"Path Not Found"})
})

//<----------------Export router Module---------------
module.exports = router