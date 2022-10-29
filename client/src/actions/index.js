import axios from 'axios';

export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTERED_BY_REGION = "FILTERED_BY_REGION";
export const FILTERED_BY_ACTIVITIES = "FILTERED_BY_ACTIVITIES";

export function getCountries() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data,
        })
    }
};

export function countriesFilteredByRegion(payload) {
    return {
        type: FILTERED_BY_REGION,
        payload
    }
};

export function countriesFilteredByActivities(payload) {
    return {
        type: FILTERED_BY_ACTIVITIES,
        payload
    }
};