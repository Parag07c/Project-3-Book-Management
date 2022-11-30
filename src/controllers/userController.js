const userModel = require("../models/userModel.js")
const jwt = require("jsonwebtoken")

function isValid(value) {
    if (typeof value === 'string' && value.trim().length == 0) return false
    if (value === 'undefined' || value === null) return false
    return true

}
const isValidName = function (value) {
    name = value.trim()
    return (/^([a-zA-Z'-.]+(?: [a-zA-Z'-.]+)?)$/.test(name))
}
const isValidMobile = function (phone) {
    phone = phone.trim()
    return (/^[0-9]\d{9}$/.test(phone))
}
const validateEmail = function (email) {
    email = email.trim()
    return (/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/).test(email)
}
const isValidPassword = function (password) {
    password = password.trim()
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/).test(password)
}
const createUser = async function (req, res) {
    try {
        let data = req.body
        let { title, name, phone, email, password } = data

        if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "please provide user data" })

        if (!isValid(title)) return res.status(400).send({ status: false, message: "please provide title" })
        title = data.title.trim()
        if (title != ("Mr" || "Mrs" || "Miss")) return res.status(400).send({ status: false, message: "please provide valid title" })

        if (!isValid(name)) return res.status(400).send({ status: false, message: "please provide name" })
        if (!isValidName(name)) return res.status(400).send({ status: false, message: "please provide a valid name" })

        if (!isValid(phone)) return res.status(400).send({ status: false, message: "please provide phone" })
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
        return res.status(201).send({ status: true, message: "success", data: savedUser })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const userLogin = async function (req, res) {
    try {
        const { email, password } = req.body

        if (!Object.keys(req.body).length) return res.status(400).send({ status: false, message: "please provide login credentials" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "please provide email" })

        if (!isValid(password)) return res.status(400).send({ status: false, message: "please provide password" })

        if (!(email && password)) return res.status(400).send({ status: false, message: " please provide email or password" })

        let valid = await userModel.findOne({ email, password })

        if (!valid) return res.status(400).send({ status: false, message: "please provide valid email and password" })

        let token = jwt.sign({ userId: valid._id }, "ritesh-rajput", { expiresIn: "1m" })
        return res.status(200).send({ status: true,message : "success", data: token })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = { createUser, userLogin }