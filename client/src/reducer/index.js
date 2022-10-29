import { GET_COUNTRIES, FILTERED_BY_REGION, FILTERED_BY_ACTIVITIES } from "../actions";

const initialState = {
    allCountries: [],
    countries: [],
    allACtivities: ["barquet", "surf"],
    activities: ["barquet", "surf"],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
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

        default:
            return state;
    }
}

export default rootReducer;