const { getUserById } = require('../helpers/getters')

module.exports = (app) => {
    app.get('/api/getFirstnameOfUser', async function (req, res) {
       //////console.log("getFirstnameOfUser : ", req.query)
       try{
        const idUser = req.query.idUser
        const user = await getUserById(idUser)
        const msg = user ? 'success' : 'error1'
        const status = user.firstname ? 200 : 400
        const firstname = user.firstname ?  user.firstname : 'no user found'
        return res.status(status).send({msg: msg, firstname: firstname})
       }catch(error){
            //////console.log(error)
            return res.status(500).send({msg: 'error2', firstname: 'system error'})
       }
       
    }
)}