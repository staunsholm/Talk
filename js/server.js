var io = require('socket.io');
var iphone = io.listen(8007);
var impress = io.listen(8008);

var iphoneSocket, impressSocket;

iphone.sockets.on('connection', function (socket)
{
    iphoneSocket = socket;

    iphoneSocket.on('swipeLeft', function (data)
    {
        console.log("swipeLeft");
        impressSocket && impressSocket.emit('swipeLeft');
    });
    iphoneSocket.on('swipeRight', function (data)
    {
        console.log("swipeRight");
        impressSocket && impressSocket.emit('swipeRight');
    });
});

impress.sockets.on('connection', function (socket)
{
    impressSocket = socket;

    impressSocket.on('select', function(data)
    {
        iphoneSocket && iphoneSocket.emit('select', data);
    });
});