const { response, request } = require('express');
const Administrador = require('../models/administrador');
const bcrypt = require('bcryptjs');

const adminPost = async (req = request, res = response) => {
    try {
        const { contrasena, ...others } = req.body;
        const salt = bcrypt.genSaltSync();
        others.contrasena = bcrypt.hashSync(contrasena, salt);
        const admin = await Administrador.create(others);
        res.status(201).json({ admin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: 'ups' });
    }
};
const adminsGet = async (req = request, res = response) => {
    try {
        const { limit = 5, from = 0 } = req.query;
        const [quantity, admins] = await Promise.all([
            Administrador.count(),
            Administrador.findAll({
                limit: Number(limit),
                offset: Number(from),
            }),
        ]);
        res.status(200).json({ quantity, admins });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'ups' });
    }
};

const adminGet = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const admin = await Administrador.findByPk(id);
        res.status(200).json({ admin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: 'ups' });
    }
};

const adminPut = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { contrasena, ...others } = req.body;
        if (contrasena) {
            const salt = bcrypt.genSaltSync();
            others.contrasena = bcrypt.hashSync(contrasena, salt);
        }
        const admin = await Administrador.findByPk(id);
        admin.update(others);
        res.status(200).json({ admin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: 'ups' });
    }
};
const adminDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const admin = await Administrador.findByPk(id);
        await admin.destroy();
        res.status(200).json({ admin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: 'ups' });
    }
};

module.exports = {
    adminPost,
    adminGet,
    adminsGet,
    adminPut,
    adminDelete,
};
