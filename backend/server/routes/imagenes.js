/* ROUTES Imagen publico */

const express = require('express')

const fs = require('fs')
const path = require('path')

const app = express()

app.get('/api/imagen/:name', (req, res)=>{

    const name = req.params.name
    
    let pathImage = path.resolve(__dirname,`../../uploads/productos/${name}`)
    
    if( !fs.existsSync( pathImage ) ){
        
        const noImagePath = path.resolve(__dirname, '../assets/no-image.jpg')
        res.sendFile(noImagePath)
    }
    
    res.sendFile( pathImage )
    
})

module.exports = app