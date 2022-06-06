import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function ActivityCreate() {
   // const dispatch = useDispatch()

    // useEffect(()=>{
    // },[])

    return (<>
        <div>
            <Link to="/home" ><button>Countries</button></Link>
        </div>
        <h1>Hola activities</h1>
    </>
    )
}