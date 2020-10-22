/* ROUTE de cliente_Registados */

const express = require('express')
const app = express()

const _ = require('underscore')
const bcrypt = require('bcrypt')

const clientes_registrados = require('../models/clientes_registrados')

//=====================
// Crea una Cliente
// ====================

app.post('/cliente' , (req, res) => {

    let body = req.body

    const cliente = new Cliente({

        nombre:     body.nombre,
        direccion:  body.direccion,
        telefono:   body.telefono,
        correo:     body.correo,
        nit:        body.nit,
        username:   body.username,
        role:   body.role,
        password:   bcrypt.hashSync( body.password, 10 ),
    })

    cliente.save( (err, clienteDB )=>{

        if( err ){
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
app.get('/cliente', (req, res)=>{

    clientes_registrados.find( { eliminado:false })
        .exec((err, clientes)=>{

            if( err ){ 
                return res.status(500).json({
                    status: false,
                    err     
                })
            }

            res.json({
                status: true,
                clientes
            })
        })
        
})


//======================
// Regresa un cliente
// =====================
app.get('/cliente/:id', (req, res)=>{

    const id = req.params.id

    clientes_registrados.find({_id:id})

        .exec((err, cliente)=>{

            if( err ){ 
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
    app.put('/cliente/:id', (req, res) => {

        const id = req.params.id
    
        const body = _.pick(req.body,'nombre','direccion','telefono','correo','nit','username','password')
    
        clientes_registrados.findByIdAndUpdate(
            id, 
            body,
            { new: true }, 
            (err, clienteDB)=>{
               
                if( err ){
                    return res.status(500).json({
                        status: false,
                        err
                    })
                }
    
                if( !clienteDB ){
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
    
    app.delete('/cliente/:id', (req, res) => {

        const id = req.params.id
    
        const cambiaEstado = {
            eliminado: true
        }
    
        clientes_registrados.findByIdAndUpdate(
            id, 
            cambiaEstado,
            { new: true }, 
            (err, clienteBorrado )=>{
               
                if( err ){
                    return res.status(500).json({
                        status: false,
                        err
                    })
                }
    
                if( !clienteBorrado ){
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