const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const carritoSchema = new Schema({
    cliente_id:{
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        require: [true, "Id Requerido"]
    },
    producto_id:{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        require: [true, "Id Requerido"]
    },
    cantidad:{
        type: Number,
        require: [true, "Total es necesario"]
    }
})

carritoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'})
module.exports = mongoose.model('Carrito', carritoSchema )
