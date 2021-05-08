const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
    process.env.NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mariadb',
        // logging: false,
    }
);

module.exports = { db };
