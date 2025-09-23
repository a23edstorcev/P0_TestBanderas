<?php
header('Content-Type: application/json');

$host = "host.docker.internal";
$user = "a23edstorcev";
$password = "";
$dbname = "ACT4";

$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// echo json_encode(["success" => "Connected successfully"]);
?>