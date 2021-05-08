const { Router } = require('express');
const { check } = require('express-validator');
const {
    adminGet,
    adminPost,
    adminPut,
    adminDelete,
} = require('../controllers/administrador');
const { existRut } = require('../helpers/admin-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/',
    [
        check('rut', 'El rut es obligatorio.').not().isEmpty(),
        check('rut').custom(existRut),
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio.').not().isEmpty(),
        check('correo', 'El correo es obligatorio.').not().isEmpty(),
        check('correo', 'El correo no es valido.').isEmail(),
        check('contrasena', 'El contrasena es obligatorio.').not().isEmpty(),
        validarCampos,
    ],
    adminPost
);
router.get('/', adminGet);
router.put('/', adminPut);
router.delete('/', adminDelete);

module.exports = router;
