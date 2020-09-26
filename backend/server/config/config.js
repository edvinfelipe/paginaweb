//==========================================
//  Puerto donde escucha 
//==========================================
process.env.PORT = process.env.PORT || 3000 


//==========================================
//  Entorno 
//==========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==========================================
//  Seed 
//==========================================
process.env.SEED = process.env.SEED || 'llave-secreta-desarrollo'

//==========================================
//  Vencimiento del token 
//==========================================
process.env.CADUCIDAD_TOKEN = '48h'

//==========================================
//  Dominio del servidor
//==========================================
process.env.DOMINIO = process.env.DOMINIO || 'http://localhost:3000' 

//==========================================
//  Cloud de imagenes
//==========================================

process.env.CLOUD_NAME = process.env.CLOUD_NAME || ''
process.env.API_KEY = process.env.API_KEY || ''
process.env.API_SECRET = process.env.API_SECRET || ''

//==========================================
//  Base de datos
//==========================================
let urlDB

if( process.env.NODE_ENV === 'dev' ){
    urlDB = 'mongodb://localhost:27017/protech'
}
else{
    urlDB = process.env.URI_DB 
}

process.env.URLDB = urlDB
