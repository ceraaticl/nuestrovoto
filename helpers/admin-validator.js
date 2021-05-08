const Administrador = require('../models/administrador');

const existRut = async (rut = '') => {
    const existe = await Administrador.findByPk(rut);
    if (existe) {
        throw new Error(`El rut ${rut} ya existe en la base de datos.`);
    }
};

module.exports = { existRut };
