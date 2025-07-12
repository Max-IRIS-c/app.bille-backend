const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getUserByLogin } = require('./helpers')

// ce endpoint attend 2 parametres : login & password
module.exports = (app) => {
    app.post('/api/login', async (req, res) => {
        const login = req.body.login
        const password = req.body.password
        ////console.log("data : ", login, ", ", password)
        try{
            // requete qui va chercher l'utilisateur (son login)
            let userData = await getUserByLogin(login)
            ////console.log("userdata0 : ", userData)
            if(userData === null){ // si il ne trouve rien 
                const msg = "error_data"
                return res.status(400).send({msg: msg}) 
            }
            // si il trouve le user, compare les passwords 
            const isPasswordValid = await bcrypt.compare(password, userData.password)
            // si passwords ne correspondent pas
            if(!isPasswordValid){
                const msg = "error_data"
                return res.status(400).send({msg: msg})
            }
            // si passwords correspondent => user connecté !
            const msg = "success_login"
            ////console.log(msg)
            //const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).send({msg: msg, data: userData})
        }catch(error){
            console.error(error)
            const msg = `error_system`
            return res.status(500).send(msg)
        }
    })

}