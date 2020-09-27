const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const clientesSchema = new Schema({
    nombre:{
        type: String,
        require: [true, "Nombre es necesario"]
    },
    direccion:{
        type: String,
        require: [true, "Direccion necesaria"]
    },
    telefono:{
        type: String,
        require: [true, "Telefono necesario"],
    },
    correo:{
        type: String,
        require: false
    },
    nit:{
        type: String,
        require: false
    },
    username:{
        type: String,
        require: [true, "Username neceario"] 
    },
    password:{
        type: String,
        require: [true, "Password necesario"]
    },
    eliminado: {
        type: Boolean,
        default: false
    }
})

clientesSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'})
module.exports = mongoose.model('Clientes', clientesSchema )
