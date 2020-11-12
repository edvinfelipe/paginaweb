const express = require('express')
const app = express()

const Cliente = require('../models/clientes_registrados')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//======================
//  Inicio de Sesión 
//====================== 
app.post('/login', (req, res) => {

    const body = req.body

    Cliente.findOne({ username: body.username, eliminado: false }, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            })
        }


        if (!usuario) {
            return res.status(400).json({
                status: false,
                err: {
                    message: 'Usuario o contraseña incorrecto'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {

            return res.status(400).json({
                status: false,
                err: {
                    message: 'Usuario o contraseña incorrecto'
                }
            })
        }

        // Generación del token
        const token = jwt.sign({
            usuario
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            status: true,
            usuario,
            token
        })
    })
})

module.exports = app