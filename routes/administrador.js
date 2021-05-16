const { Router } = require('express');
const { check } = require('express-validator');
const {
    adminPost,
    adminsGet,
    adminGet,
    adminPut,
    adminDelete,
} = require('../controllers/administrador');
const { existsRut, notExistsRut } = require('../helpers/admin-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/',
    [
        check('rut', 'The rut is required.').notEmpty(),
        check('rut').custom(notExistsRut),
        check('nombre', 'The name is required.').notEmpty(),
        check('apellido', 'The last name is required.').notEmpty(),
        check('correo', 'The email is required.').notEmpty(),
        check('correo', 'The email is invalid').isEmail(),
        check('contrasena', 'Password is required.').notEmpty(),
        validarCampos,
    ],
    adminPost
);
router.get(
    '/',
    [
        validarJWT,
        check('limit', 'Must be numeric.').isNumeric(),
        check('from', 'Must be numeric.').isNumeric(),
        validarCampos,
    ],
    adminsGet
);

router.get(
    '/:id',
    [
        validarJWT,
        check('id', 'The rut is required.').notEmpty(),
        check('id').custom(existsRut),
        validarCampos,
    ],
    adminGet
);
router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'The rut is required.').notEmpty(),
        check('id').custom(existsRut),
        check('rut', 'It is not possible to update the rut.').not().exists(),
        validarCampos,
    ],
    adminPut
);
router.delete(
    '/:id',
    [
        validarJWT,
        check('id', 'The rut is required.').notEmpty(),
        check('id').custom(existsRut),
        validarCampos,
    ],
    adminDelete
);

module.exports = router;
