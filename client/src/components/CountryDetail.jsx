import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getDetails } from '../actions'

export default function CountryDetail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(props.match.params.id));
    })

    const countriesDetails = useSelector((state) => state.countriesDetails)

    return (
        <div>
            <h1>{countriesDetails.name}</h1>
            <img src={countriesDetails.flag} alt="flag not found" />
            <h3>{countriesDetails.id}</h3>
            <h3>{countriesDetails.region}</h3>
            <h4>{countriesDetails.capital}</h4>
            <h4>{countriesDetails.subregion}</h4>
            <h4>{countriesDetails.area}</h4>
            <h4>{countriesDetails.population}</h4>
            <h5>Activities: {countriesDetails.activities && countriesDetails.activities.map((act) => (act.name + " "))}</h5>
            <Link to="/home">VOLVER</Link>
        </div>
    )






}