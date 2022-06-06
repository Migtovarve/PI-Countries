import React from "react";
import { Link } from "react-router-dom";


export default function Card({name, continent, flag, id}) {
    return (
        <div>
            <Link to={`/countries/${id}`}><h3>{name}</h3></Link>
            <h5>{continent}</h5>
            <img src={flag} alt="img not found"/>
        </div>

    )
}


