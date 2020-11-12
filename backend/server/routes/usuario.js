/* ROUTE de usuario */

const express = require('express')
const app = express()

const _ = require('underscore')
const bcrypt = require('bcrypt')

const Usuario = require('../models/usuario')

const verificarToken = require('../middleware/autenticacion')

//=====================
// Lista de usuarios
// ====================
app.get('/usuario', verificarToken, (req, res)=>{

    Usuario.find( { eliminado:false } )
        .sort('username')
        .exec((err, usuarios)=>{

            if( err ){ 
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            res.json({
                status: true,
                usuarios
            })
        })
        
})

//======================
// Regresa una usuario
// =====================
app.get('/usuario/:id', verificarToken , (req, res)=>{

    const id = req.params.idz

    Usuario.findOne( { _id: id, eliminado: false}, (err, usuarioDB)=>{

        if( err ){ 
            return res.status(500).json({
                status: false,
                err
            })
        }

        if( !usuarioDB ){
            return res.status(404).json({
                status: false,
                err: {
                    message: 'No existe el usuario'
                }
            })
        }

        res.json({
            status: true,
            usuario: usuarioDB
        })
    })
        
})

//=====================
// Crea una usuario
// ====================
app.post('/usuario', verificarToken , (req, res) => {

    let body = req.body

    const usuario = new Usuario({
        cod_empleado: body.cod_empleado,
        username:    body.username,
        password:   bcrypt.hashSync( body.password, 10 )
    })

    usuario.save( (err, usuarioDB )=>{

        if( err ){
            return res.status(500).json({
                status: false,
                err
            })
        }

        res.json({
            status: true,
            usuario: usuarioDB
        })
    })
})

//========================
// Modifica una usuario
// =======================
app.put('/usuario/:id', verificarToken, (req, res) => {

    const id = req.params.id

    const body = _.pick(req.body,'cod_empleado','username','eliminado')

    Usuario.findOneAndUpdate(
        id, 
        body,
        { new: true }, 
        (err, usuarioDB)=>{
           
            if( err ){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if( !usuarioDB ){
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe el usuario'
                    }
                })
            }
    
            res.json({
                status: true,
                usuario: usuarioDB
            })
    })
})

//========================
// Elimina una usuario
// =======================
app.delete('/usuario/:id', verificarToken, (req, res) => {

    const id = req.params.id

    const cambiaEstado = {
        eliminado: true
    }

    Usuario.findByIdAndUpdate(
        id, 
        cambiaEstado,
        { new: true }, 
        (err, usuarioBorrado )=>{
           
            if( err ){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if( !usuarioBorrado ){
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe el usuario'
                    }
                })
            }
    
            res.json({
                status: true,
                usuario: usuarioBorrado
            })
    })
})


module.exports = app