import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getDetails, deleteActivity } from '../../actions'

import ActivityCard from '../ActivityCard/ActivityCard';

import style from './CountryDetail.module.css'
import Footer from '../Footer/Footer';

export default function CountryDetail(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getDetails(props.match.params.id));
    }, [props.match.params.id, dispatch])

    function handleDelete(id) {
        function confirmacion() {
            var respuesta = window.confirm('Are you sure you want to delete this activity?')
            if (respuesta === true) {
                dispatch(deleteActivity(id));
                alert('The activity was delete successfully')
                history.push(`/home`)
            }
        }
        confirmacion();
    }

    const countriesDetails = useSelector((state) => state.countriesDetails)

    return (
        <main className={style.main}>
            <header className={style.header}>
                <Link to="/home">
                    <button className={style.button}>BACK</button>
                </Link>
            </header>
            <div className={style.conteiner}>
                <h1 className={style.tilte}>{countriesDetails.name}</h1>

                <img className={style.img} src={countriesDetails.flag} alt="flag not found" />

                <div className={style.div}>
                    <section>
                        <label>ID:</label>
                        <h3>{countriesDetails.id}</h3>
                    </section>
                    <section>
                        <label>Region:</label>
                        <h3>{countriesDetails.region}</h3>
                    </section>
                    <section>
                        <label>Capital:</label>
                        <h4>{countriesDetails.capital}</h4>
                    </section>
                    <section>
                        <label>Subregion:</label>
                        <h4>{countriesDetails.subregion}</h4>
                    </section>
                    <section>
                        <label>Area</label>
                        <h4>{countriesDetails.area} Km2</h4>
                    </section>
                    <section>
                        <label>Population:</label>
                        <h4>{countriesDetails.population}</h4>
                    </section>
                </div>

                <div className={style.labelact}>
                    <label >Activities:</label>
                </div>
                <div className={style.activities}>
                    <h5>{countriesDetails.activities
                        && countriesDetails.activities.map((act) =>
                            <div className={style.activities2}>
                                <button onClick={() => handleDelete(act.id)}>X</button>
                                <ActivityCard
                                    name={act.name}
                                    difficulty={act.difficulty}
                                    duration={act.duration}
                                    season={act.season}
                                />
                            </div>
                        )}</h5>
                </div>
            </div>
            <div className={style.footer}>
                <Footer />
            </div>
        </main>
    )






}