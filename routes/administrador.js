const { Router } = require('express');
const { check } = require('express-validator');
const {
    adminGet,
    adminPost,
    adminPut,
    adminDelete,
} = require('../controllers/administrador');
const { existRut, notExistRut } = require('../helpers/admin-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/',
    [
        check('rut', 'El rut es obligatorio.').notEmpty(),
        check('rut').custom(existRut),
        check('nombre', 'El nombre es obligatorio.').notEmpty(),
        check('apellido', 'El apellido es obligatorio.').notEmpty(),
        check('correo', 'El correo es obligatorio.').notEmpty(),
        check('correo', 'El correo no es valido.').isEmail(),
        check('contrasena', 'La contrasena es obligatorio.').notEmpty(),
        validarCampos,
    ],
    adminPost
);
router.get(
    '/',
    [
        validarJWT,
        check('rut', 'El rut es obligatorio.').notEmpty(),
        check('rut').custom(notExistRut),
        validarCampos,
    ],
    adminGet
);
router.put('/', adminPut);
router.delete('/', adminDelete);

module.exports = router;
