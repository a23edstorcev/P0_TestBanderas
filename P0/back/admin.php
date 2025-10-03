<?php
session_start();
header('Content-Type: application/json');

require_once "queries.php";

$phpInput = 'php://input';
$action = $_GET['action'] ?? '';

// CREATE - Crear pregunta
if ($action === 'create') {
    $question = $_POST['question'] ?? '';
    $answer_1 = $_POST['answer_1'] ?? '';
    $answer_2 = $_POST['answer_2'] ?? '';
    $answer_3 = $_POST['answer_3'] ?? '';
    $answer_4 = $_POST['answer_4'] ?? '';
    $correct_answer = $_POST['correct_answer'] ?? 1;
    $imagen = null;

    // Procesar imagen
    if (!empty($_FILES['imagen']['name'])) {
        $targetDir = __DIR__ . "/../front/img/";
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = uniqid() . "_" . basename($_FILES['imagen']['name']);
        $targetFile = $targetDir . $fileName;

        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFile)) {
            $imagen = "img/" . $fileName; // Ruta relativa para la BD
        }
    }

    if (empty($question) || empty($answer_1) || empty($answer_2) || empty($answer_3) || empty($answer_4) || empty($imagen)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
        exit;
    }

    if ($correct_answer < 1 || $correct_answer > 4) {
        echo json_encode(['success' => false, 'message' => 'La respuesta correcta debe ser 1, 2, 3 o 4']);
        exit;
    }

    $result = createQuestion($question, $answer_1, $answer_2, $answer_3, $answer_4, $correct_answer, $imagen);
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
    $id = $_POST['id'] ?? 0;
    $question = $_POST['question'] ?? '';
    $answer_1 = $_POST['answer_1'] ?? '';
    $answer_2 = $_POST['answer_2'] ?? '';
    $answer_3 = $_POST['answer_3'] ?? '';
    $answer_4 = $_POST['answer_4'] ?? '';
    $correct_answer = $_POST['correct_answer'] ?? 1;
    $imagen = $_POST['imagen_actual'] ?? null; // valor previo

    // Si suben nueva imagen, se guarda y reemplaza
    if (!empty($_FILES['imagen']['name'])) {
        $targetDir = __DIR__ . "/../front/img/";
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = uniqid() . "_" . basename($_FILES['imagen']['name']);
        $targetFile = $targetDir . $fileName;

        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFile)) {
            $imagen = "img/" . $fileName;
        }
    }

    if ($id <= 0 || empty($question) || empty($answer_1) || empty($answer_2) || empty($answer_3) || empty($answer_4) || empty($imagen)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
        exit;
    }

    if ($correct_answer < 1 || $correct_answer > 4) {
        echo json_encode(['success' => false, 'message' => 'La respuesta correcta debe ser 1, 2, 3 o 4']);
        exit;
    }

    $result = updateQuestion($id, $question, $answer_1, $answer_2, $answer_3, $answer_4, $correct_answer, $imagen);
    echo json_encode($result);
    exit;
}

// DELETE - Eliminar pregunta
if ($action === 'delete') {
    $input = file_get_contents($phpInput);
    $data = json_decode($input, true);
    
    $id = $data['id'] ?? $_GET['id'] ?? 0;
    
    if ($id <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID no válido']);
        exit;
    }
    
    $result = deleteQuestion($id);
    echo json_encode($result);
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Acción no válida']);
