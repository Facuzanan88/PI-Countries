import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getActivities, getCountries, newActivity } from '../actions';

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

    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivities())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

    function handleSelect(e) {
        setInput({
            ...input,
            country: e.target.value
        })
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
                </div>

                <div>
                    <label>Difficulty: </label>
                    <input
                        type="number"
                        value={input.difficulty}
                        name="difficulty"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div>
                    <label>Duration: </label>
                    <input
                        type="number"
                        value={input.duration}
                        name="duration"
                        onChange={(e) => handleChange(e)}
                    />
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
                                        on
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