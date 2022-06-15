import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import style from "./Cards.module.css"
export default function Cards({currentCountries}) {
    const {countries} = useSelector(state=>state)
    return (

        <div className={style.content}>
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