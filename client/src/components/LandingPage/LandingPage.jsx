import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'
import Footer from '../Footer/Footer';


export default function landingPage() {
    return (
        <div className={style.body}>
            <h1 className={style.title}>Welcome to my Countries Page</h1>
            <Link to='/home'>
                <button className={style.button}>Let Do It!</button>
            </Link>
            <div className={style.footer}>
                <Footer />
            </div>
        </div>
    )
}