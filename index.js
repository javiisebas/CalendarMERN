const express = require('express');
const cors = require('cors')
require('dotenv').config()

const {
    dbConnection
} = require('./database/config');
const {
    headersConfig
} = require('./middlewares/headersConfig');

const app = express()

// Base de datos
dbConnection()

// CORS
app.use(cors())

// Directorio público
app.use(express.static('public'))

// Lectura y parseo del body 
app.use(express.json())

// CORS Error handling -> Headers settings 
app.use(headersConfig);

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${4000}!!`);
})