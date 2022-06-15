import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"

export default function LandingPage(){
    return (
        <div className={style.bg}>
            <div className={style.content}>
                <h2 className={style.title}>Welcome</h2>
                <Link to="/home">
                    <button className={style.btn}>Enter</button>
                </Link>
            </div>
        </div>
    )
}