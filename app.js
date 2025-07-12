const express = require('express')
const initDb = require('./db/initDb')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const authenticateToken = require('./authentification')

const app = express()
const port = 3000

// Middlewares
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json())

// Serve React build (dossier "public" ou "build")
app.use(express.static(path.join(__dirname, 'public')))

// === ROUTES NON PROTÉGÉES (login, etc.) ===
require('./routes2/login')(app)
require('./routes2/login-confirm')(app)

// === PROTECTION PAR JWT pour les routes API ===
// Regroupe toutes tes routes sous un préfixe /api
const apiRouter = express.Router()
apiRouter.use(authenticateToken)

// Exemple de montage d’une route dans /api
require('./routes2/get-datesAndStatusOfRecordShowOfGivenMonth.js')(app)
require('./routes2/set-year-template.js')(app)
require('./routes2/get-dateInfos.js')(app)
require('./routes2/set-user-to-shift-insert.js')(app)
require('./routes2/set-user-to-shift-delete.js')(app)
require('./routes2/set-update-show.js')(app)
require('./routes2/set-user-to-extraTime-insert.js')(app)
require('./routes2/set-user-to-extraTime-delete.js')(app)
require('./routes2/set-ResponsableOfShow.js')(app)
require('./routes2/get-specific-user.js')(app)
require('./routes2/update-show.js')(app)
require('./routes2/get-my-infos.js')(app)
require('./routes2/get-all-users.js')(app)
require('./routes2/getUserList.js')(app)
require('./routes2/set-create-user.js')(app)
require('./routes2/set-delete-user.js')(app)
require('./routes2/set-update-user.js')(app)
require('./routes2/updateShowShifts.js')(app)
require('./routes2/set-user-reset.js')(app)
// ... toutes les autres

app.use('/api', apiRouter)

// === CATCH-ALL pour React Router ===
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })
})
//sync db et def relations modeles
initDb()
// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`)
})


/*const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3001
const path = require('path')
const initDb = require('./db/initDb')
require('dotenv').config()
const authenticateToken = require('./authentification')

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
    origin: true 
}))

app.use(bodyParser.json())


// endpoints
/*require('./routes/login')(app)
//require('./routes/createUser')(app)
require('./routes/getAllShowAndShifts')(app)
require('./routes/addUserToShift')(app)
require('./routes/getAllShiftsOfUsers')(app)
require('./routes/saveShow')(app)
require('./routes/getAllRecordedSoirees')(app)
require('./routes/getUserList')(app)
require('./routes/createAshowAndShifts')(app)
//require('./routes/subscribeUserToShift')(app)
//require('./routes/removeUserFromShift')(app)
//require('./routes/updateShowInformations')(app)
require('./routes/getAllShiftsOfAshow')(app)
require('./routes/updateShowShifts')(app)
require('./routes/getStatisticsOfUsers')(app)
require('./routes/getFirstnameOfUser')(app)
require('./routes/getUsersOfOpeningAndClosure')(app)
//require('./routes/subscribeUserToExtraTime')(app)
require('./routes/getShowById')(app)*/
/*
app.use(express.static(path.join(__dirname, 'public')))

// -----routes2 ---------------------------------------
require('./routes2/login')(app)
require('./routes2/login-confirm')(app)
app.use(authenticateToken)
require('./routes2/get-datesAndStatusOfRecordShowOfGivenMonth')(app)
require('./routes2/set-year-template')(app)
require('./routes2/get-dateInfos')(app)
require('./routes2/set-user-to-shift-insert')(app)
require('./routes2/set-user-to-shift-delete')(app)
require('./routes2/set-update-show')(app)
require('./routes2/set-user-to-extraTime-insert')(app)
require('./routes2/set-user-to-extraTime-delete')(app)
require('./routes2/set-ResponsableOfShow')(app)
require('./routes2/get-specific-user')(app)
require('./routes2/update-show')(app)
require('./routes2/get-my-infos')(app)
require('./routes2/get-all-users')(app)
require('./routes2/getUserList')(app)
require('./routes2/set-create-user')(app)
require('./routes2/set-delete-user')(app)
require('./routes2/set-update-user')(app)
require('./routes2/updateShowShifts')(app)
require('./routes2/set-user-reset')(app)

// Erreur 404 pour les API non trouvées (optionnel, après toutes les routes)
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/routes2')) {
    // ou tout préfixe API que tu utilises
    return res.status(404).json({ message: 'Erreur 404 API' });
  }
  next();
});

app.get(('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public')});
}))

// erreur 404
app.use(({res}) => {
    const message = 'Erreur 404'
    res.status(404).json({message})
})

//sync db et def relations modeles
initDb()

// démarrage server
app.listen(port, '0.0.0.0', () => {console.log(`server demarré sur le port ${port}`)}) */