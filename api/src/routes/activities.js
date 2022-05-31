const { Router } = require("express");
const {Activity, Country} = require("../db")
const {Op} = require("sequelize")
const router = Router();


router.post('/', async (req, res, next) => {
    const { name, dificulty, duration, season, idCountry} = req.body
    if(!name || !dificulty || !duration || !season || !idCountry) return res.status(400).send({massage: "hacen falta datos obligatorios"})

    try {
        const validatorActivity = await Activity.findAll({
            where: {
                name : name
            }
        })
        // console.log(validatorActivity[0], "********************************************************************************")
        if(validatorActivity[0]) {//la actividad ya existe? 
            res.status(400).send({massage: "Ya existe una actividad con ese nombre"})
        } else {
            const activityCreated = await Activity.create({
                    name, dificulty, duration, season
            })

            const arrPromise = idCountry.map( async elem => {
                const country = await Country.findByPk(elem)
                activityCreated.addCountry(country)
            })
            await Promise.all(arrPromise)
            res.status(201).send("actividad creada correctamente")
        }
        // const country = await Country.findByPk(idCountry)
        // const activity = await country.createActivity({
        //     name, dificulty, duration, season
        // })
        // res.send("Se creo correctamente")
    } catch (error) {
        next(error)
    }
    
} )

module.exports = router

/*Relacionar el id del pais con el id de la actividad en la tabla intermedia */