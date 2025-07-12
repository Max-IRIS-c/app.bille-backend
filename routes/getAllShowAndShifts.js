const { getAllShowAndShifts } = require('../helpers/getters')

module.exports = (app) => {
    app.get('/api/getAllShowAndShifts', async function (req, res) {
        const month = req.query.month
        const year = req.query.year
        ////console.log("getAllShowAndShifts :::: ", month, ", ", year)
        try{
            const allShowsOfTheMonth = await getAllShowAndShifts(month, year)
            const formatedData = allShowsOfTheMonth.map((show) => {
                if(show.shifts) show.shifts.map((shift) => { return shift.dataValues})
                return show.dataValues
            })
            const msg = `success_getAllShowAndShifts`
            ////console.log("DATA LOOKED ::: ", formatedData)
            res.status(200).send({msg: msg, data: allShowsOfTheMonth})
        }catch(error){
            ////console.log(error)
            res.status(500).json({ msg: 'error_getAllShowAndShifts', error: error });
        }
    }
)}