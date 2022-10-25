import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-reducer';
import state from '../reducer';
import { Link } from 'react-router-dom';

import { getCountries } from '../actions';


export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useState((state) => state.countries)

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    function handleClick(event) {
        event.preventDefault();
        dispatch(getCountries());
    }

    return (
        <div>
            <Link to='/activities'>
                <h1>Crear una Actividad Nueva</h1>
            </Link>
            <button handleClick={e => { e.handleClick(e) }}>Cargar todos los Paises</button>
        </div>
    )

}