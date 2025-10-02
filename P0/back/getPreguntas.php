<?php
session_start();
header('Content-Type: application/json');

require_once "queries.php";

$action = $_GET['action'] ?? '';

if ($action === 'getPreguntas') {
    $n = isset($_GET['n']) ? intval($_GET['n']) : 10;

    $RandPreguntas = getRandomQuestion($n);

    $_SESSION['questions'] = $RandPreguntas;
    
    foreach ($RandPreguntas as &$q) {
        unset($q['correct_answer']);
    }

    $preguntasJSON = [];
    foreach ($RandPreguntas as $q) {
        $preguntasJSON[] = [
            'id' => $q['id'],
            'pregunta' => $q['question'],
            'respuestas' => [$q['answer_1'], $q['answer_2'], $q['answer_3'], $q['answer_4']],
            'imagen' => $q['imagen'] ?? ""
        ];
    }
    unset($q);

    echo json_encode($preguntasJSON);
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Acción no válida']);

