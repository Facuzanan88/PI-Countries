import React from 'react';

import style from './Paginado.module.css';

export default function Paginado({ countriesPerPage, allCountries, paginado, value }) {
    const pageNumbers = []
    for (let i = 0; i <= Math.floor(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i + 1)
    }
    return (
        <div>
            <div className={style.divpaginado}>
                {pageNumbers && pageNumbers.map(number => (
                    <div className={style.btnpag} key={number.toString()} >
                        <button
                            className={number === value ? style.actual : style.botonpaginado}
                            onClick={() => paginado(number)}>
                            {number}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


