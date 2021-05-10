const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('San benito') );
bands.addBand( new Band('Metallica') );


//Mensajes de sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    // Emite al cliente que se acaba de conectar
    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload)=> {
        console.log('Mensaje: ', payload);

        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });


    client.on('emitir-mensaje',(payload) => {
        // EMITE A TODOS LOS CLIENTES CONECTADOS
        // io.emit('nuevo-mensaje', payload);
        
        // EMITE A TODOS MENOS AL QUE LO EMITIO
        client.broadcast.emit('nuevo-mensaje', payload);
    } );

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands() );
    });

});