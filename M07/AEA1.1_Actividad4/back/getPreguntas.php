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
echo "Connected successfully";

$sqlSelectQuestions = "SELECT * FROM questions ORDER BY rand() limit ?";
$sqlSelectQuestions->bind_param("i", $numPreguntas);
$sqlSelectQuestions->execute();
// $selectResultado = $conn->query($sqlSelect);
// $selectResultado->fetch_assoc();


// if($selectResultado->num_rows > 0) {
//     while ($row = $selectResultado->fetch_assoc()) {
//     echo "Ek resultado de la tabla con id: " . $row["id"] . " y la pregunta: " . $row["question"];
// }
// }





// ///////////////////////////////////////////
// $quizJson = file_get_contents("../quiz.json");
// $quizArray = json_decode($quizJson, true);
// $allQuestions = $quizArray['questions'];

// $action = $_GET['action'] ?? '';

// if ($action === 'getPreguntas') {
//     $n = isset($_GET['n']) ? intval($_GET['n']) : 10;

//     shuffle($allQuestions);
//     $questions = array_slice($allQuestions, 0, $n);

//     foreach ($questions as &$q) {
//         unset($q['correctIndex']);
//     }
//     echo json_encode($questions);
//     exit;
// }

// if ($action === 'finalitza') {
//     $input = file_get_contents('php://input');
//     $data = json_decode($input, true);
//     $respuestas = $data['respuestas'] ?? [];

//     $total = count($respuestas);
//     $correctas = 0;

//     for ($i = 0; $i < $total; $i++) {
//         if (isset($allQuestions[$i]) && isset($respuestas[$i])) {
//             if ($allQuestions[$i]['correctIndex'] === $respuestas[$i]) {
//                 $correctas++;
//             }
//         }
//     }

//     echo json_encode([
//         'total' => $total,
//         'correctas' => $correctas,
//     ]);
//     exit;
// }

// http_response_code(400);
// echo json_encode(['error' => 'Acción no válida']);
