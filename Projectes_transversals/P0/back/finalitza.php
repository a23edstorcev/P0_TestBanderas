<?php
session_start();
header('Content-Type: application/json');

require_once "queries.php";

$action = $_GET['action'] ?? '';

if ($action === 'finalitza') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $respuestas = $data['respuestas'] ?? [];

    $RandPreguntas = $_SESSION['questions'] ?? [];
    $total = count($respuestas);
    $correctas = 0;

    for ($i = 0; $i < $total; $i++) {
        if (isset($RandPreguntas[$i]) && isset($respuestas[$i])) {
            if (($RandPreguntas[$i]['correct_answer'] - 1) == $respuestas[$i]) {
                $correctas++;
                
            }
        }
    }

    echo json_encode([
        'total' => $total,
        'correctas' => $correctas,
    ]);
    exit;
}
?>