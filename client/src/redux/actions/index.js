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
export const ORDER_POPULATION = "ORDER_POPULATION"
export const ORDER_HIGHEST = "ORDER_HIGHEST"
export const FILTER_ON = "FILTER_ON"
export const POST_ACTIVITY = "POST_ACTIVITY"
export const REFRESH = "REFRESH"
export const SET_COUNTRIES= "SET_COUNTRIES"
export const RESET_WARNING = "RESET_WARNING"
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
export function refresh(){
    return {
        type: REFRESH
    }
}

export function setCountries(payload){
    return {
        type: SET_COUNTRIES,
        payload
    }
}


export function getAllCountries(){
    return (async (dispatch)=>{
        try {
            const countries = await axios.get("/countries")
            return dispatch({
                
                type: GET_ALL_COUNTRIES,
                payload: countries.data
            })
            
        } catch (error) {
            console.log(error)
        }
    })
}
// export function getInfoCountry(id){
//     return (async (dispatch)=>{
//         try {
//             const country = await axios.get(`http://localhost:3001/countries/${id}`)
//             return dispatch({
//                 type: GET_INFO_COUNTRY,
//                 payload: country.data
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     })
// }

export function getInfoCountry(id){
    return  (dispatch)=>{

        return axios.get(`/countries/${id}`)
            .then(
                res =>{
                    //console.log(res.data)
                    return dispatch({
                        type: GET_INFO_COUNTRY,
                        payload: res.data
                    })
                }
            ).catch(err=>err)
            //     dispatch({
            //         type: GET_INFO_COUNTRY,
            //         payload: country.data
            //     }
            // )       
}
}
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



export function getCountryName(name) {

    return  (async (dispatch) => {
        try {
            const countries = await axios(`/countries?name=${name}`)
            if(countries.data) {
                return dispatch({
                    type: GET_COUNTRY_NAME,
                    payload: countries.data 
                   });   
            }
        } catch (error) {
            //console.log(error.response.data.message)
            return dispatch({
                type: GET_COUNTRY_NAME,
                payload: error.response.data.message
               });   
            //alert(error.response.data.message)
        }
    })
    
}

export function getActivities() {
    return (async (dispatch)=>{
        return axios.get(`/activity`)
        .then(res=>{
            return dispatch({
                type: GET_ACTIVITIES,
                payload: res.data
            })
        }).catch(err=>err)
        // try {
        //     const activities = await axios(`http://localhost:3001/activity`)
        //     return dispatch({
        //         type: GET_ACTIVITIES,
        //         payload: activities.data
        //     })
        // } catch (error) {
        //     console.log(error)
        // }


    })
}

export function postActivity(body) {
    return async (dispatch) => {
        try {
            const res = (await axios.post("/activity", body)).data
            //console.log(res)
            return dispatch({ type: POST_ACTIVITY, payload: res.message});
        } catch (error) {
            //console.log(error);
            return dispatch({ type: POST_ACTIVITY, payload: error.response.data.message});
        }

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

export function orderAZ(payload){
    return {
        type: ORDER_AZ,
        payload
    }
}
export function orderPopulation(payload){
    return {
        type: ORDER_POPULATION,
        payload
    }
}

export function resetWarning(){
    return {
        type: RESET_WARNING,
    }
}


// export function orderHighest(){
//     return {
//         type: ORDER_HIGHEST,
//     }
// }

// export function filterOn(payload){
//     return {
//         type: FILTER_ON,
//         payload
//     }
// }