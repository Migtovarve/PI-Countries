const { Router } = require('express');
const routesCountries = require("./countries.js")
const routesActivity = require("./activities.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', routesCountries)
router.use('/activity', routesActivity)
module.exports = router;
