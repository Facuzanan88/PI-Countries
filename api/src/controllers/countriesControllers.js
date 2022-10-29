const axios = require('axios');
const { Country, Activity } = require('../db.js');

const getCountries = async () => {
    const apiCountries = await axios.get("https://restcountries.com/v3/all")
    const countries = await apiCountries.data.map(c => {
        return {
            id: c.cca3,
            name: c.name.common !== null ? c.name.common : 'No se encontró el nombre del pais',
            flag: c.flags[0] !== null ? c.flags[0] : 'No se encontró la bandera del pais',
            region: c.region !== null ? c.region : 'No se encontró la region del pais',
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

module.exports = { getCountriesFromDb }