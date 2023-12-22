const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

let users = 0;

io.on('connection', function (socket) {
    console.log('user connected');
    users++;
    io.emit('update users', users);

    socket.on('chat message', function (msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
        users--;

       
        io.emit('update users', users);
    });



})




http.listen(PORT, () => {
    console.log(`Server listening of PORT : ${PORT}`)
})


