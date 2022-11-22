import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchByName } from '../../actions';

import style from './SearchBar.module.css'

export default function SearchBar({ setCurrentPage }) {
    const dispatch = useDispatch();

    let [name, setName] = useState('');

    function handleChangeName(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name === "") return alert('Enter a country')
        dispatch(searchByName(name));
        setCurrentPage(1);
        setName('');
    }

    return (
        <div>
            <input
                type="text"
                placeholder='Country Name'
                value={name}
                className={style.input}
                onChange={(e) => handleChangeName(e)} />

            <button className={style.button} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )



}