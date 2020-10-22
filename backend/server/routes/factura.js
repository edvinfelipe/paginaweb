/* ROUTE de Facta */

const express = require('express')
const app = express()

const _ = require('underscore')
const bcrypt = require('bcrypt')

const Factura = require('../models/factura')

//const verificarToken = require('../middleware/autenticacion')

//=====================
// Crea una FACTURA
// ====================

app.post('/factura' , (req, res) => {

    let body = req.body

    const factura = new Factura({

        total: body.total,
        fecha_venta: body.fecha_venta,
        cliente_factura: body.cliente_factura,
       
    })

    factura.save( (err, FacturaDB )=>{

        if( err ){
            return res.status(500).json({
                status: false,
                err
            })
        }

        res.json({
            status: true,
            factura: FacturaDB
        })
    })
})

//==============================
// Lista de todos las facturas
//==============================

app.get('/factura', (req, res)=>{

    Factura.find()

        .exec((err, factura)=>{

            if( err ){ 
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            res.json({
                status: true,
                factura
            })
        })
    })

//==============================
// Lista de todas las facturas por cliente
//==============================

app.get('/factura/:cliente_factura', (req, res)=>{

    const idCliente = req.params.cliente_factura

    Factura.find({cliente_factura:idCliente})

        .exec((err, factura)=>{

            if( err ){ 
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            res.json({
                status: true,
                factura
            })
        })
    })

module.exports = app