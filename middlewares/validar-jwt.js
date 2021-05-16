const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Administrador = require('../models/administrador');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            errors: 'There is no token in the request.',
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const admin = await Administrador.findByPk(id);

        if (!admin) {
            return res.status(401).json({
                errors: 'Invalid token - admin does not exist in the database',
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            errors: 'Invalid token.',
        });
    }
};

module.exports = {
    validarJWT,
};
