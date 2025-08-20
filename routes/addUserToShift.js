const { checkIfUserSubscribedToThisShift, checkIfShiftIsFull } = require('../helpers/checks')
const { setShow, setShiftToShow, setUserToShift } = require('../helpers/setters')
const { getShowByDate, getAllShiftsOfAshow } = require("../helpers/getters")

module.exports = (app) => {
    app.post('/api/addUserToShift', async (req, res) => {    
        const dataReceived = req.body
        //////console.log("dataReceived : ", dataReceived)
        const shiftsReceived = req.body.shifts
        const idUser = req.body.idUser
        const showConcerned = await getShowByDate(dataReceived.date) || await setShow(dataReceived) // si pas de show existant enregistrement
        const shiftsOfShowConcerned = await getAllShiftsOfAshow(showConcerned.laBilleShowId) || await setShiftToShow(dataReceived.shifts, showConcerned.laBilleShowId) // si pas de shifts existent -> enregistrement
        const shiftsIntoInsertUser = getIdsAndTypesOfShiftsIntoInsertUser(shiftsReceived, shiftsOfShowConcerned, idUser)
        const insertionOfUser = await Promise.all(shiftsIntoInsertUser.map(async (shiftData) => {
            if(!(await checkIfShiftIsFull(shiftData.idShift)) && !(await checkIfUserSubscribedToThisShift(idUser, shiftData.idShift))){
                const insertion = await setUserToShift(idUser, shiftData.idShift, shiftData.type)
                return insertion ? insertion : null
            }
        }))
        const status = insertionOfUser.length > 0 ? 200 : 500
        const msg = insertionOfUser.length > 0 ? 'success':'fail'
        return res.status(status).send(msg)
    })
}

// Fonction pour récupérer les idShifts où l'idUser apparaît 
function getIdsAndTypesOfShiftsIntoInsertUser(shifts, shiftsOfShowConcerned, userId) {
    return shiftsOfShowConcerned
      .map(shiftConcerned => {
        // Trouver le shift correspondant dans le tableau 'shifts'
        const matchingShift = shifts.find(shift => 
          shift.startTime === shiftConcerned.startTime.slice(0, 5) && 
          shift.endTime === shiftConcerned.endTime.slice(0, 5) &&
          shift.type === shiftConcerned.type
        );
        
        // Si un shift correspondant est trouvé et contient l'utilisateur donné
        if (matchingShift) {
          //////console.log("matchingShift : ", matchingShift)
          const userInShift = matchingShift.users.find(user => user.id === userId);
          if (userInShift) {
            return {
              idShift: shiftConcerned.idShift,
              type: userInShift.type // Récupérer le type 
            };
          }
        }
        
        return null; // Aucun résultat si pas d'utilisateur correspondant
      })
      .filter(result => result !== null); // Filtrer les résultats vides
  }