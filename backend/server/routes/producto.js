/* ROUTE de producto  */

const express = require('express')

const app = express()
const _ = require('underscore')

const Producto = require('../models/producto')

const verificarToken = require('../middleware/autenticacion')

//==============================
// Lista de todos los productos 
//==============================
app.get('/api/producto',( req, res )=>{

    let desde = Number( req.query.page || 1 )
        desde = 10*(desde - 1)


    Producto.find({ descontinuado: false }  )
        .skip(desde)
        .limit(10)
        .populate('categoria','nombre')
        .populate('marca','nombre')
        .exec((err, productos) => {

            if(err){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            Producto.countDocuments( { descontinuado: false }, (err, conteo)=>{

                res.json({
                    status: true,
                    count: conteo,
                    productos,
    
                })
            })

        })
})

//==============================
// Lista de productos por marca 
//==============================
app.get('/api/producto/marca/:categoria/:marca',( req, res )=>{

    let desde = Number( req.query.page || 1 )
        desde = 10*(desde - 1)
    
    const categoria = req.params.categoria 
    const marca = req.params.marca 


    Producto.find({ descontinuado: false, categoria, marca }  )
        .skip(desde)
        .limit(10)
        .exec((err, productos) => {

            if(err){
                return res.status(500).json({
                    status: false,
                    err
                })
            }

            Producto.countDocuments( { descontinuado: false }, (err, conteo)=>{

                res.json({
                    status: true,
                    count: conteo,
                    productos,
    
                })
            })

        })
})

// ===========================
//  Crear un nuevo producto
// ===========================
app.post('/api/producto', verificarToken, (req, res) => {
     

    let body = req.body;

    let producto = new Producto({
        nombre:           body.nombre,
        precio:           body.precio,
        descripcion:      body.descripcion,
        existencia:       body.existencia,
        especificacion:   body.especificacion,
        disponible:       body.disponible,
        garantia:         body.garantia,
        ofertado:         body.ofertado,
        porcenjateOferta: body.porcenjateOferta,
        marca:            body.marca,
        categoria:        body.categoria,
        usuario:          req.usuario._id
    })

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            })
        }

        res.status(201).json({
            status: true,
            producto: productoDB
        })

    });

});

// ===========================
//  Actualizar un producto
// ===========================
app.put('/api/producto/:id', verificarToken, (req, res) => { 

    let body = _.pick(req.body,
    [   'nombre',
        'precio',
        'descripcion',
        'existencia',
        'especificacion',
        'disponible',
        'garantia',
        'ofertado',
        'porcenjateOferta',
        'marca',
        'categoria'
    ])
    
    const id = req.params.id

    Producto.findByIdAndUpdate(
        id,
        body,
        { new: true},
        (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        }

        if( !productoDB ){
            return res.status(404).json({
                status: false,
                err: {
                    message: 'No existe el producto'
                }
            })
        }

        res.status(201).json({
            status: true,
            producto: productoDB
        });

    });

});
// ===========================
//  Eliminar un producto
// ===========================
app.delete('/api/producto/:id', verificarToken, (req, res) => { 

    
    
    const id = req.params.id

    Producto.findByIdAndUpdate(
        id,
        { descontinuado: true },
        { new: true},
        (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        }

        if( !productoDB ){
            return res.status(404).json({
                status: false,
                err: {
                    message: 'No existe el producto'
                }
            })
        }

        res.status(201).json({
            status: true,
            producto: productoDB
        });

    });

});



module.exports = app