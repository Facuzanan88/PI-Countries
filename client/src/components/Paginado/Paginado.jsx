import React from 'react';

import style from './Paginado.css'

/* export default function Paginado({ countriesPerPage, allCountries, paginado }) {
    const pageNumber = [];

    for (let i = 0; i < Math.ceil((allCountries / countriesPerPage) + 1); i++) {
        pageNumber.push(i + 1)
    }

    return (
        <nav className="paginateContainer">
            <ul className="paginate">
                {pageNumber &&
                    pageNumber.map((number) => (
                        <li key={number}>
                            <a onClick={() => paginado(number)}> {number} </a>
                        </li>
                    ))}
            </ul>
        </nav>
    )
} */

export default function Paginado({ countriesPerPage, allCountries, paginado, value }) {
    const pageNumbers = []
    for (let i = 0; i <= Math.floor(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i + 1)
    }
    return (
        <div>
            <div className="div-paginado">
                {pageNumbers && pageNumbers.map(number => (
                    <div className="btn-pag" key={number.toString()} >
                        <button
                            className={number === value ? 'actual' : 'boton-paginado'}
                            onClick={() => paginado(number)}>
                            {number}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


