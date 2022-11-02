const { Router } = require('express');
const {getInfoCountry, getAllCountries} = require('../Controllers/countries')
const {Activity, Country} = require("../db")
const router = Router();


router.get("/", getAllCountries)

router.get("/:idCountry", getInfoCountry)

// router.get(`/:idPais`, async (req, res, next)=>{
//     const { idPais } = req.params
//     try{
//         const info = await getInfoCountry(idPais)
//         res.status(200).send(info)
//     }catch (err) {
//         next(err);
//     }
// } )








module.exports = router