const bcrypt = require('bcryptjs')
const {
    response
} = require('express')
const {
    generarJWT
} = require('../helpers/jwt')
const Usuario = require('../models/Usuario')

let ctrl = {}

ctrl.crearUsuario = async (req, res = response) => {

    const {
        email,
        password,
        repassword
    } = req.body

    try {

        let usuario = await Usuario.findOne({
            email: email
        })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El email introducido ya existe'
            })
        }

        if (password !== repassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Las contraseñas no coinciden'
            })
        }

        usuario = new Usuario(req.body)

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()

        // Generar nuestro JWT -> Json Web Token  
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

}

ctrl.loginUsuario = async (req, res = response) => {

    const {
        email,
        password
    } = req.body

    try {

        const usuario = await Usuario.findOne({
            email: email
        })

        if (!usuario) {
            console.log('ERROR 1');
            return res.status(400).json({
                ok: false,
                msg: 'El email introducido no existe'
            })
        }

        // Confirmar las passwords
        const valisPassword = bcrypt.compareSync(password, usuario.password)

        if (!valisPassword) {
            console.log('ERROR 2');
            return res.status(400).json({
                ok: false,
                msg: 'El email o contraseña no son correctos'
            })
        }

        // Generar nuestro JWT -> Json Web Token  
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

}

ctrl.revalidarToken = async (req, res = response) => {


    const {
        uid,
        name
    } = req

    // Generar un nuevo JWT y devolverlo
    const newToken = await generarJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        newToken
    })
}

module.exports = ctrl