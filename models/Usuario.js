const {
    Schema,
    model
} = require('mongoose')

// Lo importante para mongoose es generar el esquema y pasar el modelo del esquem

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema)