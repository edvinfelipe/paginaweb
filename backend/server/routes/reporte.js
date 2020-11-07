/* ROUTE de Reportes */

const express = require('express')
const app = express()

const _ = require('underscore')
const bcrypt = require('bcrypt')

const Reporte = require('../models/factura')
const { verificarToken, verificarRole }  = require('../middleware/autenticacion')




//==============================
// Total ventas
//==============================
app.get('/reporte/total',[verificarToken, verificarRole] , (req, res) => {

    const datos = req.params
    Reporte.aggregate(
            [{
                $group: {
                    _id: "total_venta",
                    Total: {
                        $sum: "$total"
                    }
                }
            }]
        )
        .exec((err, reporte) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }
            res.json({
                status: true,
                reporte
            })
        })
})

//==============================
// Total ventas por año y mes 
//==============================

app.get('/reporte/ventas', [ verificarToken, verificarRole ] ,(req, res) => {

    const idCliente = req.params.cliente_factura
    Reporte.aggregate(

            [{
                $group: {
                    _id: {
                        anio: {
                            $year: "$fecha_venta"
                        },
                        mes: {
                            $month: "$fecha_venta"
                        }
                    },
                    Total: {
                        $sum: "$total"
                    }
                }
            }, ]
        ).sort({
            _id: 1
        }, {
            mes: 1
        })
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