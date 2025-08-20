const crypto = require('crypto')
const User = require('../models/user')

function setRandomPassword() {
    return crypto.randomBytes(12).toString('base64').slice(0, 12);
}
async function getUserByLogin(userLogin){
    try{
        const selectedUser = await User.findOne({where: {login: userLogin}})
        if(selectedUser){
            return selectedUser.dataValues
        }
        return null
    }catch(error){
        //////console.log("ERROR HERE : ", error)
        return null
    }
}
module.exports = {
    setRandomPassword,
    getUserByLogin
}