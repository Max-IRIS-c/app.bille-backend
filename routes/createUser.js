const { Sequelize} = require('sequelize')
const { setRandomPassword } = require('./helpers')
const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports = (app) => {
    app.post('/api/createUser', async function (req, res) {
        const body = req.body
        const generatedPassword = setRandomPassword() 
        const cryptedPassword = await bcrypt.hash(generatedPassword, 10)
        try{
            const createUser = await User.create({
                firstname: body.firstname,
                login: body.login,
                password: cryptedPassword,
                status: 'benevol'
            })
            const msg = `success_createUser`
            return res.status(200).send({msg: msg, data: createUser, password: generatedPassword})
        }catch(error){
            if (error instanceof Sequelize.UniqueConstraintError) {
                const msg = 'unicity_error'
                return res.status(400).send(msg)
            }else{
                const msg = `system_error`
                return res.status(500).send(msg)
            }
        }

    })
}