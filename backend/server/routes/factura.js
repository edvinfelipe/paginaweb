/* ROUTE de Facta */

const express = require('express')
const { check } = require('express-validator')
const mongoose = require('mongoose')
const moment = require('moment')

const app = express()

const _ = require('underscore')
const bcrypt = require('bcrypt')

const Factura = require('../models/factura')
const Detalle = require('../models/detalle_factura')
const Envio = require('../models/envio')
const Producto = require('../models/producto')

const { fieldValidator } = require('../middleware/field-validator')
const { populate } = require('../models/factura')

//const verificarToken = require('../middleware/autenticacion')

//=====================
// Crea una FACTURA
// ====================

app.post('/factura', [
        check('det_envio', 'Los datos del envio es necesario').not().isEmpty(),
        check('factura', 'La factura es necesario').not().isEmpty(),
        check('det_factura', 'El detalle de factura es necesario').not().isEmpty(),
        fieldValidator
    ],
    async(req, res) => {

        // Inicio de la transacción
        // const db = mongoose.connection;
        let session = await mongoose.startSession();
        session.startTransaction();


        const { det_envio, factura, det_factura } = req.body;

        try {

            const opts = { session, new: true };

            // Guardado el detalle del usuario de envio
            const userenvio = new Envio(det_envio)
            const userenvioDB = await userenvio.save();


            // Guardado de la factura
            factura.cliente_envio = userenvioDB._id
            const facturaDB = await Factura(factura).save()
            userenvioDB.factura = facturaDB._id
            await userenvioDB.save()

            // Guardado de detalle de factura
            det_factura.map(async(detalle) => {

                const producto = await Producto.findById(detalle.producto_id)

                detalle.factura_id = facturaDB._id
                await Detalle(detalle).save()

                const camposActualizar = {
                    reservado: 0,
                    existencia: producto.existencia - detalle.cantidad
                }

                // Actualiza la existencia del producto    
                await Producto.findByIdAndUpdate(detalle.producto_id, camposActualizar)
            })

            await session.commitTransaction();
            session.endSession();

            res.json({
                status: true,
                det_envio: userenvioDB,
                factura: facturaDB

            })

        } catch (error) {

            await session.abortTransaction()
            session.endSession()
            res.status(500).json({
                status: false,
                err: 'Ocurrió error en el ingreso, favor de volver a intentar',
                error
            })
        }

    })

//==============================
// Lista de todos las facturas
//==============================

app.get('/factura', (req, res) => {

    let desde = Number(req.query.page || 1)
    desde = 10 * (desde - 1)

    Factura.find()
        .skip(desde)
        .limit(10)
        .populate('cliente_envio')
        .sort({ fecha_venta: -1 })
        .exec((err, factura) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            Factura.countDocuments({}, (err, conteo) => {
                res.json({
                    status: true,
                    count: conteo,
                    factura
                })
            })

        })
})

app.get('/factura/detenvio/:id', (req, res) => {

    const id = req.params.id
    Factura.findById(id)
        .populate('cliente_envio')
        .exec((err, factura) => {

            if (err) {
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

//====================================
// Lista de todas las facturas 
//====================================
app.get('/factura/todos/', (req, res) => {

    Factura.find()
        .exec((err, facturas) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            res.json({
                status: true,
                facturas
            })
        })
})


//====================================
// Lista de facturas por rango de fecha 
//=====================================

app.get('/factura/fecha/', (req, res) => {

    const fecha_inicial = req.query.fecha_inicial || new Date
    const fecha_final = moment(req.query.fecha_final, 'YYYY-MM-DD').add(1, 'day') || new Date

    let desde = Number(req.query.page || 1)
    desde = 10 * (desde - 1)

    const filter = { fecha_venta: { $gte: fecha_inicial, $lte: fecha_final } }
    Factura.find(filter)
        .skip(desde)
        .limit(10)
        .populate('cliente_envio')
        .sort({ fecha_venta: -1 })
        .exec((err, factura) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            Factura.countDocuments(filter, (err, conteo) => {
                res.json({
                    status: true,
                    count: conteo,
                    factura
                })
            })
        })
})

//==============================
// Lista de todas las facturas por cliente
//==============================

app.get('/factura/:cliente_factura', (req, res) => {

    const idCliente = req.params.cliente_factura

    Factura.find({ cliente_factura: idCliente })

    .exec((err, factura) => {

        if (err) {
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