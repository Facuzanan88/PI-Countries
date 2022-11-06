import axios from 'axios';

export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTERED_BY_REGION = "FILTERED_BY_REGION";
export const FILTERED_BY_ACTIVITIES = "FILTERED_BY_ACTIVITIES";
export const ORDER_BY_ALFA = "ORDER_BY_ALFA";
export const ORDER_BY_POPU = "ORDER_BY_POPU";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const NEW_ACTIVITIES = "NEW_ACTIVITIES";
export const GET_DETAILS = "GET_DETAILS";

export function getCountries() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data,
        })
    }
};

export function searchByName(name) {
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/countries?name=' + name);
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: json.data,
            });
        } catch (error) {
            console.log("El pais ingresado no existe")
        }
    }
};

export function getDetails(id) {
    return async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/countries/${id}`);
        return dispatch({
            type: GET_DETAILS,
            payload: json.data,
        })
    }
}


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

export function orderByAlfa(payload) {
    return {
        type: ORDER_BY_ALFA,
        payload
    }
}

export function orderByPopu(payload) {
    return {
        type: ORDER_BY_POPU,
        payload
    }
}

export function getActivities() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/activities');
        return dispatch({
            type: GET_ACTIVITIES,
            payload: json.data
        })
    }
}

export async function newActivity(payload) {
    let json = await axios.post('http://localhost:3001/activities', payload)
    return json;
}

/* export function newActivity(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/activities', payload)
        console.log(json)
        return {
            type: 'NEW_ACTIVITIES',
            response
        }
    }
} */


