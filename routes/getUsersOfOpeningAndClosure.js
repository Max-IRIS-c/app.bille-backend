const { getUsersOfOpeningAndClosure } = require('../helpers/getters')
module.exports = (app) => {
    app.get('/api/getUsersOfOpeningAndClosure', async function (req, res) {
        try{
            const idShow = req.query.idShow
            ////console.log('getUsersOfOpeningAndClosure : ', idShow)
            if(!idShow) return res.status(400).send({msg: 'error1'})
            const users = await getUsersOfOpeningAndClosure(idShow)
            if(users === 'no-data' || users === 'error'){
                return res.status(500).send({msg: users})
            }
            return res.status(200).send({msg: 'success', data: users})
        }catch(error){
            ////console.log(error)
            res.status(500).json({ msg: 'error_getUserList', error: error });
        }
    }
)}