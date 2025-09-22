<?php
session_start();
$preguntas = $_SESSION['preguntas'];
$indicePregunta = $_SESSION['indexPregunta'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $respuestaElegida = $_POST['indexRespuesta']; // Valor enviado por el botón
    $_SESSION['respuestasUsuario'][] = $respuestaElegida;

    echo "<h1>Resultado</h1>";
    echo "<p>El resultado de tu pregunta es...</p>";

    // Comparar correctamente
    $indiceCorrecto = $preguntas[$indicePregunta]['correctIndex'];
    if($respuestaElegida == $indiceCorrecto) {
        echo "<p>Correcte! 🎉</p>";
        $_SESSION['puntuacion'] += 1;
        echo "<script>console.log('Resultado: Correcto');</script>";
    } else {
        echo "<p>Incorrecte ❌</p>";
        echo "<p> La respuesta correcta es: <b>" . $preguntas[$indicePregunta]['answers'][$indiceCorrecto];
        echo "<br><br><script>console.log('Resultado: Incorrecto');</script>";
    }

    $_SESSION['indexPregunta']++; // Avanzamos a la siguiente pregunta

    echo "<a href='pregunta.php'><button>Siguiente Pregunta</button></a>";
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Resultat</title>
</head>
<body></body>
</html>