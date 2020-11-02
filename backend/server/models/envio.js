/* MODEL del Envio */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const envioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, "Nombre es necesario"]
    },
    direccion: {
        type: String,
        require: [true, "Direccion necesaria"]
    },
    telefono: {
        type: String,
        require: [true, "Telefono necesario"],
    },
    correo: {
        type: String,
        require: [true, "El correo es necesario"]
    },
    nit: {
        type: String,
        require: false
    },
    departamento: {
        type: String,
        require: true
    },
    nota: {
        type: String,
        require: false
    },
    entregado: {
        type: Boolean,
        require: false,
        default: false
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes'
    }
})

module.exports = mongoose.model('Envio', envioSchema)