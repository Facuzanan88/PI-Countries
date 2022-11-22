const { Router } = require('express');

const { getCountriesFromDb } = require('../controllers/countriesControllers.js');

const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');


const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const nameCountry = await Country.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                },
                include: Activity
            })

            if (!nameCountry.length) return res.status(404).json("El pais ingresado no existe");

            res.status(200).json(nameCountry)

        } else {
            const countries = await getCountriesFromDb();
            res.status(200).json(countries);
        }
    } catch (error) {
        return res.status(404).send("Error al cargar la Base de Datos")
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const idCountry = await Country.findByPk(String(id.toUpperCase()), { include: Activity })

        if (!idCountry) return res.status(404).json("El código recibido no corresponde a un pais existente");

        res.status(200).json(idCountry)

    } catch (err) {
        return res.status(404).send("El código recibido no corresponde a un pais existente")
    }
});

module.exports = router;