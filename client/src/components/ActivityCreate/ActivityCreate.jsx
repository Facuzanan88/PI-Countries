import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { countriesFilteredByRegion, getActivities, getCountries, newActivity } from '../../actions';

import style from './ActivityCreate.module.css';

function validate(input) {
    let errors = {};
    const regexName = /^[A-z ,í-ñ-Ü-ü]{4,20}$/
    if (!input.name) {
        errors.name = 'this item is required'
    } else if (!regexName.test(input.name)) {
        errors.name = 'The name is invalid'
    }

    if (!input.difficulty) {
        errors.difficulty = 'this item is required'
    } else if (input.difficulty < 1 || input.difficulty > 5) {
        errors.difficulty = 'This item is out of the required range'
    }

    if (input.season.length < 1) {
        errors.season = 'this item is required'
    } else if (input.season.length !== 0) {
        errors.season = 'Only one season can be selected'
    }

    if (!input.duration || input.duration === null) errors.duration = 'this item is required'
    if (input.duration <= 0) errors.duration = 'this item is not valid'

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
        if (!input.name ||
            input.name.length > 20 ||
            input.name.length < 3 ||
            input.difficulty < 1 ||
            input.difficulty > 5 ||
            !input.duration ||
            !input.season ||
            !input.country.length) {
            return alert('You must complete all required items')
        } else {
            if (input.country.length > 1) {
                console.log(input.country)
                const act = []
                for (let i = 0; i < input.country.length; i++) {
                    act.push({
                        name: input.name,
                        difficulty: input.difficulty,
                        duration: input.duration,
                        season: input.season,
                        country: [input.country[i]],
                    })
                }
                console.log(act)
                for (let i = 0; i < act.length; i++) {
                    dispatch(newActivity(act[i]))
                }
                alert('The activity was created successfully')
                history.push('/home')
            } else {
                dispatch(newActivity(input))
                alert('The activity was created successfully')
                history.push('/home')
            }
        }
    }

    function countries() {
        const countri = [];
        for (let i = 0; i < input.country.length; i++) {
            for (let j = 0; j < allCountries.length; j++) {
                if (input.country[i] === allCountries[j].name) {
                    countri.push(allCountries[j])
                }
            }
        }
        return countri;
    }

    const filterCountry = countries();

    let hash = {};
    const filterCountry2 = filterCountry.filter(o => (hash[o.name] ? false : hash[o.name] = true));


    return (
        <div>
            <header className={style.header}>
                <Link to="home"><button className={style.button}>BACK</button></Link>
            </header>

            <div className={style.divero}>
                <form className={style.form} onSubmit={(e) => handleSubmit(e)} >
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
                        <div>
                            <select className={style.option} onChange={(e) => handleSelect(e)}>
                                <option>------------------</option>
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
                    </div>
                    <footer className={style.footer}>
                        <button className={style.button} >Created</button>
                    </footer>
                </form >
                <div className={style.countryletter2}>
                    {
                        filterCountry2 && filterCountry2.map(s => {
                            return (
                                <div className={style.countryletter} >
                                    <button className={style.delete} onClick={() => handleDelete(s.name)}>X</button>
                                    <label className={style.country}> {s.name} </label>
                                    <img className={style.img} src={s.flag} width="25px" height="20px" alt="flag not found" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}
