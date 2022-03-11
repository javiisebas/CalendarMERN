const express = require('express');
const router = express.Router()

const {
    check
} = require('express-validator')
/* Si check lanza algún error con los parámetros introducidos. Entonces, validateBody (middleware propio)
finalizará ñanzando la respuesta con un status 400 y el mapeo de lo errores generados por check */
const {
    validateBody
} = require('../middlewares/validator')
const {
    validatorJWT
} = require('../middlewares/validatorJWT');

// Controlador:
const auth = require('../controllers/auth');


// Métodos del router con sus middlewares
router.get('/renew', validatorJWT, auth.revalidarToken)

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    check('password', 'La password debe tener al menos 6 caracteres').isLength({
        min: 6
    }),
    check('repassword', 'La re-password es obligatoria').not().isEmpty(),
    check('repassword', 'La re-password debe tener al menos 6 caracteres').isLength({
        min: 6
    }),
    validateBody
], auth.crearUsuario)

router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validateBody
], auth.loginUsuario)


module.exports = router;