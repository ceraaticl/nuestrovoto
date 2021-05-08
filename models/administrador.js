const Sequelize = require('sequelize');
const { db } = require('../db/connection');

const Administrador = db.define(
    'admin',
    {
        rut: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        nombre: {
            type: Sequelize.CHAR(64),
        },
        apellido: {
            type: Sequelize.CHAR(64),
        },
        correo: {
            type: Sequelize.CHAR(64),
        },
        contrasena: {
            type: Sequelize.CHAR(64),
        },
    },
    { timestamps: false, freezeTableName: true }
);

module.exports = Administrador;
