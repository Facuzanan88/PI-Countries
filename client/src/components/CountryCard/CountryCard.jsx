import React from 'react';
import { Link } from 'react-router-dom';

import style from './CountryCard.module.css'

export default function CountryCard({ name, flag, region, id }) {
    return (
        <div className={style.card1}>
            <div className={style.card}>
                <div className={style.card2}>
                    <Link to={"/countries/" + id}>
                        <img src={flag} alt={name} className={style.img} />
                    </Link>
                    <section className={style.label}>
                        <h3>{name}</h3>
                        <h4>{region}</h4>
                    </section>
                </div>
            </div>
        </div>
    )
}