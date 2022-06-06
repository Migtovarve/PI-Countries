const axios = require('axios')
const {Country, Activity} = require("../db")
const { Op } = require("sequelize");

async function getAllCountries(req, res, next) {
    const {name} = req.query
    try {
        const countries = (await axios.get('https://restcountries.com/v3/all')).data
        countries.map(el=>{
            let cap, pop
            el.capital ? cap = el.capital : cap = ["No existe"]
            el.subregion ? pop = el.subregion: pop = 'null'
            Country.findOrCreate({
                where: {
                    id: el.cca3,
                    name: el.name.common.toLowerCase() ,
                    flags: el.flags[1],
                    continents: el.continents[0],
                    capital: cap[0],
                    continents: el.continents[0],
                    subregion: pop,
                    area: el.area,
                    population: el.population
                }    
            })
        })
        const allCountries = await Country.findAll(
            {
            include: {
                model: Activity,
                attributes: ['id','name','difficulty','duration','season'],
                through: { attributes: [] }
            }
            }
        );
        if (name){
            const oneCountry = await Country.findAll({
                  where:  {
                        name: {
                            [Op.like] : `%${name.toLowerCase()}%`
                        }
                    }
                
            })
            if(oneCountry[0]){//Existe algun pais?
                res.status(200).send(oneCountry)
            }else{
                res.status(404).send({massage: "No se encuetra ningun pais correspondiente a su busquedad"})
            }

        } else {
            res.status(200).send(allCountries)
        }
    } catch (error) {
        next(error)
    }
}

async function getInfoCountry(req,res,next){
    const {idCountry} = req.params;
    try {
        const infoCountry = await Country.findAll({
            where: {
                id : idCountry
            },
            include:{
                model: Activity,
                attributes: ['id','name','difficulty','duration','season'],
                through: { attributes: [] },
            }
        })
        //console.log(infoCountry)
        if(!infoCountry[0]) {
            res.status(404).send({massage: `No existe un Pais con el Codigo ${idCountry}.`})
        } else {
            res.status(200).send(infoCountry)
        }
    } catch (err) {
        next(err)
    }

}


// async function getInfoCountry(id) {//retorna la info de una pais por el ID desde el endPoint
//     const infoCountry = (await axios.get(`https://restcountries.com/v3/alpha/${id}`)).data[0]
//     let cap, pop
//     infoCountry.capital ? cap = infoCountry.capital : cap = ["No existe"]
//     infoCountry.subregion ? pop = infoCountry.subregion: pop = 'null'
//     return {
//         id: infoCountry.cca3,
//         name: infoCountry.name.common,
//         flags: infoCountry.flags[1],
//         continents: infoCountry.continents[0],
//         capital: cap[0],
//         continents: infoCountry.continents[0],
//         subregion: pop,
//         area: infoCountry.area,
//         population: infoCountry.population
//     }
// }


module.exports = {
   // callApi,
    getAllCountries,
    getInfoCountry
}