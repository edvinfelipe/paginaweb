/* ROUTE de detalle de envio  */

const express = require('express')

const app = express()

const DetalleEnvio = require('../models/envio')

const { verificarToken, verificarRole } = require('../middleware/autenticacion')

app.put('/detalleenvio/:id',[ verificarToken, verificarRole ],async(req, res)=>{

    const id = req.params.id

    try {
        
        let detenvio = await DetalleEnvio.findById(id);

        if( !detenvio ){
            return res.status(400).json({
                status: false,
                err: {
                    message: 'No existe el detalle de envio'
                }
            })
        }

       const envioupdate = await DetalleEnvio.findByIdAndUpdate(id,req.body, { new: true });

       res.json({
           status: true,
           envio: envioupdate
       })
        
    } catch (error) {
        
        res.status(500).json({
            status: false,
            err: error
        })
    }
})

module.exports = app