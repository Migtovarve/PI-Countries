import React, { useState } from "react";
import { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllCountries} from "../../redux/actions/index"
import Cards from "../Cards/Cards";
//import { Link } from "react-router-dom";
import Nav from "../Nav/Nav"
import Pagination from "../Pagination/Pagination";


export default function Home() {
    const {countries} = useSelector((state)=>{return state})
    const dispatch = useDispatch()

    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);
    const indexLastCountry = currentPage===1? 9:currentPage * countriesPerPage-1;//9
    const indexFirstCountry = currentPage===1? 0: indexLastCountry - countriesPerPage;//0
    const currentCountries = countries.slice(indexFirstCountry,indexLastCountry) 

    function paginado(numberPage){
        if(numberPage===1){
            setCountriesPerPage(9)
        }else {
            setCountriesPerPage(10)
        }
        return setCurrentPage(numberPage)
    }

    useEffect(()=>{
       !countries[0] && dispatch(getAllCountries())
    }, [countries,dispatch])
    
    // function handleClick(e){
    //         e.preventDefault()
    //         dispatch(getAllCountries())
    //     }
        
    return (
        <div>
            <Nav paginado={paginado}/>
            <Pagination countriesPerPage={countriesPerPage} countries={countries.length} paginado={paginado}/>
            <Cards currentCountries={currentCountries}/>
        </div>
    )
}