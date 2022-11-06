import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'


export default function landingPage() {
    return (
        <div>
            <h1>Welcome to my Countries Page</h1>
            <Link to='/home'>
                <button className={style.button}>Ingresar</button>
            </Link>
        </div>
    )
}