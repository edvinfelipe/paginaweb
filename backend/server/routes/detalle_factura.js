/* ROUTE de Detalle_factura */

const express = require('express')
const app = express()

const _ = require('underscore')
const bcrypt = require('bcrypt')

const detalle_facturas = require('../models/detalle_factura')



//=====================
// Crea una FACTURA
// ====================

app.post('/detalle_factura' , (req, res) => {

    let body = req.body


    const detalle = new detalle_facturas({

        subtotal: body.subtotal,
        cantidad: body.cantidad,
        descripcion: body.descripcion,
        factura_id: body.factura_id,
        producto_id: body.producto_id

    })

    detalle.save( (err, DetalleDB )=>{

        if( err ){
            return res.status(500).json({
                status: false,
                err
            })
        }

        res.json({
            status: true,
            detalle: DetalleDB
        })
    })
})


//==============================
// Lista de todos las detalles
//==============================

app.get('/detalle_factura', (req, res)=>{

    detalle_facturas.find()

        .exec((err, detalle)=>{

            if( err ){ 
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            res.json({
                status: true,
                detalle
            })
        })
    })

//==============================
// Lista de todos los detalles por facturas
//==============================

app.get('/detalle_factura/:factura_id', (req, res)=>{

    const idFactura = req.params.factura_id

    detalle_facturas.find({factura_id:idFactura})
        .populate('producto_id')

        .exec((err, detalle)=>{

            if( err ){ 
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            res.json({
                status: true,
                detalle
            })
        })
    })

module.exports = app