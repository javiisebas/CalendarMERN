const {
    response
} = require('express')
const Evento = require('../models/Evento')

let ctrl = {}

ctrl.getEvents = async (req, res = response) => {

    try {
        const eventos = await Evento.find()
            .populate('user', 'name')

        res.status(200).json({
            ok: true,
            eventos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

}

ctrl.newEvent = async (req, res = response) => {

    const {
        uid,
        name
    } = req

    const evento = new Evento(req.body)

    try {
        evento.user = uid
        await evento.save()

        res.status(200).json({
            ok: true,
            evento
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

}

ctrl.updateEvent = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid
    const name = req.name

    try {
        const evento = await Evento.findById(eventId)

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No privilegio para editar este evento'
            })
        }

        const newEvent = {
            ...req.body
        }

        const updatedEvent = await Evento.findByIdAndUpdate(eventId, newEvent, {
            new: true
        }).populate('user', 'name')


        res.json({
            ok: true,
            evento: updatedEvent
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

}

ctrl.deleteEvent = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventId)

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No privilegio para eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventId)

        res.status(200).json({
            ok: true
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

}


module.exports = ctrl