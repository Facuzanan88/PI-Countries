import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchByName } from '../../actions';

import style from './SearchBar.module.css'

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
                className={style.input}
                onChange={(e) => handleChangeName(e)} />

            <button className={style.button} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )



}