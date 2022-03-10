const express = require('express');
const router = express.Router()

const {
    validatorJWT
} = require('../middlewares/validatorJWT');

const events = require('../controllers/events');
const {
    check
} = require('express-validator');
const {
    validateBody
} = require('../middlewares/validator');
const isDate = require('../helpers/isDate');


/* Todos los endpoint están protegidos, con lo cual no podrás no se podrá acceder al controler sin haber hecho
el login y obtenido el JWT. Es por eso que usamos el middleware en todo el router, no en determinados métodos.
Recordamos además que si encuentra el JWT pasará al siguiente -> next(), y además escribirá en el request. De
esta forma podremos obtener el uid y el name. Ya que los estamos decodificando del JWT. */
router.use(validatorJWT)

router.get('/', events.getEvents)

router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'El fecha de inicio es obligatoria').not().isEmpty(),
    check('start', 'El fecha de inicio debe de ser una fecha').custom(isDate),
    check('end', 'El fecha de fin es obligatoria').not().isEmpty(),
    check('end', 'El fecha de fin debe de ser una fecha').custom(isDate),
    validateBody
], events.newEvent)

router.put('/:id', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'El fecha de inicio es obligatoria').not().isEmpty(),
    check('start', 'El fecha de inicio debe de ser una fecha').custom(isDate),
    check('end', 'El fecha de fin es obligatoria').not().isEmpty(),
    check('end', 'El fecha de fin debe de ser una fecha').custom(isDate),
    validateBody
], events.updateEvent)

router.delete('/:id', events.deleteEvent)


module.exports = router