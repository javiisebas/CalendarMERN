const {
    response
} = require('express')

const {
    validationResult
} = require('express-validator')


const validateBody = (req, res = response, next) => {

    // Sacamos los posibles errores que me genera express-validator
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    // Si no hay errores pasamos al siguiente.
    next()
}

module.exports = {
    validateBody
}