import React, { useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { getInfoCountry, resetCoutry } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./Details.module.css"

export default function Details(){
    const {country} = useSelector(state=>state)
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getInfoCountry(id))
    }, [dispatch,id])
    function handleBack(e){
        dispatch(resetCoutry())
    }
    return (
        <div className={style.content}>
            <div>
                <header>
                    <Link to="/home"><button onClick={e=>handleBack(e)}>Back</button></Link>
                </header>
            </div>
            {!country[0]?<h1>Loading...</h1>:
                <>
                <div>
                    <h1>{(country[0].name[0].toUpperCase()+country[0].name.slice(1))}</h1>
                    <h3>Country code: {country[0].id}</h3>
                    <h3>Capital: {country[0].capital}</h3>
                    <h3>Subregion: {country[0].subregion}</h3>
                    <h3>Area: {country[0].area}</h3>
                    <h3>Population: {country[0].population}</h3>
                </div>
                <div>
                    <img src={country[0].flags} alt="Flag country"/>
                </div>

                <div className={style.table}>
                    
                        <h3>Tourist activities</h3>
                        <table>
                        <tr>
                            <th>Name</th>
                            <th>Id</th>
                            <th>Difficulty</th>
                            <th>Duration</th>
                            <th>Season</th>
                        </tr>
                        {country[0].activities.map(elem=>{
                            return (<tr>
                                <td>{elem.name}</td>
                                <td>{elem.id}</td>
                                <td>{elem.difficulty} </td>
                                <td>{elem.duration}h</td>
                                <td>{elem.season}</td>
                            </tr>)
                        })}
                        </table>
                </div>            

                </>
            
            }
        </div>
    )
}