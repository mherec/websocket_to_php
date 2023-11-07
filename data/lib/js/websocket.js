// Listen for the DOMContentLoaded event which fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', (event) => {

    // Define the WebSocket server IP address and port
    const wsIp = 'ws://192.168.1.39:8080/';
    // Create a new WebSocket connection using the server IP
    const ws = new WebSocket(wsIp);

    // Get the DOM elements for logging and chat messages
    const logBox = document.getElementById('isLog');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('isChat');
    // Add an event listener to the send button for sending messages
    sendBtn.addEventListener('click', send);

    // WebSocket event for when the connection is opened
    ws.onopen = function () {
        // Prepare a message indicating the WebSocket client has connected
        const alert = {
            alert: 'ok',
            type: 'info',
            message: 'WebSocket Client Connected'
        }
        // Display the connection message and log it
        ezLoader('php_loaderBox', alert)
        consoleLog('WebSocket Client Connected', 'ok')
    };

    // WebSocket event for when a message is received from the server
    ws.onmessage = function (e) {
        console.log("Received: '" + e.data + "'");
        // Prepare the received message for display
        const data = {
            alert: 'ok',
            type: 'data',
            message: e.data
        }
        // Log the received message in the chat
        consoleLog(e.data, 'chat')

        // Display the received message
        ezLoader('php_loaderBox', data)
    }

    // WebSocket event for when the connection is closed
    ws.onclose = function () {
        // Prepare a message indicating the WebSocket client has disconnected
        const alert = {
            alert: 'error',
            type: 'error',
            message: 'WebSocket Client Disconnected'
        }
        // Display the disconnection message and log it
        ezLoader('php_loaderBox', alert)
        consoleLog('WebSocket Client Disconnected', 'error')
    }

    // Function to log messages to the console and the appropriate log box in the UI
    function consoleLog(data, type) {
        let reStyle = "";
        // Depending on the type of message, append it to the log box with a specific style
        switch (type) {
            case 'ok':
                logBox.innerHTML += spaner(data, 'type-ok')
                break;
            case 'log':
                logBox.innerHTML += spaner(data, 'type-log')
                break;
            case 'error':
                logBox.innerHTML += spaner(data, 'type-error')
                break;
            case 'chat':
                chatBox.innerHTML += spaner(data, 'type-chat')
                break;
            case 'me':
                chatBox.innerHTML += spaner(data, 'type-me')
                break;
            default:
                logBox.innerHTML += spaner(data, '')
                break;
        }
        logBox.scrollTop = logBox.scrollHeight;
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function spaner(data, type) {
        const time = new Date().toLocaleTimeString(); // Get the current time
        return `<span class="${type}">${time} : ${data}</span>`;
    }

    // Function to send a message through the WebSocket connection
    function send() {
        // Get the message from the input field
        const data = document.getElementById('isMessage').value;
        // Log the message as 'me' in the chat
        consoleLog(data, 'me')
        // Check if the WebSocket connection is open before sending
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
        } else {
            // If the WebSocket is not connected, log an error
            consoleLog('WebSocket is not connected.', 'error');
        }
    }

    // Asynchronous function to handle the loading animation and interaction with a PHP backend
    async function ezLoader(id, data) {
        try {
            // Send a POST request to the PHP backend with the data
            const response = await fetch('data/lib/php/router.php?page=runtime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Check if the response from the PHP backend is not OK and throw an error if so
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Get the text result from the response and display it in the UI
            const result = await response.text();
            document.getElementById(id).innerHTML = result;
        } catch (error) {
            // Log any errors that occur during the fetch operation
            console.error('Wystąpił błąd podczas ładowania danych:', error);
            document.getElementById(id).innerHTML = 'Wystąpił błąd podczas ładowania danych.';
        }
    }
});
