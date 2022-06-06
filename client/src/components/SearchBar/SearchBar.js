import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryName } from "../../redux/actions";

export default function SearchBar({setAZZA, setPopulation, setSelectedContinet,setSelectedActivity}) {
    const [Name,setName]=useState("")
    const dispatch = useDispatch()

    function handleSearch(e){
        dispatch(getCountryName(Name))
        setName("")
        setAZZA("A to Z")
        setPopulation("Lower")
        setSelectedContinet(true)
        setSelectedActivity(true)
    }

    function handleInputOnChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(Name)
    }
    return (
        <div>
            <input onChange={e=> handleInputOnChange(e)} value={Name} type={"text"} placeholder={"Buscar país..."}/>
            <button onClick={e=>handleSearch(e)} >Search</button>
        </div>
    )
}