const { getExtraTimeByUserAndTypeAndShow } = require('../helpers/getters')
module.exports = (app) => {
    app.post('/api/removeUserFromExtraTime', async (req, res) => {  
        const idUser = req.body.idUser
        const type = req.body.type
        const idShow = req.body.idShow
        if(!idUser || !type || !idShow) return res.status(400).send({msg: 'error'})
        try{       
            const extraTimeConcerned = await getExtraTimeByUserAndTypeAndShow(idUser, type, idShow)
            if(!extraTimeConcerned) return res.status(400).send({msg: 'success'})
            else if(extraTimeConcerned){
                await extraTimeConcerned.destroy()
                return res.status(200).send({msg: 'success'})
            }
            return res.status(status).send({msg: msg, data: data})
        }catch(error){
            //////console.log(error)
            return res.status(500).send({msg: 'error'})
        }
    })
}