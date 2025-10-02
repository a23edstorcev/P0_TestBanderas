<?php
header('Content-Type: application/json');

function loadEnv($file) {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue; // Ignorar comentarios
        list($name, $value) = explode('=', $line, 2);
        $value = trim($value, " \t\n\r\0\x0B'\""); // Quitar espacios y comillas
        $_ENV[$name] = $value;
    }
}

loadEnv(__DIR__ . '/.env');

$host = $_ENV['DB_HOST'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$dbname = $_ENV['DB_NAME'];

$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

