<?php 
session_start();
$_SESSION['puntuacion'] = 0;
$_SESSION['indexPregunta'] = 0;

if(!isset($_SESSION['preguntas'])) {
    $quizJson = file_get_contents("quiz.json");
    $quizArray = json_decode($quizJson, true);

    //Accedo a las preguntas para después elegir las 10 random
    $allQuestions = $quizArray['questions'];
    $slicedQuestions = array_slice($allQuestions, 0, 10);
    shuffle($slicedQuestions);

    $_SESSION['preguntas'] = $slicedQuestions;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Página de inicio</title>
</head>
<body>
    <a href="pregunta.php">
        <button><h1>Comenzar el juego</h1></button>
    </a>
</body>
</html>