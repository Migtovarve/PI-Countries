import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { filterByContinent,filterByActivity, orderAZ, orderHighest, orderPopulation, orderZA, reset, getActivities, refresh } from "../../redux/actions";
import style from "./Nav.module.css"

export default function Nav({paginado}){
    const dispatch = useDispatch()
    const {activities} = useSelector(state=>state)
    const [AZZA, setAZZA] = useState(false)
    const [population, setPopulation] = useState(false)
    const [selectedContinent,setSelectedContinet] = useState(false)
    const [selectedActivity,setSelectedActivity] = useState(false)

    useEffect(()=>{
       !activities[0] && dispatch(getActivities())
    },[dispatch])

    function handleFilterContinet(e){
        dispatch(filterByContinent(e.target.value))
        paginado(1)
        setSelectedContinet(false)
        setSelectedActivity(true)
        setAZZA(true)
        setPopulation(true)
    }
    
    function handleFilterActivity(e){
        //console.log("Handle filter on")
        dispatch(filterByActivity(e.target.value))
        paginado(1)
        setSelectedContinet(true)
        setSelectedActivity(false)
        setAZZA(true)
        setPopulation(true)
    }

    function handleReset(e){
        dispatch(reset())
    }

    function handleOrderAZ(e) {
        e.preventDefault()
        dispatch(orderAZ(e.target.value))
        //console.log(e.target.value)
        paginado(1)
        setAZZA(false)
        setPopulation(true)
    }

    function handleOrderPopulation(e) {
        e.preventDefault()
        dispatch(orderPopulation(e.target.value))
        paginado(1)
        setPopulation(false)
        setAZZA(true)
    }

    function handleRefresh(e){
        e.preventDefault()
        dispatch(refresh())
        setSelectedContinet(true)
        setSelectedActivity(true)
        setAZZA(true)
        setPopulation(true)
    }
    return (<>
        <header className={style.bg}>
            <div>
                <Link to="/"><img className={style.logo}  src={"https://cdn.theorg.com/d3119e0e-8202-4034-85ce-d0356382515e_thumb.jpg"} onClick={(e)=>{handleReset()}}/></Link>
            </div>


            <div className={style.filter}>
                <button onClick={e=>handleRefresh(e)} className={style.btnNav}>Refresh</button>
            </div>
            <>
                <Link to="/activity"><button className={style.btnNav}>Create Activity</button></Link>
            </>
            <>
                <SearchBar setAZZA={setAZZA} setPopulation={setPopulation} paginado={paginado} setSelectedContinet={setSelectedContinet} setSelectedActivity={setSelectedActivity} />
            </>

        </header>
        <div className={style.filters}>
            <select  className={style.btnNav} onChange={(e)=>handleFilterContinet(e)}  >
                <option selected={selectedContinent} value="default">All Continents</option>
                <option value="Africa">Africa</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Oceania">Oceania</option>
                <option value="South America">South America</option>
            </select>
            <select className={style.btnNav} onChange={(e)=>handleFilterActivity(e)} >
                <option selected={selectedActivity}  value="default">Activities</option>
                {activities[0] && activities.map((ele)=>{
                    return <option key={ele.id} value={ele.name}>{ele.name[0].toUpperCase() + ele.name.slice(1)}</option>
                    })   
                }
            </select>
            <select className={style.btnNav}  onChange={(e)=> handleOrderAZ(e)} >
                <option selected={AZZA} value="default">Sort</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
            <select  className={style.btnNav} onChange={(e)=> handleOrderPopulation(e)} >
                <option selected={population} value="default">Sort by Population {population}</option>
                <option value="lower">Lower</option>
                <option value="highest">Highest</option>
            </select>
        </div>
            </>

    )
}