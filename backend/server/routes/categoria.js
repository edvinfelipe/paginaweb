/* ROUTE de categoria */
const express = require('express')
const app = express()

const _ = require('underscore')

const Categoria = require('../models/categoria')

const { verificarToken, verificarRole } = require('../middleware/autenticacion')

//=====================
// Lista de categorias
// ====================
app.get('/categoria', (req, res) => {

    Categoria.find({ eliminado: false }, 'nombre')
        .sort('nombre')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            res.json({
                status: true,
                categorias
            })
        })

})

//======================
// Regresa una categoria
// =====================
app.get('/categoria/:id', (req, res) => {

    const id = req.params.id

    Categoria.findOne({ _id: id, eliminado: false }, 'nombre', (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(404).json({
                status: false,
                err: {
                    message: 'No existe la categoria'
                }
            })
        }

        res.json({
            status: true,
            categoria: categoriaDB
        })
    })

})

//=====================
// Crea una categoria
// ====================
app.post('/categoria', [verificarToken, verificarRole], (req, res) => {

    const { nombre } = req.body

    Categoria.findOne({ nombre }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            })
        }

        if (categoriaDB) {
            categoriaDB.eliminado = false
            categoriaDB.save()

            return res.json({
                status: true,
                categoria: categoriaDB
            })
        }

        const categoria = new Categoria({ nombre })
        categoria.save((err, categoriaNew) => {
            return res.json({
                status: true,
                marca: categoriaNew
            })
        })

    })
})

//========================
// Modifica una categoria
// =======================
app.put('/categoria/:id', [verificarToken, verificarRole], (req, res) => {

    const id = req.params.id

    const body = _.pick(req.body, 'nombre', 'eliminado')

    Categoria.findByIdAndUpdate(
        id,
        body, { new: true },
        (err, categoriaDB) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if (!categoriaDB) {
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe la categoria'
                    }
                })
            }

            res.json({
                status: true,
                categoria: categoriaDB
            })
        })
})

//========================
// Elimina una categoria
// =======================
app.delete('/categoria/:id', [verificarToken, verificarRole], (req, res) => {

    const id = req.params.id

    const cambiaEstado = {
        eliminado: true
    }

    Categoria.findByIdAndUpdate(
        id,
        cambiaEstado, { new: true },
        (err, categoriaBorrado) => {

            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            if (!categoriaBorrado) {
                return res.status(404).json({
                    status: false,
                    err: {
                        message: 'No existe la categoria'
                    }
                })
            }

            res.json({
                status: true,
                categoria: categoriaBorrado
            })
        })
})


module.exports = app