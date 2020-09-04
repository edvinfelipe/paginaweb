// 1. Pagos con tarjetas de créditos
// 2. Utilizació de google analitics y métricas 
// 3. Certificación de csl

const jwt = require('jsonwebtoken')

const verificarToken = ( req, res, next ) => {

    const token = req.get('Authorization')

    jwt.verify( token, process.env.SEED, (err, decoded)=>{

        if( err ){
            return res.status(401).json({
                status: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decoded.usuario

        next()

    })
}

module.exports = verificarToken