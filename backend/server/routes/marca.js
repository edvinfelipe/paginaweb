/* ROUTE de marca */
const express = require('express')
const app = express()

const _ = require('underscore')

const Marca = require('../models/marca')

const { verificarToken, verificarRole } = require('../middleware/autenticacion')

//=====================
// Lista de marcas
// ====================
app.get('/api/marca', (req, res)=>{

    Marca.find({eliminado: false}, 'nombre' )
        .sort('nombre')
        .exec((err, marcas)=>{

            if( err ){ 
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            res.json({
                status: true,
                marcas
            })
        })
        
})

//======================
// Regresa una marca
// =====================
app.get('/api/marca/:id', (req, res)=>{

    const id = req.params.id

    Marca.findOne( { _id: id, eliminado: false}, 'nombre', (err, marcaDB)=>{

        if( err ){ 
            return res.status(500).json({
                status: false,
                err
            })
        }

        if( !marcaDB ){
            return res.status(404).json({
                status: false,
                err: {
                    message: 'No existe la marca'
                }
            })
        }

        res.json({
            status: true,
            marca: marcaDB
        })
    })
        
})

//=====================
// Crea una marca
// ====================
app.post('/api/marca', [ verificarToken, verificarRole ], async(req, res) => {

    try {

        const { nombre } = req.body

        let marca = await Marca.findOne({ nombre })

        if( marca ){

            marca.eliminado = false
            marca.save() 

            return res.json({
                status: true,
                marca
            }) 
        }

        marca = new Marca({ nombre })
        await marca.save()

        return res.json({
            status: true,
            marca
        })
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            err
        })
    }
})

//========================
// Modifica una marca
// =======================
app.put('/api/marca/:id', [ verificarToken, verificarRole ], (req, res) => {

    const id = req.params.id

    const body = _.pick(req.body,'nombre','eliminado')

    Marca.findByIdAndUpdate(
        id, 
        body,
        { new: true }, 
        (err, marcaDB)=>{
           
            if( err ){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if( !marcaDB ){
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe la marca'
                    }
                })
            }
    
            res.json({
                status: true,
                marca: marcaDB
            })
    })
})

//========================
// Elimina una marca
// =======================
app.delete('/api/marca/:id', [ verificarToken, verificarRole ], (req, res) => {

    const id = req.params.id

    const cambiaEstado = {
        eliminado: true
    }

    Marca.findByIdAndUpdate(
        id, 
        cambiaEstado,
        { new: true }, 
        (err, marcaBorrado )=>{
           
            if( err ){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if( !marcaBorrado ){
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe la marca'
                    }
                })
            }
    
            res.json({
                status: true,
                marca: marcaBorrado
            })
    })
})


module.exports = app