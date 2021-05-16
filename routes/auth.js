const { Router } = require('express');
const { check } = require('express-validator');

const { loginAdmin } = require('../controllers/auth');
const { existsRut } = require('../helpers/admin-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/loginAdmin',
    [
        check('rut', 'The rut is required.').notEmpty(),
        check('rut').custom(existsRut),
        check('contrasena', 'Password is required.').notEmpty(),
        validarCampos,
    ],
    loginAdmin
);

module.exports = router;
