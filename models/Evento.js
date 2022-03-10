const {
    Schema,
    model
} = require('mongoose')

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
})

// Queremos serializar el JSON que devuelve en los métodos que luego pasamos al res.json()
EventoSchema.method('toJSON', function () {
    const {
        __v,
        _id,
        ...object // object extrae el objeto restante
    } = this.toObject()

    object.id = _id
    return object
})

module.exports = model('Evento', EventoSchema)