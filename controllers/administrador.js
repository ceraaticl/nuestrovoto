const { response, request } = require('express');
const Administrador = require('../models/administrador');
const bcrypt = require('bcryptjs');

const adminPost = async (req = request, res = response) => {
    try {
        const { contrasena } = req.body;
        const salt = bcrypt.genSaltSync();
        req.body.contrasena = bcrypt.hashSync(contrasena, salt);
        const admin = await Administrador.create(req.body);
        res.status(201).json({ msg: 'Admin creado', admin });
    } catch (error) {
        console.log(error);
        res.status(500).json('Ups');
    }
};
const adminGet = (req = request, res = response) => {
    res.json({ msg: 'get api - admin' });
};
const adminPut = (req, res = response) => {
    res.json({ msg: 'put api - admin' });
};
const adminDelete = (req, res = response) => {
    res.json({ msg: 'delete api - admin' });
};

module.exports = {
    adminGet,
    adminPost,
    adminPut,
    adminDelete,
};
