import React from 'react';
import { Link } from 'react-router-dom';


export default function landingPage() {
    return (
        <div>
            <h1>Welcome to my Countries Page</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}