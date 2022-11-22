import { GET_COUNTRIES, FILTERED_BY_REGION, FILTERED_BY_ACTIVITIES, ORDER_BY_ALFA, ORDER_BY_POPU, SEARCH_BY_NAME, GET_ACTIVITIES, NEW_ACTIVITIES, GET_DETAILS, ORDER_BY_AREA } from "../actions";

const initialState = {
    allCountries: [],
    countries: [],
    countriesDetails: [],
    activities: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case SEARCH_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }

        case GET_DETAILS:
            return {
                ...state,
                countriesDetails: action.payload
            }

        case FILTERED_BY_REGION:
            const allCountries = state.allCountries;
            const regionFiltered = action.payload === "allRegion" ? allCountries
                : allCountries.filter(c => c.region === action.payload)
            return {
                ...state,
                countries: regionFiltered
            }

        case FILTERED_BY_ACTIVITIES:
            const allCountries2 = state.allCountries;
            const activitiesFiltered = action.payload === "allActivities" ? allCountries2.filter(c => c.activities.length > 0) :
                allCountries2.filter(c => c.activities.map(a => a.name).includes(action.payload))
            return {
                ...state,
                countries: activitiesFiltered
            }

        case ORDER_BY_ALFA:
            const allCountries3 = state.countries
            const countriesOrdered = action.payload === "Asc" ? allCountries3.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                } else {
                    return 0;
                }
            })
                : allCountries3.sort((a, b) => {
                    if (a.name < b.name) {
                        return 1;
                    } else if (a.name > b.name) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            return {
                ...state,
                countries: countriesOrdered
            }

        case ORDER_BY_POPU:
            const allCountries4 = state.countries
            const ordenedCountries = action.payload === "poblacionAsc" ? allCountries4.sort((a, b) => {
                if (a.population < b.population) {
                    return -1;
                } else if (a.population > b.population) {
                    return 1;
                } else {
                    return 0;
                }
            })
                : allCountries4.sort((a, b) => {
                    if (a.population < b.population) {
                        return 1;
                    } else if (a.population > b.population) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            return {
                ...state,
                countries: ordenedCountries
            }

        case ORDER_BY_AREA:
            const allCountries5 = state.countries
            const ordenedCountriesS = action.payload === "areaAsc" ? allCountries5.sort((a, b) => {
                if (a.area < b.area) {
                    return -1;
                } else if (a.area > b.area) {
                    return 1;
                } else {
                    return 0;
                }
            })
                : allCountries5.sort((a, b) => {
                    if (a.area < b.area) {
                        return 1;
                    } else if (a.area > b.area) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            return {
                ...state,
                countries: ordenedCountriesS
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }

        case NEW_ACTIVITIES:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default rootReducer;