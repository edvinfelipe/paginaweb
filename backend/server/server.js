const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('Servidor back-end de la página web Pro-Tech')
})

// Puerto dónde escucha el servidor
app.listen(3000, () => {
    console.log('Escuchando al puert 3000');
})