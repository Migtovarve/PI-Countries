import React from "react";
import style from "./Pagination.module.css"
export default function Pagination({countriesPerPage, countries, paginado, currentPage}){

    const pageNumbers= []
    let aux;

    if (countries - 9 > 0 ){
        aux = 1;
    } else {
        aux = 0
     }
     const pages = aux + Math.ceil((countries-9)/(10))
    //if(countriesPerPage===9) countriesPerPage = 10
    for (let i = 0; i < pages; i++) {
        pageNumbers.push(i+1)
    }

    function handleClick(e){
        //console.log(e.target.getAttribute('name'))
        const name = Number(e.target.getAttribute('name'))
        let currentP = name + 1 
        paginado(currentP)
        console.log(e.target)
    }



    return (
        <nav>
            <ul className={style.pagination} >
                {
                    pageNumbers.map((number,index)=>{
                        return (
                            <li key={number}>
                                <a className={style.aPagination} key={index} name={index}  onClick={(e)=>handleClick(e)}>{number}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>


    )
}