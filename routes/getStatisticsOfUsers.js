const { getCountOfShiftsOfUserForSpecificMonth, getUserList } = require('../helpers/getters')

module.exports = (app) => {
    app.get('/api/getStatisticsOfUsers', async function (req, res) {
        ////console.log("getStatisticsOfUsers !")
        // req.query = year 
        const year = 2024
        const monthOfYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        // parcours des mois de l'année
        // récupération des stats pour chaque user pour cemois
        let statistics = []
        const allUsers = await getUserList()
        for(const user of allUsers){
            const idUser = user.idUser
            const userFirstname = user.firstname
            let statsOfUser = { firstname: userFirstname }
            for(const month of monthOfYear){
                const statsOfUserForThisMonth = await getCountOfShiftsOfUserForSpecificMonth(idUser, month, year)
                statsOfUser[month] = statsOfUserForThisMonth ? statsOfUserForThisMonth : 0
            }
            statistics.push(statsOfUser)
        }
        ////console.log("resultat final : ", statistics)
        const status = statistics ? 200 : 500
        const msg = statistics ? `success` : `echec`
        return res.status(status).send({msg: msg, data: statistics})
    }
)}