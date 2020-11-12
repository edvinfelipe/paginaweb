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

// =============================
//  Verificar AdminRole
// =============================
const verificarRole = (req,res, next)=>{

    const { role } = req.usuario

    if( role === 'ADMIN_ROLE'){
        return next()
    }

    return res.status(401).json({
        status: false,
        err: {
            message: 'No tiene privilegio'
        }
    })
}

module.exports = {
    verificarToken,
    verificarRole
}