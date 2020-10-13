/* ROUTES Imagen */

const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const Imagen = require('../models/imagenes')
const Producto = require('../models/producto')

const { verificarToken,verificarRole } = require('../middleware/autenticacion')

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:  process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
})


// Con este middleware, todos los archivos que se suban caen en el req.files
app.use(fileUpload({
    useTempFiles: true
}))


app.post('/api/upload/:id', [verificarToken,verificarRole] ,(req, res)=>{

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
    
            uploadImage(res, archivo, idProducto)
    })
   
})

// ===========================================
//  Subida de imagen a cloud
// ===========================================
function uploadImage(res, archivo, idPorducto){

    cloudinary.uploader.upload(archivo.tempFilePath)
    .then(result =>{

        const imagen = new Imagen({
            imagen: result.public_id,
            url: result.url,
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
                imagen: imagenDB
            })
        })

    })
    .catch( err => {
        return res.status(400).json({
            status: false,
            err
        })
    })

}

module.exports = app