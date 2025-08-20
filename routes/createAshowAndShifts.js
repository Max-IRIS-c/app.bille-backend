const { findOrCreateShow } = require('../helpers/setters')

module.exports = (app) => {
    app.post('/api/createAshowAndShifts', async function (req, res) {
        //////console.log("createAshowAndShifts : ", req.body)
        const data = req.body
        const show = await findOrCreateShow(data)
        if(!show){
            return res.status(500).send({msg:'error_interne'})
        }
        
    })
}