const bookModel = require("../models/bookModel")





const createReviews = async function(req,res){
    let id= req.params.bookId
    let data= req.body
    let{review,rating,reviewedBy} =data
    data.reviewedAt = Date.now()
    console.log(data)
    let checkId = await bookModel.findById(id)
    if(!checkId) return res.status(404).send({status :false,message : "book not found"})
    if(checkId.isDeleted) return res.status(400).send({status : false,message : "book is no longer exists"})
    let updateBook = await bookModel.findOneAndUpdate(
        {_id :id},
        {$set : {reviews : ++1}}
    )




}

module.exports = {createReviews}