<?php

function testOk()
{
    echo "<hr /> PHP test OK <br /><br /><br />
    <img src='data/public/img/ok.png' alt='ok' width='100px' height='100px' />";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Odczytanie surowych danych JSON z treści żądania
    $json = file_get_contents('php://input');
    $data = json_decode($json, true); // konwersja JSON na tablicę PHP

    if ($data) {
        echo "<b>Otrzymane dane Web Socket:</b><br />";
        foreach ($data as $key => $value) {
            echo htmlspecialchars($key) . ': ' . htmlspecialchars($value) . "\n<br />";
            if ($key == "message" && $value == "test-ok") {
                testOk();
            }
        }
    } else {
        echo "Brak przesyłanych danych";
    }
} else {
    echo "Brak przesyłanych danych";
}
