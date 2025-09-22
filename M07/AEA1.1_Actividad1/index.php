<!-- index.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>PELICULAS</title>
</head>

<body>
    <h1> AEA1.1 ITERAR UN JSON Y MOSTRAR LOS DATOS EN PHP</h1>

    <?php
        $jsonPeliculas = file_get_contents('peliculas.json'); // es una string
        $arrayPeliculas = json_decode($jsonPeliculas, true) ; // es un array asociativo
        $quantityPeliculas = count($arrayPeliculas);

        $jsonBooks = file_get_contents('books.json'); // es una string
        $arrayBooks = json_decode($jsonBooks, true) ; // es un array asociativo

    echo "<div id='contenedor_padre'>"; // contenedor padre de peliculas y libros
        echo "<div id='main_container'>";
        echo "<h2> PELICULAS MOSTRADAS CON PHP </h2>";
        foreach($arrayPeliculas as $pelicula) {
            echo "<div>";
            echo "<p> Titulo: " . $pelicula['title'] . "</sp>";

            // Comprobar que si los géneros son nulos o no, si lo son entonces mostrar texto alternativo.
            if ($pelicula['genres'] == null) {
                echo "<p> Generos: No hay generos disponibles </p>";
            } else {
                echo "<p> Generos: " . implode(", ", $pelicula['genres']) . "</p>";
            }

            // Comrprobar que exista la imagen o que exista la clave que contiene la imagen.
            if (empty($pelicula['thumbnail'])|| !isset($pelicula['thumbnail']) ){
                echo "<p> No hay imagen disponible </p>";
            } else {
                echo "<img src='" . $pelicula['thumbnail'] . "' alt='Imagen no disponible' width=" . $pelicula['thumbnail_width'] . "height=" . $pelicula['thumbnail_width'] . "/>";
            }
            echo "</div> <hr>";
        }
        echo "</div>";

        echo "<div id='second_container'>";
        echo "<h2> PELICULAS MOSTRADAS CON PHP </h2>";
        foreach($arrayBooks as $book) {
            echo "<div>";

            // AUTOR 
            echo "<p> Autor: " . $book['author'] . "</p>";
            // PAIS
            echo "<p> Pais: " . $book['country'] . "</p>";
            //LINK DE LA IMAGEN
            echo "<p> Autor: " . $book['imageLink'] . "</p>";
            //LENGUAJE
            echo "<p> Lenguaje: " . $book['language'] . "</p>";
            //LINK DE WIKI
            echo "<img src='" . $book['imageLink'] . "' alt='Imagen no disponible' widht='100' height='150'/>";
            echo "<p> Autor: " . $book['link'] . "</p>";
            //NÚMERO DE PÁGINAS
            echo "<p> Paginas: " . $book['pages'] . "</p>";
            //TITULO DEL LIBRO
            echo "<p> Titulo: " . $book['title'] . "</p>";
            //AÑO DE PUBLICACIÓN
            echo "<p> Año: " . $book['year'] . "</p>";

            echo "</div> <hr>";
        }
        echo "</div>";
    echo "</div>";
    ?>
</body>
<style>
    #contenedor_padre {
    display: flex;
    gap: 20px; /* espacio entre peliculas y libros */
    align-items: flex-start; /* que se alineen arriba */
    }
    #main_container div {
        border: 1px solid black;
        box-shadow: 5px 5px 5px grey;
        width : 50%;
    }
    hr {
    width: 100px;       /* largo de la línea */
    margin: 10px 0;     /* espacio arriba y abajo */
    border: 0;          /* quitamos el borde por defecto */
    border-top: 1px solid #666; /* línea simple y fina */
}
</style>
</html>
