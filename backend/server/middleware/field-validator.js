const { response } = require('express')
const { validationResult } = require('express-validator')

const fieldValidator = (req, res = response, next) => {

    // Manejo de errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            err: errors.mapped()
        })
    }

    // Pasa al siguiente proceso si no se encontró error 
    next()
}

module.exports = {
    fieldValidator
}