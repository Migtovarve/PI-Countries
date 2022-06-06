import axios from "axios"
export const RESET = "RESET"
export const RESET_COUNTRY = "RESET_COUNTRY"
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const GET_INFO_COUNTRY = "GET_INFO_COUNTRY"
export const GET_COUNTRY_NAME = "GET_COUNTRY_NAME"
export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT"
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY"
export const ORDER_AZ = "ORDER_AZ"
export const ORDER_ZA = "ORDER_ZA"
export const ORDER_LOWER = "ORDER_LOWER"
export const ORDER_HIGHEST = "ORDER_HIGHEST"
export const FILTER_ON = "FILTER_ON"
// export default function getAllCountries() {
//     return (dispatch)=>{
//         return axios.get("http://localhost:3001/countries")
//         .then(data => {
//            return dispatch({
//                 type: GET_ALL_COUNTRIES,
//                 payload: data
//             })
//         }).catch(err=> err)
//     }
// }

export function reset(){
    return {
        type: RESET,
    }
}
export function resetCoutry(){
    return {
        type: RESET_COUNTRY
    }
}
export function getAllCountries(){
    return (async (dispatch)=>{
        try {
            const countries = await axios.get("http://localhost:3001/countries")
            return dispatch({
                
                type: GET_ALL_COUNTRIES,
                payload: countries.data
            })
            
        } catch (error) {
            console.log(error)
        }
    })
}
export function getInfoCountry(id){
    return (async (dispatch)=>{
        try {
            const country = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch({
                type: GET_INFO_COUNTRY,
                payload: country.data
            })
        } catch (error) {
            console.log(error)
        }
    })
}

export function getCountryName(name) {

    return  (async (dispatch) => {
        try {
            const countries = await axios(`http://localhost:3001/countries?name=${name}`)
            if(countries.data) {
                return dispatch({
                    type: GET_COUNTRY_NAME,
                    payload: countries.data 
                   });   
            }
        } catch (error) {
            console.log(error)
            alert("error: el pais no existe")
        }
    })
    
}

export function getActivities() {
    return (async (dispatch)=>{

        try {
            const activities = await axios(`http://localhost:3001/activity`)
            return dispatch({
                type: GET_ACTIVITIES,
                payload: activities.data
            })
        } catch (error) {
            console.log(error)
        }


    })
}

export function postActivity(body) {

    try {
        
    } catch (error) {
        
    }
}


export function filterByActivity(payload){
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    }
} 

export function filterByContinent(payload){
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
} 

export function orderAZ(){
    return {
        type: ORDER_AZ,
    }
}

export function orderZA(){
    return {
        type: ORDER_ZA,
    }
}

export function orderLower(){
    return {
        type: ORDER_LOWER,
    }
}

export function orderHighest(){
    return {
        type: ORDER_HIGHEST,
    }
}

// export function filterOn(payload){
//     return {
//         type: FILTER_ON,
//         payload
//     }
// }