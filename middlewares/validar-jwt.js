const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Administrador = require('../models/administrador');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición.',
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const admin = await Administrador.findByPk(id);

        if (!admin) {
            return res.status(401).json({
                msg: 'Token no válido -  Administrador no existe en BD',
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido.',
        });
    }
};

module.exports = {
    validarJWT,
};
