const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Administrador = require('../models/administrador');
const { generarJWT } = require('../helpers/generar-jwt');

const loginAdmin = async (req = request, res = response) => {
    try {
        const { rut, contrasena } = req.body;
        const admin = await Administrador.findByPk(rut);
        const validPassword = bcryptjs.compareSync(
            contrasena,
            admin.contrasena
        );
        if (!validPassword) {
            return res
                .status(401)
                .json({ errors: 'The password is not correct.' });
        }

        const token = await generarJWT(admin.rut);
        res.status(201).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: 'ups' });
    }
};

module.exports = { loginAdmin };
