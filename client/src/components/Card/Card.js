import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"

export default function Card({name, continent, flag, id}) {
    return (
        <div className={style.content}>
            <Link to={`/countries/${id}`}><img src={flag} alt="img not found"/></Link>
            <Link to={`/countries/${id}`}><h2 className={style.title}>{(name[0].toUpperCase() + name.slice(1))}</h2></Link>
            <h3 className={style.subTitle}>{continent}</h3>
        </div>

    )
}


