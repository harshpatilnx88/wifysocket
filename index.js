var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var connected = 0;

app.get('/', function (req, res) {
    res.send('<h1>Socket Server Is Running<br> Connected Clients : ' + connected + '</h1>');
});

// When the server receives a post request on /sendData
app.get('/sendData', function (req, res) {

    console.log('>>>>> in sendData >>>' + req.query.client);
    
    //send data to sockets.
    io.sockets.emit('client_'+req.query.client, { message: "Hello from server to >>>" + req.query.client })
    
    res.send({});
});

// When a new connection is requested
io.on('connection', function (socket) {

    connected = socket.client.conn.server.clientsCount;

    //console.log( socket.client.conn.server.clientsCount + " users connected >>>> " +socket.id );

});

// Listen to port 80
http.listen(80, function () {
    console.log('listening on *:80');
});

