<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Quiz SPA</title>
<style>
  body { font-family: Arial, sans-serif; max-width: 600px; margin: 2rem auto; }
  button { margin-top: 0.5rem; }
  .answer-btn { display: block; margin-bottom: 0.5rem; width: 100%; text-align: left; padding: 0.5rem; }
</style>
</head>
<body>

<h1>Cuestionario SPA</h1>

<div id="quiz-container">
  <button id="start-btn">Empezar Quiz</button>
</div>

<script>
  const startBtn = document.getElementById('start-btn');
  const container = document.getElementById('quiz-container');

  let preguntas = [];
  let indexPregunta = 0;
  let respuestas = [];

  startBtn.onclick = () => {
    fetchPreguntas(10);
  };

  function fetchPreguntas(n) {
    fetch(`/back/getPreguntas.php?action=getPreguntas&n=${n}`)
      .then(res => res.json())
      .then(data => {
        preguntas = data;
        indexPregunta = 0;
        // respuestas = [];
        mostrarPregunta();
      })
      .catch(e => {
        container.innerHTML = `<p>Error cargando preguntas: ${e.message}</p>`;
      });
  }

  function mostrarPregunta() {
    if (indexPregunta >= preguntas.length) {
      mostrarResultados();
      return;
    }

    const p = preguntas[indexPregunta];
    container.innerHTML = `<h2>Pregunta ${indexPregunta + 1} de ${preguntas.length}</h2>
      <p>${p.question}</p>
      <div id="answers"></div>`;

    const answersDiv = document.getElementById('answers');
    p.answers.forEach((ans, i) => {
      const btn = document.createElement('button');
      btn.textContent = ans;
      btn.classList.add('answer-btn');
      btn.onclick = () => {
        respuestas.push(i);
        indexPregunta++;
        mostrarPregunta();
      };
      answersDiv.appendChild(btn);
    });
  }

  function mostrarResultados() {
    container.innerHTML = `<h2>Calculando resultados...</h2>`;
    fetch('/back/getPreguntas.php?action=finalitza', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ respuestas })
    })
    .then(res => res.json())
    .then(data => {
      container.innerHTML = `<h2>Resultados</h2>
        <p>Respuestas totales: ${data.total}</p>
        <p>Respuestas correctas: ${data.correctas}</p>
        <button id="restart-btn">Volver a empezar</button>`;
      document.getElementById('restart-btn').onclick = () => {
        container.innerHTML = `<button id="start-btn">Empezar Quiz</button>`;
        document.getElementById('start-btn').onclick = () => fetchPreguntas(10);
      };
    })
    .catch(e => {
      container.innerHTML = `<p>Error al calcular resultados: ${e.message}</p>`;
    });
  }
</script>

</body>
</html>
