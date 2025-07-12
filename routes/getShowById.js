const { getShowById } = require('../helpers/getters')

module.exports = (app) => {
    app.get('/api/getShowById', async (req, res) => {  
        const idShow = req.query.idShow
        ////console.log("getShowById : ", idShow)
        if(!idShow) return res.status(400).send({msg: 'error'})
        try{            
            const concernedShow = await getShowById(idShow)
            ////console.log("concernedShow : ", concernedShow)
            const status = concernedShow ? 200 : 400
            const msg = concernedShow ? 'success': 'error'
            const data = concernedShow ? concernedShow.dataValues : null
            return res.status(status).send({msg: msg, data: data})
        }catch(error){
            ////console.log(error)
            return res.status(500).send({msg: 'error'})
        }
    })
}