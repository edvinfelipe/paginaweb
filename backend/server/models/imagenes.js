/* MODEL Image */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagenSchema = new Schema({
    imagen:{
        type: String,
    },
    producto:{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }
})

module.exports = mongoose.model('Imagen', imagenSchema)