<?php 
session_start();
header('Content-Type: application/json');

$quizJson = file_get_contents("../quiz.json");
$quizArray = json_decode($quizJson, true);
$allQuestions = $quizArray['questions'];

$action = $_GET['action'] ?? '';

if ($action === 'getPreguntas') {
    $n = isset($_GET['n']) ? intval($_GET['n']) : 10;
    
    shuffle($allQuestions);
    $questions = array_slice($allQuestions, 0, $n);
    
    // Guardar las preguntas seleccionadas en la sesión
    $_SESSION['questions'] = $questions;
    
    foreach ($questions as &$q) {
        unset($q['correctIndex']);
    }
    echo json_encode($questions);
    exit;
}

if ($action === 'finalitza') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $respuestas = $data['respuestas'] ?? [];
    
    // Usar las preguntas guardadas en la sesión
    $questions = $_SESSION['questions'] ?? [];
    
    $total = count($respuestas);
    $correctas = 0;
    
    for ($i = 0; $i < $total; $i++) {
        if (isset($questions[$i]) && isset($respuestas[$i])) {
            if ($questions[$i]['correctIndex'] === $respuestas[$i]) {
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

http_response_code(400);
echo json_encode(['error' => 'Acción no válida']);
?>