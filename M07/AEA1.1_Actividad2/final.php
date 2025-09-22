<?php
session_start();
$puntuacionFinal = $_SESSION['puntuacion'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Final PHP Document</title>
</head>
<body>
    <h3>HAS TERMINADO EL CUESTIONARIO, VAMOS A REVISAR TU PUNTUACIÓN!!!!</h3>
    <?php
        echo "<p>Has acertado " . $puntuacionFinal . " de 10</p>";
        echo "<a href='index.php'><button>Volver a comenzar</button></a>";
        session_destroy();
    ?>
</body>
</html>