const express = require('express')

const app = express()

// Endpoints de la API
app.use(require('./categoria'))
app.use(require('./marca'))
app.use(require('./usuario'))
app.use(require('./login'))
app.use(require('./producto'))
app.use(require('./clientes_registrados'))
app.use(require('./factura'))
app.use(require('./detalle_factura'))

if( process.env.CLOUD_NAME ){
    app.use(require('./uploadcloud'))
}else{

    app.use(require('./upload'))
}

app.use(require('./imagenes'))


module.exports = app