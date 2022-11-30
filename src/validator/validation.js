


const isValid = function(value){
    if(typeof value=="string" && value.trim().length==0)return false
    if(value =='undefined'|| value ==null)return false
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



module.exports={isValid,isValidName,isValidMobile,validateEmail,isValidPassword}