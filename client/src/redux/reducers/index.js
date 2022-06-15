import { GET_ALL_COUNTRIES, GET_INFO_COUNTRY, FILTER_BY_CONTINENT, ORDER_AZ, ORDER_ZA, ORDER_LOWER, ORDER_HIGHEST, RESET, GET_COUNTRY_NAME, GET_ACTIVITIES, FILTER_BY_ACTIVITY, RESET_COUNTRY, POST_ACTIVITY, REFRESH, ORDER_POPULATION, SET_COUNTRIES,RESET_WARNING } from "../actions";

const initialState = {
    countries: [],
    copyCountries:[],
    country:[],
    activities: [],
    copyActivities: [],
    old:[],
    warning: false,
    message:"",
    //filterDefault: [],
    //filterOn: false
}

export default function rooReducer(state = initialState, action) {
    switch (action.type) {
        case RESET:
            return {
                countries: [],
                copyCountries:[],
                country:[],
                activities: [],
                copyActivities: [],
                old:[]
            }
        case RESET_COUNTRY:
            return {
                ...state,
                country:[],
                countries: state.copyCountries,
                activities:[]
            }
        case RESET_WARNING:
            return {
                ...state,
                warning: false,
                message: ""
            }

        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        case REFRESH:
            return {
                ...state,
                countries: state.copyCountries
            }
        case GET_ALL_COUNTRIES:
           return {
                ...state,
                countries: action.payload,
                copyCountries: action.payload,
                old: action.payload
            }
        case GET_INFO_COUNTRY:
            return {
                ...state,
                country: action.payload
            }
        case GET_COUNTRY_NAME:
            if( typeof action.payload === "string"){
                alert(action.payload)
                return {
                    ...state,
                    countries: state.copyCountries
                }
            }else {
                return {
                    ...state,
                    countries: action.payload
                }
            }
            
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
                copyActivities: action.payload
            }
        case POST_ACTIVITY :
            //alert(action.payload)
            return {
                ...state,
                warning: true,
                message: action.payload
            }
        case FILTER_BY_CONTINENT:
            const allCountries = state.copyCountries.slice();
             const continentFiltered = (action.payload === "default")? state.copyCountries.slice() : allCountries.filter(el=> el.continents===action.payload)
            // console.log(continentFiltered,"reducer")
            // const map = allCountries.map(el=> el.continents)
            // console.log(map.sort())
            return {
                ...state,
                countries: continentFiltered,
                old: continentFiltered
            }
        case FILTER_BY_ACTIVITY:
            //console.log("hola desde activity")
            const filterAct = (action.payload === "default")? state.copyCountries.slice() : state.copyCountries.slice().filter(pais=> pais.activities.map(activity=>activity.name).find(e=>e===action.payload) === action.payload)
            return {
                ...state,
                countries: filterAct,
                old: filterAct
            }

        // case FILTER_ON:
        //     return {
        //         ...state,
        //         filterOn: action.payload
        //     }    
        case ORDER_AZ:
            let orderCountries
          if( action.payload === "ascending") {
                orderCountries = state.countries?.slice().sort(function(a,b){
                    if(a.name > b.name) {
                        return 1
                    } else if (a.name < b.name) {
                        return -1
                    } else {
                        return 0
                    }
                })
            } else if(action.payload ==="descending") {
                orderCountries = state.countries?.slice().sort(function(a,b){
                    if(a.name < b.name) {
                        return 1
                    } else if (a.name > b.name) {
                            return -1
                    } else {
                        return 0
                    }
                }) 
            } else {
                    orderCountries = state.old
            }
            //console.log(orderCountries)
            return {
                ...state,
                countries: orderCountries
            }
            
        case ORDER_POPULATION:
            let orderPopulation
            if(action.payload==="lower"){
                orderPopulation = state.countries?.slice().sort((a,b)=>{
                if(a.population < b.population) {
                    return -1
                } else if (a.population > b.population) {
                    return 1
                } else {
                    return 0
                }
                })
            }else if(action.payload==="highest") {
                orderPopulation = state.countries?.slice().sort((a,b)=>{
                        if(a.population < b.population) {
                                return 1
                            } else if (a.population > b.population) {
                                return -1
                            } else {
                                return 0
                            }
                        })
            } else {
                orderPopulation= state.old
            }
            return {
                ...state,
                countries: orderPopulation
            }
        // case ORDER_ZA:
        //     const ZA = state.countries.sort(function(a,b){
        //         if(a.name < b.name) {
        //             return 1
        //         } else if (a.name > b.name) {
        //                 return -1
        //         } else {
        //             return 0
        //         }
        //     }) 
        //     return {
        //         ...state,
        //         countries: ZA
        //     }          
        // case ORDER_HIGHEST:
        //     const highest = state.countries.sort((a,b)=>{
        //         if(a.population < b.population) {
        //             return 1
        //         } else if (a.population > b.population) {
        //                 return -1
        //         } else {
        //             return 0
        //         }
        //     })
        //     return {
        //         ...state,
        //         countries: highest
        //     } 
        default:
            return state
    }
}