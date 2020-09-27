const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const facturaSchema = new Schema({
    total:{
        type: Number,
        require: [true, "Total es necesario"]
    },
    fecha_venta:{
        type: Date,
        require: [true, "Fecha necesaria"]
    },
    cliente_factura:{
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        require: [true, "Id Requerido"]
    },
    producto_id:{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        require: [true, "Id Requerido"]
    }
})

facturaSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'})
module.exports = mongoose.model('Factura', facturaSchema )
