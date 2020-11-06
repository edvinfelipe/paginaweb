/* ROUTES Imagen publico */

const express = require('express')

const fs = require('fs')
const path = require('path')

const app = express()
const Imagen = require('../models/imagenes')

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:  process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
})

app.get('/imagen/:name', (req, res)=>{

    const name = req.params.name
    
    let pathImage = path.resolve(__dirname,`../../uploads/productos/${name}`)
    
    if( fs.existsSync( pathImage ) ){
        
        res.sendFile( pathImage )
    }else{
        const noImagePath = path.resolve(__dirname, '../assets/no-image.jpg')
        res.sendFile(noImagePath)
    }
      
})

// ====================================
//  Elimina una imagen
// ====================================
app.delete('/imagen/:id', (req, res) => {

    const id = req.params.id

    Imagen.findByIdAndDelete({ _id: id }, (err, imagenDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        }

        if( !imagenDB ){
            return res.status(404).json({
                status: false,
                err: {
                    message: 'No existe la imagen'
                }
            })
        }
        
        if( process.env.CLOUD_NAME ){
            destroyImageCloud( res, imagenDB )
        }

        return res.json({
            status: true,
            imagen: imagenDB
        })
    })

})

// ============================================
// Elimina la imagen en el servidor de imagenes
// ===========================================
function destroyImageCloud(res, imagenDB ){

       cloudinary.uploader.destroy( imagenDB.imagen )
       .then( result => {

            return res.json({
                status: true,
                imagen: imagenDB
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