const { Router } = require("express");
const {Activity, Country} = require("../db")
//onst {Op} = require("sequelize")
const router = Router();


router.get("/", async (req,res,next)=>{
    try {
        const allActivities = await Activity.findAll();
        if(!allActivities[0]){
            res.status(404).send({message: "There is no Activity created.."})
        } else {
            res.status(200).send(allActivities)
        }   
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const { name, difficulty, duration, season, idCountry} = req.body
    if(!name || !difficulty || !duration || !season || !idCountry) return res.status(400).send({message: "hacen falta datos obligatorios"})

    try {
        const validatorActivity = await Activity.findAll({
            where: {
                name : name
            }
        })
        // console.log(validatorActivity[0], "********************************************************************************")
        //console.log(validatorActivity)
        if(validatorActivity[0]) {//la actividad ya existe? 
            res.status(400).send({message: "There is an activity with that name"})
        } else {
            const activityCreated = await Activity.create({
                    name, difficulty, duration, season
            })

            const arrPromise = idCountry.map( async elem => {
            const country = await Country.findByPk(elem)
                activityCreated.addCountry(country)
            })
            await Promise.all(arrPromise)
            res.status(201).send({message:"Activity created successfully"})
        }
        // const country = await Country.findByPk(idCountry)
        // const activity = await country.createActivity({
        //     name, difficulty, duration, season
        // })
        // res.send("Se creo correctamente")
    } catch (error) {
        next(error)
    }
    
} )

module.exports = router

/*Relacionar el id del pais con el id de la actividad en la tabla intermedia */