/* MODELO de marca */

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const marcaSchema = new Schema({
    nombre:{
        type: String,
        unique: true,
        required: true
    },
    eliminado:{
        type: Boolean,
        default: false
    }

})

marcaSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'} )

module.exports = mongoose.model('Marca', marcaSchema )