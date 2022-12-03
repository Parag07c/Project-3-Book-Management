
// <<<<<<<<<<<<<----------- Contains all validation function -------------->>>>>>>>>>>>>>>>


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
    return (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/).test(password)
}
const ratingCheck = function(value){
    if(typeof value === 'number' && (value>=1 && value<=5)) return true
      return false
  }

  const isValidDate=function(date){
    return (/^\d{4}-\d{2}-\d{2}$/.test(date))
  }

module.exports={isValid,isValidName,isValidMobile,validateEmail,isValidPassword,ratingCheck,isValidDate}