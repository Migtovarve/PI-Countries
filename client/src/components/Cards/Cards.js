import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

export default function Cards({currentCountries}) {
    const {countries} = useSelector(state=>state)
    return (

        <div>
            <h1>Paises</h1>
            {!countries[0]?(<div><h1>Cargando...</h1></div>):
                currentCountries.map(elem=>{
                    return (
                    <Card id={elem.id} key={elem.id} name={elem.name} continent={elem.continents} flag={elem.flags}/>
                    )
                }) 
            }     
        </div>
    )
}