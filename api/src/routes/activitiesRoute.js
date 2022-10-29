const { Router } = require('express');

const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');


const router = Router();

router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, country } = req.body;

    try {
        let [newActivity, created] = await Activity.findOrCreate({
            where: { name, difficulty, duration, season },
            defaults: {
                difficulty,
                duration,
                season
            },
        })
        const countryBd = await Country.findAll({
            where: {
                name: { [Op.iLike]: `%${country}%` },
            },
            include: Activity
        })

        if (!countryBd.length) return res.status(404).json('El pais ingresado no existe')

        /*    console.log(countryBd.activities)
           for (let i = 0; i < countryBd.activities.length; i++) {
               let countryActivity = countryBd.activities[i].findAll({
                   where: { name, season }
               })
               if (countryActivity) return res.status(200).json("El pais ya posee la actividad")
           } */


        await newActivity.addCountry(countryBd);

        if (!created) return res.status(200).json('La actividad ya fue creada correctamente')

        return res.status(200).json("La actividad se creo exitosamente en el pais correspondiente");
    } catch (err) {
        return res.status(404).json("No se pudo crear la actividad en el pais correspondiente");
    }
});

router.get('/', async (req, res) => {
    try {
        const allActivities = await Activity.findAll({ include: Country });
        res.status(200).json(allActivities);
    } catch (error) {
        res.status(404).json("No se pudo cargar las actividades de la Base de Datos")
    }
})

module.exports = router;