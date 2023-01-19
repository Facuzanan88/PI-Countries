const { Router, request } = require('express');

const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');


const router = Router();

router.get('/', async (req, res) => {
    try {
        const allActivities = await Activity.findAll({ include: Country });
        res.status(200).json(allActivities);
    } catch (error) {
        res.status(404).json("No se pudo cargar las actividades de la Base de Datos")
    }
})

router.post('/', async (req, res) => {
    try {
        const {
            name,
            country,
            duration,
            difficulty,
            season,
        } = req.body

        const [newActivity, created] = await Activity.findOrCreate({
            where: { name, difficulty, duration, season },
            defaults: {
                difficulty,
                duration,
                season,
            },
        })

        const countryFind = await Country.findAll({
            where: {
                name: { [Op.or]: country }
            },
            include: Activity
        })

        await newActivity.addCountry(countryFind)
        !created ? res.status(200).json('The activity has already been created for these countries')
            : res.status(201).json(newActivity)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            let activity = await Activity.findByPk((id),
                { include: Country });
            activity ? res.status(200).json(activity) : res.status(400).send('not found');
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let deleteAct = await Activity.destroy({
            where: { id }
        })
        deleteAct ? res.status(200).json(deleteAct) : res.status(400).send('not found');
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router;