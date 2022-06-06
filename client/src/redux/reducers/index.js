import { GET_ALL_COUNTRIES, GET_INFO_COUNTRY, FILTER_BY_CONTINENT, ORDER_AZ, ORDER_ZA, ORDER_LOWER, ORDER_HIGHEST, RESET, GET_COUNTRY_NAME, GET_ACTIVITIES, FILTER_BY_ACTIVITY, RESET_COUNTRY } from "../actions";

const initialState = {
    countries: [],
    copyCountries:[],
    country:[],
    activities: [],
    copyActivities: [],
    //filterDefault: [],
    //filterOn: false
}

export default function rooReducer(state = initialState, action) {
    switch (action.type) {
        case RESET:
            return {
                ...state,
                countries: [],
                copyCountries:[],
                country:[],
            }
        case RESET_COUNTRY:
            return {
                ...state,
                country:[],
            }
        case GET_ALL_COUNTRIES:
           return {
                ...state,
                countries: action.payload,
                copyCountries: action.payload
            }
        case GET_INFO_COUNTRY:
            return {
                ...state,
                country: action.payload
            }
        case GET_COUNTRY_NAME:
            return {
                ...state,
                countries: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
                copyActivities: action.payload
            }

        case FILTER_BY_CONTINENT:
            const allCountries = state.copyCountries;
             const continentFiltered = (action.payload === "default")? state.copyCountries : allCountries.filter(el=> el.continents===action.payload)
            // console.log(continentFiltered,"reducer")
            // const map = allCountries.map(el=> el.continents)
            // console.log(map.sort())
            return {
                ...state,
                countries: continentFiltered
            }
        case FILTER_BY_ACTIVITY:

            const filterAct =(action.payload === "default")? state.copyCountries : state.copyCountries.filter(pais=> pais.activities.map(activity=>activity.name).find(e=>e===action.payload) === action.payload)
            return {
                ...state,
                countries: filterAct
            }

        // case FILTER_ON:
        //     return {
        //         ...state,
        //         filterOn: action.payload
        //     }    
        case ORDER_AZ:
            const AZ = state.countries.sort(function(a,b){
                if(a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1
                } else {
                    return 0
                }
            })
            return {
                ...state,
                countries: AZ
            }
        case ORDER_ZA:
            const ZA = state.countries.sort(function(a,b){
                if(a.name < b.name) {
                    return 1
                } else if (a.name > b.name) {
                        return -1
                } else {
                    return 0
                }
            }) 
            return {
                ...state,
                countries: ZA
            }          
        case ORDER_LOWER:
            const lower = state.countries.sort((a,b)=>{
                if(a.population < b.population) {
                    return -1
                } else if (a.population > b.population) {
                        return 1
                } else {
                    return 0
                }
            })
            return {
                ...state,
                countries: lower
            }
        case ORDER_HIGHEST:
            const highest = state.countries.sort((a,b)=>{
                if(a.population < b.population) {
                    return 1
                } else if (a.population > b.population) {
                        return -1
                } else {
                    return 0
                }
            })
            return {
                ...state,
                countries: highest
            } 
        default:
            return state
    }
}