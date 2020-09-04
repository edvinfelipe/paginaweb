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
//  Base de datos
//==========================================
let urlDB

if( process.env.NODE_ENV === 'dev' ){
    urlDB = 'mongodb://localhost:27017/protech'
}

process.env.URLDB = urlDB
