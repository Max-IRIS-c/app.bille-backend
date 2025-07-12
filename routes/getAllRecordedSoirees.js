const { getAllRecordedSoiree } = require('../helpers/getters')
// get laBilleSHow and associated shifts where there is soirée
module.exports = (app) => {
    app.get('/api/getAllRecordedSoirees', async function (req, res) {
        try{
            ////console.log("allRecordedShow input")
            const allRecordedShow = await getAllRecordedSoiree()
            ////console.log("allRecordedShow : ", allRecordedShow)
            const msg = `success_getAllShowAndShifts`
            res.status(200).send({msg: msg, data: allRecordedShow})
        }catch(error){
            ////console.log(error)
            res.status(500).json({ msg: 'error_getAllShowAndShifts', error: error });
        }
    }
)}