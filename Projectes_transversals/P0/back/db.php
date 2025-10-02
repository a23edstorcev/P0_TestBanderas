<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "a23edstorcev_a23edstorcev";
$password = "(RZy+-C+/7]mJL?T";
$dbname = "a23edstorcev_projecte0";

$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// echo json_encode(["success" => "Connected successfully"]);
?>