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

    echo json_encode($RandPreguntas);
    exit;
}

if ($action === 'finalitza') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $respuestas = $data['respuestas'] ?? [];

    $RandPreguntas = $_SESSION['questions'] ?? [];
    $total = count($respuestas);
    $correctas = 0;

    for ($i = 0; $i < $total; $i++) {
        if (isset($RandPreguntas[$i]) && isset($respuestas[$i])) {
            if (($RandPreguntas[$i]['correct_answer'] - 1) === $respuestas[$i]) {
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
$action = $_GET['action'] ?? '';

// CREATE - Crear pregunta
if ($action === 'create') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    $question = $data['question'] ?? '';
    $answer_1 = $data['answer_1'] ?? '';
    $answer_2 = $data['answer_2'] ?? '';
    $answer_3 = $data['answer_3'] ?? '';
    $answer_4 = $data['answer_4'] ?? '';
    $correct_answer = $data['correct_answer'] ?? 1;
    
    if (empty($question) || empty($answer_1) || empty($answer_2) || empty($answer_3) || empty($answer_4)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
        exit;
    }
    
    if ($correct_answer < 1 || $correct_answer > 4) {
        echo json_encode(['success' => false, 'message' => 'La respuesta correcta debe ser 1, 2, 3 o 4']);
        exit;
    }
    
    $result = createQuestion($question, $answer_1, $answer_2, $answer_3, $answer_4, $correct_answer);
    echo json_encode($result);
    exit;
}

// READ - Obtener todas las preguntas
if ($action === 'read') {
    $result = getAllQuestions();
    echo json_encode($result);
    exit;
}

// READ - Obtener pregunta por ID
if ($action === 'readOne') {
    $id = $_GET['id'] ?? 0;
    
    if ($id <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID no válido']);
        exit;
    }
    
    $result = getQuestionById($id);
    echo json_encode($result);
    exit;
}

// UPDATE - Actualizar pregunta
if ($action === 'update') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    $id = $data['id'] ?? 0;
    $question = $data['question'] ?? '';
    $answer_1 = $data['answer_1'] ?? '';
    $answer_2 = $data['answer_2'] ?? '';
    $answer_3 = $data['answer_3'] ?? '';
    $answer_4 = $data['answer_4'] ?? '';
    $correct_answer = $data['correct_answer'] ?? 1;
    
    if ($id <= 0 || empty($question) || empty($answer_1) || empty($answer_2) || empty($answer_3) || empty($answer_4)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
        exit;
    }
    
    if ($correct_answer < 1 || $correct_answer > 4) {
        echo json_encode(['success' => false, 'message' => 'La respuesta correcta debe ser 1, 2, 3 o 4']);
        exit;
    }
    
    $result = updateQuestion($id, $question, $answer_1, $answer_2, $answer_3, $answer_4, $correct_answer);
    echo json_encode($result);
    exit;
}

// DELETE - Eliminar pregunta
if ($action === 'delete') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    $id = $data['id'] ?? $_GET['id'] ?? 0;
    
    if ($id <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID no válido']);
        exit;
    }
    
    $result = deleteQuestion($id);
    echo json_encode($result);
    exit;
}$result;

http_response_code(400);
echo json_encode(['error' => 'Acción no válida']);
