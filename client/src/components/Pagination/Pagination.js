import React from "react";

export default function Pagination({countriesPerPage, countries, paginado}){

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

    return (
        <nav>
            <ul >
                {
                    pageNumbers.map(number=>{
                        return (
                            <li key={number}>
                                <button onClick={()=>paginado(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>


    )
}