const { Router } = require('express');
const { check } = require('express-validator');

const { loginAdmin } = require('../controllers/auth');
const { notExistRut } = require('../helpers/admin-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/loginAdmin',
    [
        check('rut', 'El rut es obligatorio.').notEmpty(),
        check('rut').custom(notExistRut),
        check('contrasena', 'La contrasena es obligatoria.').notEmpty(),
        validarCampos,
    ],
    loginAdmin
);

module.exports = router;
