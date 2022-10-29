import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CountryCard from './CountryCard';
import Paginado from './Paginado';

import { getCountries, countriesFilteredByRegion, countriesFilteredByActivities } from '../actions';



export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)
    const allActivities = useSelector((state) => state.activities)

    const regiones = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania', 'Antarctic']

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage - 1;
    const indexOfFirstCountry = currentPage === 1 ? indexOfLastCountry - (countriesPerPage - 1) : indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getCountries())
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


    return (
        <div>
            <Link to='/activities'>
                <h3>Crear una Actividad Nueva</h3>
            </Link>

            <button onClick={(e) => { handleOnClick(e) }}>Cargar todos los Paises</button>

            <label>
                Ordenar por Orden Alfabetico o viceversa:
                <select>
                    <option value="ascendente">A - Z</option>
                    <option value="descendente">Z - A</option>
                </select>
            </label>

            <label>
                Ordenar por Poblacion:
                <select>
                    <option value="poblacionAsc">Poblacion Ascendente</option>
                    <option value="PoblacionDesc">Poblacion Descendente</option>
                </select>
            </label>

            <label>
                Filtrado por Continente:
                <select onChange={(e) => handleFilteredByRegion(e)}>
                    <option value="allRegion">All Region</option>
                    {regiones.map((region) => {
                        return <option value={region}> {region} </option>
                    })}
                </select>
            </label>

            <label>
                Filtrado por Actividad:
                <select onChange={(e) => handleFilteredByActivities(e)}>
                    <option value="allActivities">All Activities</option>
                    {allActivities.map((activity) => {
                        return <option value={activity}> {activity} </option>
                    })}
                </select>
            </label>

            <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            />

            {
                currentCountries && currentCountries.map((c) => {
                    return (
                        <fragment>
                            <Link to={"/countries/" + c.id}>
                                <CountryCard
                                    name={c.name}
                                    flag={c.flag}
                                    region={c.region}
                                />
                            </Link>
                        </fragment>
                    )
                })
            }

        </div>
    )

}

