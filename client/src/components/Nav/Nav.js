import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { filterByContinent,filterByActivity, orderAZ, orderHighest, orderLower, orderZA, reset, getActivities } from "../../redux/actions";

export default function Nav({paginado}){
    const dispatch = useDispatch()
    const {activities} = useSelector(state=>state)
    const [AZZA, setAZZA] = useState("A to Z")
    const [population, setPopulation] = useState("Lower")
    const [selectedContinent,setSelectedContinet] = useState(false)
    const [selectedActivity,setSelectedActivity] = useState(false)

    useEffect(()=>{
        dispatch(getActivities())
    },[dispatch])

    function handleFilterContinet(e){
        dispatch(filterByContinent(e.target.value))
        paginado(1)
        setSelectedContinet(false)
        setSelectedActivity(true)
    }
    
    function handleFilterActivity(e){
        dispatch(filterByActivity(e.target.value))
        paginado(1)
        setSelectedContinet(true)
        setSelectedActivity(false)
    }

    function handleReset(e){
        dispatch(reset())
    }

    function handleOrderAZ(e) {
        e.preventDefault()
        if(AZZA==="A to Z"){
            dispatch(orderAZ())
            setAZZA("Z to A")
        } else {
            dispatch(orderZA())
            setAZZA("A to Z")
        }
        paginado(1)
    }

    function handleOrderPopulation(e) {
        e.preventDefault()
        if(population==="Lower"){
            dispatch(orderLower())
            setPopulation("Highest")
        } else {
            dispatch(orderHighest())
            setPopulation("Lower")
        }
        paginado(1)
    }
    return (
        <header>
            <div>
                <Link to="/"><button onClick={(e)=>{handleReset()}}>LOGO</button></Link>
            </div>

            <div>
                <SearchBar setAZZA={setAZZA} setPopulation={setPopulation}  setSelectedContinet={setSelectedContinet} setSelectedActivity={setSelectedActivity} />
            </div>

            <div>
            <select onChange={(e)=>handleFilterContinet(e)}  >
                <option selected={selectedContinent} value="default">All Continents</option>
                <option value="Africa">Africa</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Oceania">Oceania</option>
                <option value="South America">South America</option>
            </select>
            <select onChange={(e)=>handleFilterActivity(e)} >
                <option selected={selectedActivity}  value="default">Activities</option>
                {activities[0] && activities.map((ele)=>{
                    return <option key={ele.id} value={ele.name}>{ele.name}</option>
                    })   
                }
            </select>
            <button onClick={(e)=> handleOrderAZ(e)} >
                <h3>Order Alphabetically</h3>
                <h3>{AZZA}</h3>
            </button>
            <button onClick={(e)=> handleOrderPopulation(e)} >
                <h3>Sort by Population</h3>
                <h3>{population}</h3>
            </button>
            </div>

        </header>
    )
}