const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getCountries = async () => {
    const apiCountries = await axios.get("https://restcountries.com/v3/all")
    const countries = await apiCountries.data.map(c => {
        return {
            id: c.cca3,
            name: c.name.common !== null ? c.name.common : 'No se encontró el nombre del pais',
            flag: c.flags[0] !== null ? c.flags[0] : 'No se encontró la bandera del pais',
            region: c.region ? c.region !== null : 'No se encontró la region del pais',
            capital: typeof c.capital !== 'undefined' ? c.capital[0] : 'No se encontró la capital del pais',
            subregion: c.subregion,
            area: c.area,
            population: c.population,
        }
    })

    return countries;
};

const dbCountries = async () => {
    const countries = await getCountries();
    for (let i = 0; i < countries.length; i++) {
        await Country.create(countries[i])
    }
    console.log("se agregaron correctamente")
}

dbCountries();

const getCountriesFromDb = async (req, res) => {
    const countries = Country.findAll({ include: Activity })
    return countries;
}

router.get('/countries', async (req, res) => {
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
        return res.status(404).send("El código recibido no corresponde a un pais existente")
    }
});

router.get('/countries/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const idCountry = await Country.findByPk(String(id.toUpperCase()), { include: Activity })

        if (!idCountry) return res.status(404).json("El código recibido no corresponde a un pais existente");

        res.status(200).json(idCountry)

    } catch (err) {
        return res.status(404).send("El código recibido no corresponde a un pais existente")
    }
});

router.post('/activities', async (req, res) => {
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

router.get('/activities', async (req, res) => {
    try {
        const allActivities = await Activity.findAll({ include: Country });
        res.status(200).json(allActivities);
    } catch (error) {
        res.status(404).json("No se pudo cargar las actividades de la Base de Datos")
    }
})



module.exports = router;
