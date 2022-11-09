import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getActivities, getCountries, newActivity } from '../../actions';

import style from './ActivityCreate.module.css';

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
    /* const history = useHistory(); */

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
            country: [...input.country, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleDelete(e) {
        setInput({
            ...input,
            country: input.country.filter(cou => cou !== e)
        })

    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(newActivity(input));
    }

    return (
        <div>
            <header className={style.header}>
                <Link to="home"><button className={style.button}>BACK</button></Link>
            </header>

            <div className={style.divero}>
                <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                    <h3 className={style.label}>Create an Activity: </h3>

                    <div className={style.div}>
                        <input
                            type="text"
                            value={input.name}
                            name="name"
                            className={style.input}
                            placeholder="name"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                            <p className={style.label}>{errors.name}</p>
                        )}
                        {/* <label>Name: </label> */}
                    </div>

                    <div className={style.div}>
                        <input
                            type="number"
                            value={input.difficulty}
                            name="difficulty"
                            className={style.input}
                            placeholder="difficulty"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.difficulty && (
                            <p className={style.label}>{errors.difficulty}</p>
                        )}
                        {/*  <label>Difficulty: </label> */}
                    </div>

                    <div className={style.div}>
                        <input
                            type="number"
                            value={input.duration}
                            name="duration"
                            className={style.input}
                            placeholder="duration (hs)"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.duration && (
                            <p className={style.label}>{errors.duration}</p>
                        )}
                        {/* <label>Duration: </label> */}
                    </div>


                    <div className={style.div}>
                        {
                            season && season.map((s) => {
                                return (
                                    <label className={style.label}>
                                        <input
                                            type="radio"
                                            value={s}
                                            name='season'
                                            onChange={(e) => handleCheck(e)}
                                        />{s} </label>
                                )
                            })
                        }
                    </div>

                    <div className={style.season}>
                        <label className={style.label}>Country: </label>
                        <div className={style.divero}>
                            <select className={style.option} onChange={(e) => handleSelect(e)}>
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
                            {errors.country && (
                                <p className={style.label}>{errors.country}</p>
                            )}
                        </div>
                        <div>
                            {
                                input.country && input.country.map(s => {
                                    return (
                                        <div>
                                            <label className={style.country}> {s} </label>
                                            <button onClick={() => handleDelete(s)}>X</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <footer className={style.footer}>
                        <button className={style.button}>Created</button>
                    </footer>
                </form >
            </div>
        </div >
    )
}