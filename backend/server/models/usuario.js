/* MODELO de usuario */

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    cod_empleado:{
        type: String,
        unique: true,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    eliminado:{
        type: Boolean,
        default: false
    }

})

usuarioSchema.methods.toJSON = function(){

    // Obteniendo el objeto o usuario
    let user = this;

    let userObjet = user.toObject()

    // Eliminando la propiedad
    delete userObjet.password
    delete userObjet.eliminado

    return userObjet
}

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'} )

module.exports = mongoose.model('Usuario', usuarioSchema )