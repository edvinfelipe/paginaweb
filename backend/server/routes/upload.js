/* ROUTES Imagen */

const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const Imagen = require('../models/imagenes')
const Producto = require('../models/producto')

const verificarToken = require('../middleware/autenticacion')

// Con este middleware, todos los archivos que se suban caen en el req.files
app.use(fileUpload())


app.post('/api/upload/:id', verificarToken ,(req, res)=>{

    const idProducto = req.params.id

    if( !req.files ){
        return res.status(400).json({
            status: false,
            err:{
                message: 'No se ha seleccionado ningún archivo'
            }
        })
    }

    let archivo = req.files.imagen
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[ nombreCortado.length - 1 ]
    
    // Extensiones permitidas
    const extencionesValidas = ['png','jpg','gif','jpeg']

    if( extencionesValidas.indexOf(extension) < 0){

        return res.status(400).json({
            status:false,
            err:{
                message: 'Las extensiones permitidas '+extencionesValidas.join(','),
                ext: extension
            }
        })
    }

    Producto.findById(idProducto,( err, productoDB )=>{

            if( err ){ 
                return res.status(500).json({
                    status: false,
                    err
                })
            }
    
            if( !productoDB ){
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe el producto'
                    }
                })
            }
    
            insertarImagen(res, archivo, idProducto, extension)
        })

})

function insertarImagen(res, archivo, idPorducto, extension ){

    // Cambiar el nombre del archivo
    let nombreArchivo = `${idPorducto}-${ new Date().getMilliseconds() }.${ extension }`

    archivo.mv(`backend/uploads/productos/${ nombreArchivo }`, (err)=>{

        if( err ){
            return res.status(500).json({
                status: false,
                err
            })
        }

        const imagen = new Imagen({
            imagen: nombreArchivo,
            url: `${process.env.DOMINIO}/api/imagen/${nombreArchivo}`,
            producto: idPorducto
        })

        imagen.save((err, imagenDB)=>{

            if( err ){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            return res.status(201).json({
                status: true,
                producto: imagenDB
            })
        })

    })

}

module.exports = app