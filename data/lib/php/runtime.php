<?php

/**
 * Outputs a test confirmation message with an image.
 */
function testOk()
{
    // Using heredoc syntax for cleaner output of HTML
    echo <<<HTML
    <hr /> PHP test OK <br /><br /><br />
    <img src='data/public/img/ok.png' alt='ok' width='100' height='100' />
    HTML;
}

// Check if the server request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read raw JSON data from the request body
    $json = file_get_contents('php://input');
    // Convert JSON to a PHP array
    $data = json_decode($json, true);

    if ($data) {
        echo "<h2>File: runtime.php</h2><br />";
        echo "<b>Received Web Socket Data:</b><br />";
        // Iterate over each key-value pair in the data
        foreach ($data as $key => $value) {
            // Sanitize the output to prevent XSS attacks
            echo htmlspecialchars($key) . ': ' . htmlspecialchars($value) . "<br />";
            // Check if the message is a 'test-ok' to call the testOk function
            if ($key === "message" && $value === "test-ok") {
                testOk();
            }
        }
    } else {
        // Inform the user if no data was received
        echo "No data received";
    }
} else {
    // Inform the user if the server request method is not POST
    echo "No data received - only POST method is accepted";
}
