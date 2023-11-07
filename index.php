<html>

<head>
    <title>JS to PHP WebSocket bridge</title>
    <link rel="stylesheet" type="text/css" href="data/lib/css/style.css">
    <script type="text/javascript" src="data/lib/js/websocket.js"></script>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="title">
                <img src="data/public/img/php.png" alt="php" width="20px" height="20px" />
                <span>JS to PHP WebSocket bridge</span>
            </div>
            <div class="exit" onClick="alert('Nothing to do');">x</div>
        </div>
        <div class="col-big">
            <div class="col-left">
                <div class="chat-container">
                    <div class="chat" id="isChat"></div>
                    <div class="send">
                        <input type="text" class="message" id="isMessage" placeholder="Message..." />
                        <input type="button" class="buttonSend" id="send-btn" value="Send" />
                    </div>
                </div>
            </div>
            <div class="col-right">
                <img src="data/public/img/php.png" alt="php" width="50px" height="50px" class="php_image" />
                <div class="php-file" id="php_loaderBox">
                </div>
            </div>
        </div>
        <div class="log" id="isLog">
        </div>
    </div>
</body>

</html>