const express = require('express');
const app = express();

const path = require ('path');
require('dotenv').config();

//Node server
const server = require('http').createServer(app);
//Se export el IO para que pueda ser usado desde el archivo socket.js
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//Path publico
const publicPath = path.resolve( __dirname,'public' )

app.use(express.static(publicPath));

server.listen( process.env.PORT, (err) => {
    
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

    }
);