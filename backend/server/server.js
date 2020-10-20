require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Use cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// configuración global de rutas
app.use('/api',require('./routes/index'))


// Conexión a la base de datos
mongoose.connect(process.env.URLDB, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, res) =>{

    if( err ) throw err

    console.log('Base de datos ONLINE')
});

// Puerto dónde escucha el servidor
app.listen( process.env.PORT, () => {
    console.log('Escuchando al puerto:',process.env.PORT);
})