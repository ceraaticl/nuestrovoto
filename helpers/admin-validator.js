const Administrador = require('../models/administrador');

const existsRut = async (rut = '') => {
    const existe = await Administrador.findByPk(rut);
    if (!existe) {
        throw new Error(`The rut ${rut} does not exist in the database.`);
    }
};

const notExistsRut = async (rut = '') => {
    const existe = await Administrador.findByPk(rut);
    if (existe) {
        throw new Error(`The rut ${rut} already exists in the database.`);
    }
};

module.exports = { existsRut, notExistsRut };
