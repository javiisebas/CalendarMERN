const {
    response
} = require('express');
const jwt = require('jsonwebtoken');


const validatorJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'

        })
    }

    try {
        const {
            uid,
            name
        } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
            // El secreto es lo que garantiza que solo nosotros conocemos como se ha firmado
        )

        // Escribimos sobre la request.
        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'

        })
    }

    next()
}

module.exports = {
    validatorJWT
}