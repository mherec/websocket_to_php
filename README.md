﻿# Web Socket TO PHP file
 ## Replace IP adress in /data/lib/js/webcosket.js
This is a simple demonstration of how to receive data from a WebSocket using JavaScript and then send it to a PHP file using a POST request.

The index.php page establishes a connection with a WebSocket and then receives/sends data. If an incoming message is detected, the JavaScript script processes it into JSON data and sends it via POST to the runtime.php file. The same process occurs with any emerging connection errors. Additionally, the example includes simple PHP routing, a visual log, and a chat interface for reading data and errors. 

To run the example(you will need a PHP server like a Xampp): open the index.php file in the root directory.
To start the WebSocket server(you must have NodeJS installed): execute node app from the server directory.
