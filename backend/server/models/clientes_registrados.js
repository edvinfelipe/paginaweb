const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

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
        require: [true, "Username neceario"],
        unique: true 
    },
    password:{
        type: String,
        require: [true, "Password necesario"]
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos

    },
    eliminado: {
        type: Boolean,
        default: false
    }
})

clientesSchema.methods.toJSON = function(){
    let cliente = this

    let clienteObject = cliente.toObject()

    delete clienteObject.password

    return clienteObject
}

clientesSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'})
module.exports = mongoose.model('Clientes', clientesSchema )
