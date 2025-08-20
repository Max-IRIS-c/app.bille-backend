const { getAllShiftsOfAshow } = require('../helpers/getters')
module.exports = (app) => {
    app.get('/api/getAllShiftsOfAshow', async function (req, res) {
        try{
            //////console.log("getAllShiftsOfAshow : ", req.query)
            const idShow = req.query.idShow
            try{
                const allShiftsOfShow = await getAllShiftsOfAshow(idShow)
                //////console.log("shifts : ", allShiftsOfShow)
                if(!allShiftsOfShow){      
                    return res.status(200).send({msg: `success_noData`})
                }
                const filtredShifts = {
                    bar: allShiftsOfShow.filter((shift) => {
                        shift.startTime = formatTime(shift.startTime)
                        shift.endTime = formatTime(shift.endTime)
                        return shift.type === 'bar' ?? shift.dataValues 
                    }),
                    entree: allShiftsOfShow.filter((shift) => { 
                        shift.startTime = formatTime(shift.startTime)
                        shift.endTime = formatTime(shift.endTime)
                        return shift.type === 'entree' ?? shift.dataValues 
                    }),
                    parking: allShiftsOfShow.filter((shift) => { 
                        shift.startTime = formatTime(shift.startTime)
                        shift.endTime = formatTime(shift.endTime)
                        return shift.type === 'parking' ?? shift.dataValues 

                    })
                }
                
                const msg = filtredShifts ? `success_containData` : `Error_system1`
                const status = filtredShifts ? 200 : 500
                return res.status(status).send({msg: msg, data: filtredShifts})
            }catch(error){
                const msg = `Error_system2`
                return res.status(500).send({msg})
            }
        }catch(error){
            //////console.log(error)
            res.status(500).json({ msg: 'error_getAllShowAndShifts', error: error });
        }
    }
)}
// formatage start et endTime 22:00:00000 => 22:00
function formatTime(input) {
    return input.split(':').slice(0, 2).join(':');
}