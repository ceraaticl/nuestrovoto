const express = require('express');
const cors = require('cors');
const { db } = require('../db/connection');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = { admin: '/api/admin' };
        //DB
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Rutas de la aplicación
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Base de datos online');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parse del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.path.admin, require('../routes/administrador'));
    }

    listen() {
        this.app.listen(this.port, () =>
            console.log('Servidor corriendo en el puerto:', this.port)
        );
    }
}

module.exports = Server;
