const { default: mongoose } = require("mongoose")
const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const {isValid,isValidName,ratingCheck} = require("../validator/validation")



const createReviews = async function(req,res){
    try {
        let id= req.params.bookId
        let data= req.body
        let{review,rating,reviewedBy} =data
  

        if(!mongoose.isValidObjectId(id)) return res.status(400).send({status : false,message:"enter valid bookId" })

        if(Object.keys(req.body).length==0) return res.status(400).send({status :false,message : "please enter all the field"})

         data.reviewedAt = Date.now()      

        if(!isValid(review)) return res.status(400).send({status : false,message : "please enter review"})

        if(!rating) return res.status(400).send({status :false,message:"please provide rating"})

        if(!ratingCheck(rating)) return res.status(400).send({status :false,message:"rating should be in  between 1 to 5"})

        if(!isValid(reviewedBy)) return res.status(400).send({status : false,message : "please enter reviewer name"})

        if(!isValidName(reviewedBy)) return res.status(400).send({status : false,message : "please enter valid reviewer name"})

        let checkId = await bookModel.findById(id)

        if(!checkId) return res.status(404).send({status :false,message : "book not found"})
    
        if(checkId.isDeleted) return res.status(400).send({status : false,message : "book is no longer exists"})
    
        await bookModel.findOneAndUpdate({_id :id},{$set : {reviews : checkId.reviews + 1}})
    
        let result = {bookId:id,...data}
    
        let createreview = await reviewModel.create(result)
        
        return res.status(201).send({status : true,message : "success",data :createreview})

    } catch (error) {
        return res.status(500).send({status : false, message : error.message})
    }
 
}

module.exports = {createReviews}