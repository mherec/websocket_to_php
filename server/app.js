const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('Nowy klient podłączony.');

    ws.on('message', function incoming(message) {
        console.log('Otrzymano: %s', message);
        if (message == 'test') {
            ws.send('test-ok');
        }
    });
    ws.send('Witaj na serwerze WebSocket!');

    setInterval(() => {
        ws.send('Connection OK!');
    }, 1000);
});

console.log('Serwer WebSocket uruchomiony na porcie 8080.');
