<?php
// Retrieve the 'page' query parameter from the URL and sanitize it to prevent XSS attacks.
$redirect = htmlspecialchars($_GET['page']);

// Use a switch statement to determine which PHP file to include based on the 'page' parameter.
switch ($redirect) {
    case 'runtime':
        // If the 'page' parameter is 'runtime', include the 'runtime.php' file from the specified path.
        require_once('runtime.php');
        break;
}
