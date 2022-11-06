import React from 'react';

export default function ActivityCard({ name, difficulty, duration, season }) {
    return (
        <div>
            <p><b>Name: </b>{name}</p>
            <p><b>Difficulty: </b>{difficulty}</p>
            <p><b>Duration: </b>{duration} horas</p>
            <p><b>Season: </b>{season}</p>
        </div>


    )
}