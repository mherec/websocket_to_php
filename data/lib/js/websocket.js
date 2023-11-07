document.addEventListener('DOMContentLoaded', (event) => {

    const wsIp = 'ws://192.168.1.39:8080/';
    const ws = new WebSocket(wsIp);

    const logBox = document.getElementById('isLog');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('isChat');
    sendBtn.addEventListener('click', send);

    ws.onopen = function () {
        const alert = {
            alert: 'ok',
            type: 'info',
            message: 'WebSocket Client Connected'
        }
        ezLoader('php_loaderBox', alert)
        consoleLog('WebSocket Client Connected', 'ok')
    };

    ws.onmessage = function (e) {
        console.log("Received: '" + e.data + "'");
        const data = {
            alert: 'ok',
            type: 'data',
            message: e.data
        }
        consoleLog(e.data, 'chat')

        ezLoader('php_loaderBox', data)

    }

    ws.onclose = function () {
        const alert = {
            alert: 'error',
            type: 'error',
            message: 'WebSocket Client Disconnected'
        }
        ezLoader('php_loaderBox', alert)
        consoleLog('WebSocket Client Disconnected', 'error')
    }

    function consoleLog(data, type) {
        const time = new Date().toLocaleTimeString();
        switch (type) {
            case 'ok':
                logBox.innerHTML += `<span class="type-ok">${time} : ${data}</span>`;
                break;
            case 'log':
                logBox.innerHTML += `<span class="type-log">${time} : ${data}</span>`;
                break;
            case 'error':
                logBox.innerHTML += `<span class="type-error">${time} : ${data}</span>`;
                break;
            case 'chat':
                chatBox.innerHTML += `<span class="type-chat">${time} : ${data}</span>`;
                break;
            case 'me':
                chatBox.innerHTML += `<span class="type-me">${time} : ${data}</span>`;
                break;

            default:
                logBox.innerHTML += `<span>${data}</span>`;
                break;
        }
    }

    function send() {
        const data = document.getElementById('isMessage').value;
        consoleLog(data, 'me')
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
        } else {
            consoleLog('WebSocket is not connected.', 'error');
        }
    }

    async function ezLoader(id, data) {
        try {
            const response = await fetch('data/lib/php/runtime.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.text();
            document.getElementById(id).innerHTML = result;
        } catch (error) {
            console.error('Wystąpił błąd podczas ładowania danych:', error);
            document.getElementById(id).innerHTML = 'Wystąpił błąd podczas ładowania danych.';
        }
    }


}); 