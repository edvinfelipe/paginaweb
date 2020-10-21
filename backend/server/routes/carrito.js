/* ROUTE de detalle del carrito */

const express = require('express')
const app = express()

const _ = require('underscore')
const bcrypt = require('bcrypt')

const Carrito = require('../models/carrito')

//=====================
// Crea un nuevo detalle
// ====================

app.post('/api/carrito', (req, res) => {

    let body = req.body

    const carrito = new Carrito({
        cliente_id: body.cliente_id,
        producto_id: body.producto_id,
        cantidad: body.cantidad,
    })

    carrito.save((err, CarritoDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            })
        }

        res.json({
            status: true,
            carrito: CarritoDB
        })
    })
})

//==============================
// Lista de todos los detalles por cliente
//==============================

app.get('/api/carrito/:cliente_id', (req, res) => {

    const idCliente = req.params.cliente_id

    Carrito.find({
            cliente_id: idCliente
        })

        .exec((err, carrito) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }
            res.json({
                status: true,
                carrito
            })
        })
})

//==============================
// Devuelve todos los detalles 
//==============================


app.get('/api/carrito', (req, res) => {

    Carrito.find()

        .exec((err, carrito) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            res.json({
                status: true,
                carrito
            })
        })
})

//==============================
// Modifica un detalle por id 
//==============================

app.put('/api/carrito/:id', (req, res) => {

    let body = _.pick(req.body,
        [
            'cliente_id',
            'producto_id',
            'cantidad'
        ])

    const id = req.params.id

    Carrito.findByIdAndUpdate(
        id,
        body, {
            new: true
        },
        (err, carritoDB) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                });
            }

            if (!carritoDB) {
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe el detalle'
                    }
                })
            }

            res.status(201).json({
                status: true,
                carrito: carritoDB
            });

        });

})


//==============================
// Elimina toda la coleccion de un cliente
//==============================

app.delete('/api/carrito/:cliente_id', (req, res) => {

    const id = req.params.cliente_id

    Carrito.deleteMany({cliente_id:id}, 
        (err, carrito )=>{
           
            if( err ){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if( !carrito ){
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe el detalle'
                    }
                })
            }
    
            res.json({
                status: true,
                carrito: carrito
            })
    })
})
//==============================
// Elimina un detalle por producto y cliente
//==============================

app.delete('/api/carrito/:producto_id/:cliente_id', (req, res) => {

    const idProducto = req.params.producto_id
    const idCliente = req.params.cliente_id

    Carrito.deleteOne({producto_id:idProducto,cliente_id:idCliente}, 
        (err, carrito )=>{
            if( err ){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if( !carrito ){
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe el detalle'
                    }
                })
            }
    
            res.json({
                status: true,
                carrito: carrito
            })
    })
})

module.exports = app