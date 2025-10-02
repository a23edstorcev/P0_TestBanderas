<?php
require_once "db.php";

function getRandomQuestion($limite) {
    global $conn;

    $stmn = $conn->prepare("SELECT * FROM preguntas ORDER BY rand() limit ?");
    $stmn->bind_param("i", $limite);
    $stmn->execute();
    $result = $stmn->get_result();

    $preguntas = [];

    while ($row = $result->fetch_assoc()) {
        $preguntas[] = $row;
    }
 
    $stmn->close();
    return $preguntas;
}

// CREATE - Crear pregunta
function createQuestion($question, $answer_1, $answer_2, $answer_3, $answer_4, $correct_answer, $imagen) {
    global $conn;
    
    $stmt = $conn->prepare("INSERT INTO preguntas (question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssis", $question, $answer_1, $answer_2, $answer_3, $answer_4, $correct_answer, $imagen);
    
    if ($stmt->execute()) {
        $result = [
            'success' => true,
            'message' => 'Pregunta creada exitosamente',
            'id' => $conn->insert_id
        ];
    } else {
        $result = ['success' => false, 'message' => 'Error: ' . $stmt->error];
    }
    
    $stmt->close();
    return $result;
}

// READ - Obtener todas las preguntas
function getAllQuestions() {
    global $conn;
    
    $result = $conn->query("SELECT * FROM preguntas ORDER BY id DESC");
    
    if ($result) {
        $preguntas = [];
        while ($row = $result->fetch_assoc()) {
            $preguntas[] = $row;
        }
        return ['success' => true, 'data' => $preguntas];
    } else {
        return ['success' => false, 'message' => 'Error: ' . $conn->error];
    }
}

// READ - Obtener pregunta por ID
function getQuestionById($id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT * FROM preguntas WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $pregunta = $result->fetch_assoc();
        $response = ['success' => true, 'data' => $pregunta];
    } else {
        $response = ['success' => false, 'message' => 'Pregunta no encontrada'];
    }
    
    $stmt->close();
    return $response;
}

// UPDATE - Actualizar pregunta
function updateQuestion($id, $question, $answer_1, $answer_2, $answer_3, $answer_4, $correct_answer, $imagen) {
    global $conn;
    
    $stmt = $conn->prepare("UPDATE preguntas SET question = ?, answer_1 = ?, answer_2 = ?, answer_3 = ?, answer_4 = ?,
    correct_answer = ?, imagen = ? WHERE id = ?");
    $stmt->bind_param("sssssisi", $question, $answer_1, $answer_2, $answer_3, $answer_4, $correct_answer, $imagen, $id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            $result = ['success' => true, 'message' => 'Pregunta actualizada exitosamente'];
        } else {
            $result = ['success' => false, 'message' => 'Pregunta no encontrada o sin cambios'];
        }
    } else {
        $result = ['success' => false, 'message' => 'Error: ' . $stmt->error];
    }
    
    $stmt->close();
    return $result;
}

// DELETE - Eliminar pregunta
function deleteQuestion($id) {
    global $conn;
    
    $stmt = $conn->prepare("DELETE FROM preguntas WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            $result = ['success' => true, 'message' => 'Pregunta eliminada exitosamente'];
        } else {
            $result = ['success' => false, 'message' => 'Pregunta no encontrada'];
        }
    } else {
        $result = ['success' => false, 'message' => 'Error: ' . $stmt->error];
    }
    
    $stmt->close();
    return $result;
}

