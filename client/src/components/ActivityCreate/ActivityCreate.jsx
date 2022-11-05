import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getActivities, getCountries, newActivity } from '../../actions';

function validate(input) {
    let errors = {};
    const regexName = /^[A-z ,í-ñ-Ü-ü]{4,20}$/
    if (!input.name) {
        errors.name = 'Este campo es requerido'
    } else if (!regexName.test(input.name)) {
        errors.name = 'El nombre de la actividad debe contener solo letras, ser mayor a 4 caracteres y menor a 20 caracteres'
    }

    if (!input.difficulty) {
        errors.difficulty = 'Este campo es requerido'
    } else if (input.difficulty < 1 || input.difficulty > 5) {
        errors.difficulty = 'Este campo esta fuera del rango requerido'
    }

    if (input.season.length < 1) {
        errors.season = 'Este campo es requerido'
    } else if (input.season.length !== 0) {
        errors.season = 'Solo se puede seleccionar una season'
    }

    if (!input.duration) {
        errors.duration = 'Este campo es requerido'
    }

    if (!input.country.length) {
        errors.country = 'Este campo es requerido'
    };
    return errors
}


export default function ActivityCreate() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.activities)

    const season = ['Winter', 'Spring', 'Summer', 'Autumn']

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: [],
    })

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivities())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                season: e.target.value
            })
        }
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            country: e.target.value
        })
        setErrors(validate({
            ...input,

        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(newActivity(input));
    }

    return (
        <div>
            <Link to="home"><button>BACK</button></Link>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Difficulty: </label>
                    <input
                        type="number"
                        value={input.difficulty}
                        name="difficulty"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.difficulty && (
                        <p>{errors.difficulty}</p>
                    )}
                </div>

                <div>
                    <label>Duration: </label>
                    <input
                        type="number"
                        value={input.duration}
                        name="duration"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.duration && (
                        <p>{errors.duration}</p>
                    )}
                </div>

                <div>
                    {
                        season && season.map((s) => {
                            return (
                                <label>
                                    <input
                                        type="checkbox"
                                        value={s}
                                        name={s}
                                        onChange={(e) => handleCheck(e)}
                                    />{s} </label>
                            )
                        })
                    }
                    {errors.season && (
                        <p>{errors.season}</p>
                    )}
                </div>

                <div>
                    <label>Country: </label>
                    <select onChange={(e) => handleSelect(e)}>
                        <option>-----</option>
                        {
                            allCountries && allCountries.map((c, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={c.name}
                                        name={c.name}
                                    >{c.name}</option>
                                )
                            })
                        }
                    </select>
                    <label>{input.country}</label>
                </div>
                <button>X</button>
            </form>
        </div>
    )
}