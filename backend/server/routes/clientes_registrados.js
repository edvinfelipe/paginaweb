/* ROUTE de cliente_Registados */

const express = require('express')
const app = express()

const _ = require('underscore')
const bcrypt = require('bcrypt')

const clientes_registrados = require('../models/clientes_registrados')
const { verificarToken, verificarRole } = require('../middleware/autenticacion')

//=====================
// Crea una Cliente
// ====================

app.post('/cliente', (req, res) => {

    let body = req.body

    const cliente = new clientes_registrados({

        nombre: body.nombre,
        direccion: body.direccion,
        telefono: body.telefono,
        correo: body.correo,
        nit: body.nit,
        username: body.username,
        role: body.role,
        password: bcrypt.hashSync(body.password, 10),
    })

    cliente.save((err, clienteDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            })
        }

        res.json({
            status: true,
            cliente: clienteDB
        })
    })
})

//=====================
// Lista de Clientes
// ====================
app.get('/cliente', [verificarToken, verificarRole], async(req, res) => {

    try {
        const role = req.query.role

        let desde = Number(req.query.page || 1)
        desde = 10 * (desde - 1)

        let filter = { eliminado: false }
        if (role) {
            filter = {...filter, role }
        }

        const clientes = await clientes_registrados.find(filter)
            .skip(desde)
            .limit(10)

        const count = await clientes_registrados.countDocuments(filter)

        res.json({
            status: true,
            count,
            clientes
        })


    } catch (error) {
        res.status(500).json({
            status: false,
            err: 'Ocurrio error en el servidor',
            error
        })
    }

})


//======================
// Regresa un cliente
// =====================
app.get('/cliente/:id', [verificarToken], (req, res) => {

    const id = req.params.id

    clientes_registrados.find({ _id: id })

    .exec((err, cliente) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            })
        }

        res.json({
            status: true,
            cliente
        })
    })
})

//=====================
// Modifica un cliente
// ====================    
app.put('/cliente/:id', [verificarToken], (req, res) => {

    const id = req.params.id

    const body = _.pick(req.body, 'nombre', 'direccion', 'telefono', 'correo', 'nit', 'username', 'password')

    clientes_registrados.findByIdAndUpdate(
        id,
        body, { new: true },
        (err, clienteDB) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if (!clienteDB) {
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe el cliente'
                    }
                })
            }

            res.json({
                status: true,
                cliente: clienteDB
            })
        })
})

app.delete('/cliente/:id', [verificarToken, verificarRole], (req, res) => {

    const id = req.params.id

    const cambiaEstado = {
        eliminado: true
    }

    clientes_registrados.findByIdAndUpdate(
        id,
        cambiaEstado, { new: true },
        (err, clienteBorrado) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if (!clienteBorrado) {
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe el cliente'
                    }
                })
            }

            res.json({
                status: true,
                cliente: clienteBorrado
            })
        })
})






module.exports = app