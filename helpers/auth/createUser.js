const validResgister = (body) => {

    const {
        name,
        email,
        password
    } = body

    let errors = []

    if (name.length === 0) {
        errors = [
            ...errors,
            'El nombre no puede ser un campo vacío'
        ]
    }

    if (email.length === 0) {
        errors = [
            ...errors,
            'El email no puede ser un campo vacío'
        ]
    }

    if (password.length < 6) {
        errors = [
            ...errors,
            'La contraseña debe tener al menos 6 caracteres'
        ]
    }

    return errors

}


module.exports = {
    validResgister
}