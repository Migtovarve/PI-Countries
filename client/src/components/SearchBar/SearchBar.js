import React, { useState } from "react";
import { useDispatch, /*useSelector */} from "react-redux";
import { getCountryName, setCountries } from "../../redux/actions";
import style from "./SearchBar.module.css"
export default function SearchBar({setAZZA, setPopulation, setSelectedContinet,setSelectedActivity, paginado}) {

    //const {countries} = useSelector(state=>state)
    const [name,setName]=useState("")
    const dispatch = useDispatch()

    function handleSearch(e){
        e.preventDefault()
        paginado(1)
        dispatch(setCountries(["search"]))
        dispatch(getCountryName(name))
        setName("")
        setAZZA(true)
        setPopulation(true)
        setSelectedContinet(true)
        setSelectedActivity(true)
    }

    function handleInputOnChange(e){
        e.preventDefault()
        setName(e.target.value)
        //console.log(Name)
    }
    return (
        <form className={style.content}>
            <input className={style.search} onChange={e=> handleInputOnChange(e)} value={name} type={"text"} placeholder={"Search country..."}/>
            <button className={style.search} onClick={e=>handleSearch(e)}>Search</button>
        </form>
    )
}