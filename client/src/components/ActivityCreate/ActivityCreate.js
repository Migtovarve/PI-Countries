import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { Link } from "react-router-dom";
import { getActivities, getAllCountries, postActivity, reset, resetCoutry, resetWarning } from "../../redux/actions";
import style from "./ActivityCreate.module.css"

export function validate(input){
    let error = {};
    if(!input.name){
        error.name = "name is require"
    }else if(!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(input.name)){
        error.name = "name must have only [Aa-Zz]"
    } 

    if(!input.difficulty){
        error.difficulty = "difficulty is require"
    }
    
    if (!input.duration){
        error.duration = "duration is require"
    }else if(!Number(input.duration)){
        error.duration = "duration must be only numbers"
    } else if (Number(input.duration)<0){
        error.duration = "duration must be positive numbers"
    }

    
    if (!input.season) {
        error.season="season is require"
    }

    if (input.addCountries.length === 0 ) {
        error.addCountries = "Add countries is require"
    }
    //console.log(error)
    return error
}
export default function ActivityCreate() {

    const dispatch = useDispatch()
    const {copyCountries, activities, warning, message} = useSelector(state=>state)

    useEffect(()=>{
        !copyCountries[0] && dispatch(getAllCountries())
        !activities[0] && dispatch(getActivities())
    },[copyCountries, dispatch,])

    const [state, setState] =useState({
        name:"",
        difficulty:"",
        duration:"",
        season: "",
        addCountries: [],
        idAddCountries: [],
        boolean: false
    })
    const [errors, setErrors] = useState({
        name:" ",
        difficulty:" ",
        duration:" ",
        season: " ",
        addCountries: [""],
    })

    const orderCountries =  copyCountries.sort(function(a,b){
        if(a.name > b.name) {
            return 1
        } else if (a.name < b.name) {
            return -1
        } else {
            return 0
        }
    })

    function handleAddCountries(e){
        e.preventDefault()
        //console.log(e.target.option)
        if (state.addCountries.find(ele=>ele===e.target.value) !== e.target.value && e.target.value !== ""){
            setState({
                ...state,
                addCountries: [...state.addCountries, e.target.value],
                idAddCountries:[...state.idAddCountries, orderCountries.filter(obj=>obj.name===e.target.value)[0].id],
            })
        }
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }))
        setErrors(validate({
            ...state,
            addCountries: e.target.value
        }))
    }

    function handleDelete(e){
        e.preventDefault()
        setState({
            ...state,
            addCountries:[],
            idAddCountries:[]
        })
        setErrors(validate({
            ...state,
            addCountries: e.target.value
        }))
    }

    function handleInputChange(e){
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value,
            boolean: false
        }
        )

        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }))
        
    }
    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(postActivity({
            name: state.name.toLowerCase(),
            dificulty:state.difficulty, 
            duration: state.duration, 
            season: state.season, 
            idCountry:state.idAddCountries
        }));
        setState({
            name:"",
            difficulty:"",
            duration:"",
            season: "",
            addCountries: [],
            idAddCountries: [],
            boolean: true
        });
        setErrors({
            name:" ",
            difficulty:" ",
            duration:" ",
            season: " ",
            addCountries: [""],
        });
    }
    function handleHome(){
        dispatch(reset())
    }

    function handleClick(e){
        dispatch(resetWarning())
    }
    //console.log(state.addCountries)
    function handleDeleteOne(e){
        e.preventDefault()
        // const arr = state.addCountries.filter((country, index)=>{
        //     return index != e.target.name
        //  })
        setState({
            ...state,
            addCountries: state.addCountries.filter((country, index)=>{
                return index != e.target.name
             }),
            idAddCountries: state.idAddCountries.filter((country, index)=>{
                return index != e.target.name
             })
        })

        console.log(e.target.name)
    }
    return (
    !copyCountries[0] && !activities[0]? <div>Cargando...</div>:
    <><div className={style.content}>
    <Link to="/home"><button onClick={handleHome}>Back</button></Link>
    <h2>Create tourist activity</h2>
    <form className={style.form} onSubmit={e=>handleOnSubmit(e)}>
        <div>
           <label>Name:</label>
           <input name="name" type="text" value={state.name} onChange={(e) => handleInputChange(e)}/>
           {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
           <label>Difficulty:</label>
           <select name="difficulty" onChange={(e) => handleInputChange(e)} >
               <option selected={state.boolean} value="">Select...</option>
               <option  value="1">1</option>
               <option  value="2">2</option>
               <option  value="3">3</option>
               <option  value="4">4</option>
               <option  value="5">5</option>
           </select>
           {errors.difficulty && (<p>{errors.difficulty}</p>)}
        </div>
        <div>
           <label>Duration (h):</label>
           <input name="duration" value={state.duration} onChange={(e) => handleInputChange(e)}/>
           {errors.duration && (<p>{errors.duration}</p>)}
        </div>
        <div>
           <label>Season:</label>
           <select name="season" onChange={e=>handleInputChange(e)}>
               <option selected={state.boolean} value="">Select...</option>
               <option value="Summer">Summer</option>
               <option value="Autumn">Autumn</option>
               <option value="Winter">Winter</option>
               <option value="Spring">Spring</option>
           </select>
           {errors.season && (<p>{errors.season}</p>)}
        </div>
        <div>
           <label>Countries:</label>
           <select onChange={(e)=> handleAddCountries(e)}>
               <option name="addCountries" selected={state.boolean} value="">Add Countries</option>
               {orderCountries.map(obj=>{
                   let mayuscula = obj.name[0].toUpperCase() + obj.name.slice(1)
                   return (<option  key={obj.id} name={obj.id} value={obj.name}>{mayuscula}</option>)
               })}
           </select>
           {state.addCountries.length===0 && (<p>{errors.addCountries}</p>)}
        </div>
        <div className={style.addCountries}>
            {/*Paises Agregados*/}
            <ul >
                {state.addCountries.map((country,index)=>{
                    let mayuscula = country[0].toUpperCase() + country.slice(1)
                    return <><li key={index}>{mayuscula}<button key={index} name={index} onClick={e=>handleDeleteOne(e)}>x</button></li></>
                })}
            </ul>
            {state.addCountries[0]?<button className={style.deleteAll} onClick={(e)=>handleDelete(e)}>Delete All</button>:<></>}
        </div>
        <input className={style.submit} type="submit" value="Create" disabled={errors.name  || errors.difficulty || errors.duration|| errors.season||errors.addCountries? true : false}/>
    </form>
    </div>
    {/* Ventana emergente */}
    {warning === true? <div className={style.divContenedor}><div className={style.divAviso}><h2>{message}</h2><button onClick={e=>handleClick(e)}>Accept</button></div></div>: <></> }           
    </>
    )
}
