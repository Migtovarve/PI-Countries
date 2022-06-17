import React, { useState } from "react";
import { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllCountries} from "../../redux/actions/index"
import Cards from "../Cards/Cards";
//import { Link } from "react-router-dom";
import Nav from "../Nav/Nav"
import Pagination from "../Pagination/Pagination";
import style from "./Home.module.css"

export default function Home() {
    const {countries} = useSelector((state)=>{return state})
    const dispatch = useDispatch()

    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);
    const indexLastCountry = currentPage===1? 9:currentPage * countriesPerPage-1;//9
    const indexFirstCountry = currentPage===1? 0: indexLastCountry - countriesPerPage;//0
    const currentCountries = countries.slice(indexFirstCountry,indexLastCountry) 

    let el = document.getElementsByName(`${currentPage-1}`)

    function paginado(numberPage){
        if(numberPage===1){
            setCountriesPerPage(9)
        }else {
            setCountriesPerPage(10)
        }

        let borrar = document.querySelector(".current")
        if(borrar) {
            borrar.classList.remove("current")
        }
        // let el = document.getElementsByName(``)
        // if(Boolean(el)){
        //     el.style.backgroundColor = "#FFE3B3";
        //     el.style.color = "#000"
        //     el.classList.remove("current")
        // }
        //     e.target.style.backgroundColor = "#4CAF50";
        //     e.target.style.color = "#fff"
        //     e.target.classList.add("current")
        return setCurrentPage(numberPage)
    }

    useEffect(()=>{
        if(el[0]){
            el[0].classList.add("current")
            // console.log(Boolean(el[0]))
            // el[0].style.backgroundColor = "#4CAF50";
            // el[0].style.color = "#fff"
        }
       !countries[0] && dispatch(getAllCountries())
    }, [countries,dispatch, currentPage])
    
    // function handleClick(e){
    //         e.preventDefault()
    //         dispatch(getAllCountries())
    //     }
    //https://www.robotlab.com/hs-fs/hubfs/Moon.gif?width=1920&name=Moon.gif
    //https://kroff.com/wp-content/uploads/2020/10/Kroff_Website_World-MapAnimation_01zb.gif
    return (
        !countries[0]? <div className={style.content}> <img className={style.load} alt="loading" src="https://designlooter.com/images/hourglass-svg-2.gif"/></div>
         :
        <div className={style.bg}>
            <Nav paginado={paginado}/>
            <h1 className={style.title}>Countries</h1>
            {countries[0]==="search"?<h3>Loading...</h3>:<>
            <Cards currentCountries={currentCountries}/>
            <Pagination currentPage={currentPage} countriesPerPage={countriesPerPage} countries={countries.length} paginado={paginado}/>
            </>
            }
        </div>
    )
}