const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            name
        }

        // Para firmar el token necesitamos el payload, el secreto y la configuración
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
                expiresIn: '2h'
            },
            // Finalmente tenemos un callback dentro de la firma que resuelve la promesa
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                }

                resolve(token)
            })
    })
}

module.exports = {
    generarJWT
}