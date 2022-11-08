import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CountryCard from '../CountryCard/CountryCard';
import Paginado from '../Paginado/Paginado';

import { getCountries, countriesFilteredByRegion, countriesFilteredByActivities, orderByAlfa, orderByPopu, getActivities } from '../../actions';
import SearchBar from '../SearchBar/SearchBar';

import style from './Home.module.css'



export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)
    const allActivities = useSelector((state) => state.activities)

    const regiones = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania', 'Antarctic']

    const [orden, setOrden] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage - 1;
    const indexOfFirstCountry = currentPage === 1 ? indexOfLastCountry - (countriesPerPage - 1) : indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    const length = allCountries?.length;

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])

    function handleOnClick(event) {
        event.preventDefault();
        dispatch(getCountries());
    }

    function handleFilteredByRegion(e) {
        dispatch(countriesFilteredByRegion(e.target.value))
    }

    function handleFilteredByActivities(e) {
        dispatch(countriesFilteredByActivities(e.target.value))
    }

    function handleOrderByAlfa(e) {
        e.preventDefault();
        dispatch(orderByAlfa(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
    }

    function handleOrderByPopu(e) {
        e.preventDefault();
        dispatch(orderByPopu(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
    }


    return (
        <div>
            <header>
                <section className={style.searchbar}>
                    <Link to='/activities'>
                        <button className={style.button}>Crear una Actividad Nueva</button>
                    </Link>

                    <SearchBar />
                </section>

                <button className={style.button} onClick={(e) => { handleOnClick(e) }}>Cargar todos los Paises</button>

                <section className={style.section} defaultValue='Order by Name'>
                    <section className={style.filter}>
                        <label className={style.label}>
                            Order By Name:
                        </label>
                        <select className={style.option} onChange={(e) => { handleOrderByAlfa(e) }}>
                            <option hidden>Order by Name</option>
                            <option value="Asc">A - Z</option>
                            <option value="Desc">Z - A</option>
                        </select>
                    </section>

                    <section className={style.filter}>
                        <label className={style.label}>
                            Order By Population:
                        </label>
                        <select className={style.option} onChange={(e) => { handleOrderByPopu(e) }}>
                            <option hidden>Order By Population</option>
                            <option value="poblacionAsc">Poblacion Ascendente</option>
                            <option value="PoblacionDesc">Poblacion Descendente</option>
                        </select>
                    </section>

                    <section className={style.filter}>
                        <label className={style.label}>
                            Filter by Region:
                        </label>
                        <select className={style.option} onChange={(e) => handleFilteredByRegion(e)}>
                            <option hidden>Filter by Region</option>
                            <option value="allRegion">All Region</option>
                            {regiones.map((region) => {
                                return <option value={region}> {region} </option>
                            })}
                        </select>
                    </section>

                    <section className={style.filter}>
                        <label className={style.label}>
                            Filter by Activities:
                        </label>
                        <select className={style.option} onChange={(e) => handleFilteredByActivities(e)}>
                            <option value="allActivities">All Activities</option>
                            {allActivities.map((activity) => {
                                return <option value={activity.name}> {activity.name} </option>
                            })}
                        </select>
                    </section>
                </section>

            </header>

            {/*   <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            /> */}
            <Paginado
                value={currentPage}
                countriesPerPage={countriesPerPage}
                allCountries={length}
                paginado={paginado}
            />

            <div className={style.card}>
                {
                    currentCountries && currentCountries.map((c) => {
                        return (
                            <div>

                                <CountryCard
                                    name={c.name}
                                    flag={c.flag}
                                    region={c.region}
                                    id={c.id}
                                />

                            </div>
                        )
                    })
                }
            </div>
        </div >
    )

}

