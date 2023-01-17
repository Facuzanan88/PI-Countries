import React from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function Footer() {
    return (
        <div>
            <div className={style.container}>
                <div className={style.name}>
                    <p>Copyright © Facu Zanandrea 2022</p>
                </div>
                <div className={style.icons}>
                    <a target='_blank' href="https://twitter.com/FacuZanandrea" rel="noreferrer">
                        <h4 className={style.icon}><BsTwitter /></h4>
                    </a>
                    <a target='_blank' href="https://github.com/Facuzanan88" rel="noreferrer">
                        <h4 className={style.icon}><BsGithub /></h4>
                    </a>
                    <a target='_blank' href="https://www.linkedin.com/in/facundo-zanandrea-884958247/" rel="noreferrer">
                        <h4 className={style.icon}><BsLinkedin /></h4>
                    </a>
                </div>
            </div >
        </div >
    )
}