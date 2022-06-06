import React, { useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { getInfoCountry, resetCoutry } from "../../redux/actions";
import { Link } from "react-router-dom";

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
        <div>
            <div>
                <header>
                    <Link to="/home"><button onClick={e=>handleBack(e)}>Regresar</button></Link>
                    <Link to="/activity"><button>Crear Actividad</button></Link>
                </header>
            </div>
            {!country[0]?<h1>Cargando...</h1>:
                <>
                <div>
                    <h1>{country[0].name}</h1>
                    <h3>Codigo del país: {country[0].id}</h3>
                    <h3>Capital: {country[0].capital}</h3>
                    <h3>Subregión: {country[0].subregion}</h3>
                    <h3>Área: {country[0].area}</h3>
                    <h3>Población: {country[0].population}</h3>
                </div>
                <div>
                    <img src={country[0].flags} alt="Flag country"/>
                </div>
                <div>
                    <h3>Actividades turísticas</h3>
                    {country[0].activities.map(elem=>{
                        return (<div>
                            <p>name: {elem.name}</p>
                            <p>id: {elem.id}</p>
                            <p>difficulty: {elem.difficulty} </p>
                            <p>duration: {elem.duration}</p>
                            <p>season: {elem.season}</p>
                        </div>)
                    })}
                </div>


                </>
            
            }
        </div>
    )
}