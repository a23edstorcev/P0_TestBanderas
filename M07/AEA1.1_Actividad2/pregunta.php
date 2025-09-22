<?php 
session_start(); 
$preguntas = $_SESSION['preguntas'];
$indicePregunta = $_SESSION['indexPregunta'];


function mostrarPregunta($preguntas, $indicePregunta) {
    if ($indicePregunta < count($preguntas)) {
        echo "<form method='post' action='resultat.php'>";
        echo "<h3> P. " . $preguntas[$indicePregunta]['question'] . "</h3>";
        foreach($preguntas[$indicePregunta]['answers'] as $key => $respuesta) {
            echo "<p> R" . $key+1 . ": <button type='submit' name='indexRespuesta' value='$key'>R: $respuesta</button></p><br>";
        }
        echo "</form>";
    } else {
        echo "<h2>Has terminado el cuestionario</h2>";
        echo "<a href='final.php'><button>Ver resultados</button></a>";
    }
    
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Pregunta</title>
</head>
<body>
    
    <h1>Preguntas</h1>
    <?php
    mostrarPregunta($preguntas, $_SESSION['indexPregunta']);
    ?>
</body>
</html>