const userModel = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const { isValid, isValidName, isValidMobile, validateEmail, isValidPassword } = require("../validator/validation.js")


// <<<<<<<<<<<<<------------- User register-------------->>>>>>>>>>>>>>>>


const createUser = async function (req, res) {
    try {
        let data = req.body

        let { title, name, phone, email, password } = data

        if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "Please provide user data" })

        if (!isValid(title)) return res.status(400).send({ status: false, message: "please provide title" })

        title = data.title.trim()
        if (title != ("Mr" || "Mrs" || "Miss")) return res.status(400).send({ status: false, message: "please provide valid title" })

        if (!isValid(name)) return res.status(400).send({ status: false, message: "please provide name" })

        if (!isValidName(name)) return res.status(400).send({ status: false, message: "Please provide a valid name" })

        if (!isValid(phone)) return res.status(400).send({ status: false, message: "Please provide phone no." })

        let unique = await userModel.findOne({ phone: phone })
        if (unique) return res.status(400).send({ status: false, message: "phone no. is already exists" })

        if (!isValidMobile(phone)) return res.status(400).send({ status: false, message: " please enter a valid phone number " })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "please provide email" })

        let check = await userModel.findOne({ email: email })
        if (check) return res.status(400).send({ status: false, message: "email is already exists" })

        if (!validateEmail(email)) return res.status(400).send({ status: false, message: "please enter valid  email" })

        if (!isValid(password)) return res.status(400).send({ status: false, message: "please provide password" })

        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please enter valid password" })

        let savedUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: "Register Successfully", data: savedUser })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// <<<<<<<<<<<<<-------------User Login-------------->>>>>>>>>>>>>>>>


const userLogin = async function (req, res) {
    try {
        const { email, password } = req.body

        if (!Object.keys(req.body).length) return res.status(400).send({ status: false, message: "please provide login credentials" })

        if (!(email && password)) return res.status(400).send({ status: false, message: " please provide both email and password" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "please provide email" })

        if (!validateEmail(email)) return res.status(400).send({ status: false, message: "please enter valid  email" })

        if (!isValid(password)) return res.status(400).send({ status: false, message: "please provide password" })

        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please enter valid password" })

        let valid = await userModel.findOne({ email, password })

        if (!valid) return res.status(404).send({ status: false, message: "User not found" })

        let token = jwt.sign({ userId: valid._id }, "Secrete-key", { expiresIn: "10m" })

        return res.status(200).send({ status: true, message: "Token generated Successfully", data: token })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// <<<<<<<<<<<<<----------- Export all the functions -------------->>>>>>>>>>>>>>>>

module.exports = { createUser, userLogin }