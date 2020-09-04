/* Model producto */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productoSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario']
    },
    precio: {
        type: Number,
        required: [ true, 'El precio es necesario']
    },
    descripcion:{
        type: String,
        default:''
    },
    existencia: {
        type: Number,
        required: [ true, 'La existencia es necesario']
    },
    especificacion: {
        type: String,
        required: [ true, 'Las especificaciones son necesarias']
    },
    disponible: {
        type: Boolean,
        required: [ true, 'Disponible es necesario']
    },
    garantia: {
        type: String,
        required: false,
        default: ''
    },
    descontinuado: {
        type: Boolean,
        default: false
    },
    ofertado: {
        type: Boolean,
        default: false
    },
    porcenjateOferta:{
        type: Number,
        default: 0
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

productoSchema.methods.toJSON = function(){

    // Obteniendo el objeto o usuario
    let producto = this;

    let productoObject = producto.toObject()

    // Eliminando la propiedad
    delete productoObject.descontinuado
    delete productoObject.usuario

    return productoObject
}

module.exports = mongoose.model('Producto', productoSchema )