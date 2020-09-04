/* MODELO de categoria */

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const categoriaSchema = new Schema({
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

categoriaSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'} )

module.exports = mongoose.model('Categoria', categoriaSchema )