const mongoose=require("mongoose")
const bookModel=require("../models/bookModel")
const userModel=require("../models/userModel")

const isValid = function(value){
   if(typeof value=="string" && value.trim().length==0)return false
   if(value =='undefined'|| value ==null)return false
   return true
}

const createBook= async function(req,res){
   try{
      let data=req.body
      let {title,excerpt,userId,ISBN,category,subcategory}=data
      if(Object.keys(data).length==0)return res.status(400).send({status:false,message:"Please enter the required data"})
      if(!isValid(title))return res.status(400).send({status:false,message:"title is required"})
       title=title.trim()
      let unique = await bookModel.findOne({title:title})
      if(unique)return res.status(400).send({status:false,message:"Book title are already exists"})
      if(!isValid(excerpt))return res.status(400).send({status:false,message:"excerpt is required"})
      if(!isValid(userId))return res.status(400).send({status:false,message:"userId is required"})
      if(!mongoose.isValidObjectId(userId))return res.status(400).send({status:false,message:"please enter valid userId"})
      let validId=await userModel.findOne({_id:userId})
      if(!validId)return res.status(400).send({status:false,message:"userId is not exists"})  //status
      if(!isValid(ISBN))return res.status(400).send({status:false,message:"ISBN of book is required"})
      let Isbn =await bookModel.findOne({ISBN:ISBN})
      if(Isbn)return res.status(400).send({status:false,message:"ISBN No. already exists"})
      if(!isValid(category))return res.status(400).send({satus:false,message:"category is required"})
      if(!isValid(subcategory))return res.status(400).send({satus:false,message:"subcategory is required"})
      
      data.releasedAt = Date.now()
      let create=await bookModel.create(data)
      return res.status(201).send({status:true,message:"Book created succesfully",data:create})

   }
   catch(error){
    return res.status(500).send({status:false,message:error.message})
   }

}

const getBooks= async function(req,res){
   try {
      let data=req.query
      if(data){
         let {userId,category,subcategory}=data
         let obj={}
         if(userId) obj.userId=userId
         if(category) obj.category=category
         if(subcategory) obj.subcategory=subcategory
       obj.isDeleted=false

       let books=await bookModel.find(obj).select({_id:1,title:1,excerpt:1,userId:1,category:1,releasedAt:1,reviews:1}).sort({title:1})
       if(books.length==0)return res.status(404).send({status:false,message:"No such books found"})
       return res.status(200).send({status:true,message:"Books lists",data:books})
      }
     else{
         let collection=await bookModel.find({isDeleted:false}).select({_id:1,title:1,excerpt:1,userId:1,category:1,releasedAt:1,reviews:1}).sort({title:1})
         if(collection.length==0)return res.status(404).send({status:false,message:"Book not found"})
         return res.status(200).send({status:true,message:"Books lists",data:collection})
      }

   } catch (error) {
    return res.status(500).send({status:false,message:error.message})
      
   }
}

module.exports={createBook,getBooks}