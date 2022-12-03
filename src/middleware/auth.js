const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const bookModel = require("../models/bookModel")
const {isValid}=require("../validator/validation")


const authentication = function (req, res, next) {
    try {
        let token = req.headers["auth"]

        if (!token) return res.status(400).send({ status: false, message: "Please provide the token from request header" })

        jwt.verify(token, "Secrete-key", function (error, verify) {

            if (error) return res.status(401).send({ status: false, message: "Authentication failed! You need to login again" })

            req.token = verify.userId
            next()
        })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const authorisation = async function (req, res, next) {
    try {
        let userId = req.token
        let bookId = req.params.bookId
        let user = req.body.userId
        if (bookId) {
            if (!mongoose.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Please provide valid BookId" })

            let id = await bookModel.findById(bookId)
            if (id.userId != userId) return res.status(403).send({ status: false, message: "Authorisation failed! you are not a valid user" })
            next()
        }
        else {
            if (!mongoose.isValidObjectId(user)) return res.status(400).send({ status: false, message: "user id is invalid" })

            if (!isValid(user)) return res.status(400).send({ status: false, message: "userId is required" })


            if (user != userId) return res.status(403).send({ status: false, message: "Authorisation failed! you are not a valid user " })
            next()
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

module.exports = { authentication, authorisation }