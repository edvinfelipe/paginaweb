/* ROUTE de password */

const express = require('express')
const app = express()
const { check } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Cliente = require('../models/clientes_registrados')
const { fieldValidator } = require('../middleware/field-validator')

// email
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

app.post('/password/email', async(req, res)=>{

    try {
        const { correo } = req.body

        const cliente = await Cliente.findOne({ correo })
        
        if( !cliente ){
            return res.status(400).json({
                status: false,
                err: {
                    message: 'No existe el correo'
                }
            })
        }
        
        const token = jwt.sign({ cliente }, process.env.SEEDEMAIL, { expiresIn: '72h'} )

        let mailOptions = {
            from: 'Protech',
            to: correo,
            subject:'Recuperación de contraseña',
            html: `<h2>Contraseña</h2>
                   <p>Bienvenido, para restablecer su contraseña debe ingresar al
                   siguiente link</p>
                   <h5>${process.env.DOMINIOEMAIL}${token}</h5>`
        }

        transporter.sendMail(mailOptions, function(err, info){

            if( err ){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            return res.json({
                status: true,
                message: info.response
            })
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            err
        })
    }
    
})

app.put('/password/reset', ( req, res)=>{

    try {
        const token = req.get('token')

        jwt.verify(token, process.env.SEEDEMAIL, async(err, decoded)=>{

            if( err ){
                return res.status(406).json({
                    status: false,
                    err:{
                        message: 'Token no aceptable'
                    }
                })
            }

            const { cliente } = decoded
            const client = await Cliente.findById(cliente._id)

            const { password } = req.body
            client.password = bcrypt.hashSync( password, 10 ) 
            client.save()

            res.json({
                status: true,
                message: 'Contraseña actualizado'
            })
        })
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            err
        })
    }
})

// Enviar email al correo de protech
app.post('/contacto/email',
    [
        check('correo','El correo es necesario').isEmail(),
        check('comentario', 'El comentario es necesario').not().isEmpty(),
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        fieldValidator
    ],
    async(req, res)=>{

    try {
        const { correo, comentario, nombre, telefono } = req.body

        let mailOptions = {
            from: 'Mensaje de Cliente',
            to: process.env.EMAIL,
            subject:'Mensaje del cliente',
            html: `<h3>nombre: ${nombre}</h3>
                   <h5>correo: ${correo}</h5>
                   <h5>telefono: ${telefono || ''}</h5>
                   <h5>comentario: ${comentario}</h5>`
        }

        transporter.sendMail(mailOptions, function(err, info){

            if( err ){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            return res.json({
                status: true,
                message: info.response
            })
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            err
        })
    }
    
})

module.exports = app