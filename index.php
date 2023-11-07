<html>

<head>
    <title>JS to PHP WebSocket bridge</title>
    <style>
        <?PHP require_once("data/lib/css/style.css"); ?>
    </style>
    <script>
        <?PHP require_once("data/lib/js/websocket.js"); ?>
    </script>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="title">
                JS to PHP WebSocket bridge
            </div>
            <div class="exit">x</div>
        </div>
        <div class="col-big">
            <div class="col-left">
                <div class="chat-container">

                    <div class="chat" id="isChat"></div>

                    <div class="send">
                        <input type="text" class="message" id="isMessage" placeholder="Message..." />
                        <input type="button" id="send-btn" value="Send" />
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