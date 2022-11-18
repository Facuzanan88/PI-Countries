import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getActivities, getCountries, newActivity } from '../../actions';

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

    if (input.season.length === 0) {
        errors.season = 'you must select a season'
    }

    if (!input.duration || input.duration === 0) errors.duration = 'this item is required'
    if (input.duration < 0) errors.duration = 'this item is not valid'

    if (input.country.length === 0) {
        errors.country = 'this item is required'
    };
    return errors
}


export default function ActivityCreate() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allCountries = useSelector((state) => state.countries)

    const OrderCountries = allCountries.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    })


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
            !input.country.length > 0) {
            return alert('You must complete all required items')
        } else {

            function confirmacion() {
                var respuesta = window.confirm('Are you sure you want to create the activity?')
                if (respuesta === true) {
                    if (input.country.length > 1) {
                        console.log(input.country)

                        const dataArr = new Set(input.country);
                        let result = [...dataArr];
                        console.log(result)

                        const act = []
                        for (let i = 0; i < result.length; i++) {
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
            confirmacion()
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
                        <div>
                            {errors.season && (
                                <p className={style.label}>{errors.season}</p>
                            )}

                        </div>
                    </div>

                    <div className={style.season}>
                        <label className={style.label}>Country: </label>
                        <div>
                            <select className={style.option} onChange={(e) => handleSelect(e)}>
                                <option selected disabled>Choose a country</option>
                                {
                                    OrderCountries && OrderCountries.map((c, i) => {
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
