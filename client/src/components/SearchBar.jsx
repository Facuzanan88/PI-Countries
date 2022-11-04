import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchByName } from '../actions';


export default function SearchBar() {
    const dispatch = useDispatch();

    let [name, setName] = useState('');

    function handleChangeName(e) {
        e.preventDefault();
        setName(e.target.value);

    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchByName(name));
        setName('');
    }

    return (
        <div>
            <input
                type="text"
                placeholder='Nombre de Pais'
                value={name}
                onChange={(e) => handleChangeName(e)} />

            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )



}