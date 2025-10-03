let rutaPRODback = "/P0/back/";
let rutaLOCAL = "../back/";
let rutaActual = rutaLOCAL // ESTA VARIBLE SE LE ASIGNARA LA RUTA QUE SE QUIERA USAR Y ASI NO HAY QUE CAMBIAR TODAS UNA A UNA

// VARIBALES DEL TEMPORIZADOR
let tiempo = 30;
let tiempoParaResponder = tiempo; // en segundos
let temporizadorCorriendo = false;
let eventListenerAgregado = false;
let interval; // varible global del tempporizador para poder pararlo cuando quiera

// VARIABLES DE EL ESTADO DE LA PARTIDA
let respuestasTotales = 0;
let respuestasCorrectas = 0;
let partidaStorage = [];
let estatDeLaPartida = {
  preguntas: [],
  respuestasUsuari: Array(10).fill(null), 
  preguntaActual: 0,
  respuestaSeleccionada: null
};


//VARIABLES DEL LOS CONTENEDORES/ETIQUETAS 
let partidaContainer = document.getElementById("partida");
let temporizadorContainer = document.getElementById("temporizador");
let sesionContainer = document.getElementById("sesion");
let btnsCambiarPregunta = document.getElementById("btnsCambiarPregunta");
let botonesOpciones = document.getElementById("botonesOpciones");
let mensajeUser = document.getElementById("mensajeSesion");
let marcadorContainer = document.getElementById("marcador");
let bienvenidaContainer = document.getElementById("mensajeBienvenida");

//////////////////////////////////////////
// FUNCION PARA INICIALIZAR LOS LISTENERS 
/////////////////////////////////////////
function inicializarEventListeners() {
  console.log(eventListenerAgregado);
  if (!eventListenerAgregado) {
    partidaContainer.addEventListener("click", function (e) {
    console.log("han clickado a " + e.target);
    let respuesta = e.target.getAttribute("resp");
    if (e.target.classList.contains("btn")) {
      estatDeLaPartida.respuestaSeleccionada = respuesta;
      console.log("respuesta seleccionada " + estatDeLaPartida.respuestaSeleccionada);      
      let grupoName = e.target.getAttribute("name");
      let radios = document.querySelectorAll(`input[name="${grupoName}"]`);

      for(const r of radios) {
        r.style.backgroundColor = "";
        r.style.color = "";
      };

      e.target.style.backgroundColor = "#28a745"; // verde
      e.target.style.color = "white";
    }
  })
  }
  // listener para el inicio de sesión 
  sesionContainer.addEventListener("click", function (e) {
    let validName;
    if (e.target && e.target.id === "btnIniciarSesion") {
      if (!localStorage.getItem("nombreJugador")) {
        validName = guardarNombre();
        if (!validName) return;
        bienvenidaContainer.setAttribute("hidden", true);
        document.getElementById("sesion").setAttribute("hidden", true);
        document.getElementById("btnsCambiarPregunta").removeAttribute("hidden");
        marcadorContainer.removeAttribute("hidden");
        PreguntaVisible(estatDeLaPartida.preguntaActual, estatDeLaPartida.preguntaActual);
        actualitzaMarcador();
      } else {
        bienvenidaContainer.setAttribute("hidden", true);
        document.getElementById("sesion").setAttribute("hidden", true);
        document.getElementById("btnsCambiarPregunta").removeAttribute("hidden");
        document.getElementById("mensajeSesion").removeAttribute("hidden");
        marcadorContainer.removeAttribute("hidden");
        if (partidaStorage.length !== 0) {
          console.log("hay partida guardada");
          estatDeLaPartida = {
            preguntas: partidaStorage.preguntas,
            respuestasUsuari: partidaStorage.respuestasUsuari, // Aquí anirem guardant les respostes
            preguntaActual: partidaStorage.preguntaActual,
            respuestaSeleccionada: null
          };
          bloquearRespuestas()
        } 
        PreguntaVisible(estatDeLaPartida.preguntaActual, estatDeLaPartida.preguntaActual);
        actualitzaMarcador();
      }
      actualitzaMarcador();  
      console.log(estatDeLaPartida);
      iniciarTemporizador();
    }

    if (e.target && e.target.id === "btnBorrarNombre") {
      localStorage.clear();
      marcadorContainer.setAttribute("hidden", true);
      document.getElementById("mensajeSesion").setAttribute("hidden", true);
      document.getElementById("nombreJugador").removeAttribute("hidden");
      document.getElementById("btnIniciarSesion").removeAttribute("hidden");
    }
  });

  btnsCambiarPregunta.addEventListener("click", function (e) {
    let preguntaMostrada = estatDeLaPartida.preguntaActual;
    if (e.target && e.target.id === "btnAnterior") {
      if (estatDeLaPartida.preguntaActual > 0) {
        estatDeLaPartida.preguntaActual--;
        if (estatDeLaPartida.respuestaSeleccionada !== null) {
          renderitzarMarcador(estatDeLaPartida.respuestaSeleccionada);
        }
        PreguntaVisible(preguntaMostrada, estatDeLaPartida.preguntaActual);
        actualitzaMarcador();
      }
    } else if (e.target && e.target.id === "btnSiguiente") {
      if (estatDeLaPartida.preguntaActual < estatDeLaPartida.preguntas.length ) {
        if (estatDeLaPartida.respuestaSeleccionada !== null) {
          renderitzarMarcador(estatDeLaPartida.respuestaSeleccionada);
        }
        estatDeLaPartida.preguntaActual++;
        if (estatDeLaPartida.preguntaActual > estatDeLaPartida.preguntas.length-1) {
          mostrarFinal();
           
        } else {
          PreguntaVisible(preguntaMostrada, estatDeLaPartida.preguntaActual);
          actualitzaMarcador();
        }

      }
    }
  });
    
  botonesOpciones.addEventListener("click", (event) => {
    if (event.target && event.target.id === "btnVolverComenzar") {
      // Detener temporizador si está corriendo
      temporizadorCorriendo = false;
      tiempoParaResponder = tiempo; // reiniciar tiempo
      document.getElementById("detalle-respuestas").setAttribute("hidden", true);


      estatDeLaPartida = {
        preguntas: [],
        respuestasUsuari: Array(10).fill(null), 
        preguntaActual: 0,
        respuestaSeleccionada: null
      };
      console.log(estatDeLaPartida);
      // Obtener nuevas preguntas del back
      fetch(`${rutaActual}getPreguntas.php?action=getPreguntas&n=10`)
        .then(res => res.json())
        .then(data => {
          estatDeLaPartida.preguntas = data;
          localStorage.removeItem("partida");
          document.getElementById("botonesOpciones").setAttribute("hidden", true);
          document.getElementById("btnsCambiarPregunta").removeAttribute("hidden"); 
          marcadorContainer.removeAttribute("hidden");
          mostrarTodasPreguntas(estatDeLaPartida.preguntas);
          PreguntaVisible(estatDeLaPartida.preguntaActual, estatDeLaPartida.preguntaActual);
          actualitzaMarcador();
          iniciarTemporizador();
        })
        .catch(e => {
          partidaContainer.innerHTML = `<p>Error cargando preguntas: ${e.message}</p>`;
        });
    }

    if (event.target && event.target.id === "btnPartidaNueva") {
      temporizadorCorriendo = false;
      tiempoParaResponder = tiempo; // reiniciar tiempo
      document.getElementById("detalle-respuestas").setAttribute("hidden", true);

      estatDeLaPartida = {
        preguntas: [],
        respuestasUsuari: Array(10).fill(null), 
        preguntaActual: 0,
        respuestaSeleccionada: null
      };

       fetch(`${rutaActual}getPreguntas.php?action=getPreguntas&n=10`)
        .then(res => res.json())
        .then(data => {
          estatDeLaPartida.preguntas = data;
          document.getElementById("botonesOpciones").setAttribute("hidden", true);
          mostrarTodasPreguntas(estatDeLaPartida.preguntas);
          localStorage.clear();
          verificarSesion();
          clearInterval(interval);
          document.getElementById("sesion").removeAttribute("hidden");
          marcadorContainer.setAttribute("hidden", true);
          bienvenidaContainer.removeAttribute("hidden");
          temporizadorContainer.textContent = "";
        })
        .catch(e => {
          partidaContainer.innerHTML = `<p>Error cargando preguntas: ${e.message}</p>`;
        });
      
    }
  });
  eventListenerAgregado = true;
}

////////////////////////////////////////////////////
/// FUNCION PARA BLOQUEAR LAS RESPUESTAS RESPONDIDAS
////////////////////////////////////////////////////
function bloquearRespuestas() {
  for (const [i, respuesta] of estatDeLaPartida.respuestasUsuari.entries()) {
    if (respuesta !== null) {
      const botones = document.querySelectorAll(`input[preg="${i}"]`);
      for(const btn of botones) {
        btn.disabled = true;
        btn.style.backgroundColor = "#ccc"; // gris
        btn.style.color = "#666"; // opcional, texto gris
      
        if (btn.getAttribute("resp") === respuesta) {
        btn.checked = true;
        }
      };
    }
  };
}



//////////////////////////////
// FUNCIONES DEL TEMPORIZADOR
//////////////////////////////

function mostrarTiempo() {
  if (!temporizadorContainer) return; 
  console.log("tiempo para responder " + tiempoParaResponder);
  temporizadorContainer.textContent =
    "Temps restant: " + tiempoParaResponder + " s";
}

function iniciarTemporizador() {
  mostrarTiempo();
  if (temporizadorCorriendo) return;
  temporizadorCorriendo = true;
  interval = setInterval(() => {
    if (tiempoParaResponder > 0) {
      tiempoParaResponder--;
      mostrarTiempo();
    } else {
      clearInterval(interval);
      temporizadorCorriendo = false;
      mostrarFinal();
    }
  }, 1000);
}

function PreguntaVisible(preguntaOcultar, preguntaMostrar) {
    document.getElementById("pregunta-" + preguntaOcultar).setAttribute("hidden", true);
    document.getElementById("pregunta-" + preguntaMostrar).removeAttribute("hidden");
    estatDeLaPartida.respuestaSeleccionada = null;
}
// FUNCIONES DEL JUEGO
function mostrarTodasPreguntas(preguntas) {
  let i = estatDeLaPartida.preguntaActual;
  let stringhtml = "";
  for (i; i < preguntas.length; i++) {
    // variable de la imagen y la pregunta a mostrar
    let preguntaMostrada = preguntas[i].pregunta;
    let imagenMostrada = preguntas[i].imagen;

    stringhtml += `<div id="pregunta-${i}" class="card shadow mb-4" hidden>`;
    stringhtml += `  <div class="card-body">`;
    stringhtml += ` <h3 class="card-title text-primary mb-3" preg="${i}"> P${i+1}. ${preguntaMostrada} </h3> `;
    console.log("imagen mostrada " + imagenMostrada + " la i es" + i);
    stringhtml += ` <img src="${imagenMostrada}" width="300" length="300"/> <br>`;
    for (let j = 0; j < preguntas[i].respuestas.length; j++) {
      let btnId = `btn-${i}-${j}`;
      stringhtml += `<label class="me-3 mt-2"><input preg="${i}" resp="${j}" name="P${i}" type="radio" id="${btnId}" class="btn">${preguntas[i].respuestas[j]} </label>`
  }
    stringhtml += `</div>`;
    stringhtml += `</div>`;
}

  partidaContainer.innerHTML = stringhtml;
}

//////////////////////////////
// MOSTRAR LA PANTALLA FINAL
/////////////////////////////

function mostrarFinal() {
  let respuestasNoContestadas = 0;
  clearInterval(interval);
  marcadorContainer.setAttribute("hidden", true);
  temporizadorContainer.setAttribute("hidden", true);
  document.getElementById("btnsCambiarPregunta").setAttribute("hidden", true);
  partidaContainer.innerHTML = `<h2>Calculando resultados...</h2>`;
  setTimeout(() => {
    fetch(`${rutaActual}finalitza.php?action=finalitza`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ respuestas: estatDeLaPartida.respuestasUsuari }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(
        "data total" + data.total + " data correctas " + data.correctas
      );
      // CALCULAR LAS RESPUESTAS QUE SE HAN DEJADO COMO NO RESPONDIDAS
      for (let i = 0; estatDeLaPartida.respuestasUsuari.length > i; i++) {
        if (estatDeLaPartida.respuestasUsuari[i] == null) {
          respuestasNoContestadas++;
        }
      }
      respuestasTotales = data.total;
      respuestasCorrectas = data.correctas;
      let respuestasContestadas = respuestasTotales - respuestasNoContestadas;
      let stringhtml = "";
      stringhtml += ` <h3> FIN DE LES PREGUNTES </h3> `;
      stringhtml += ` <p> RESULTADOS: </p>`;
      stringhtml += ` <p> Has contestat ${respuestasContestadas} preguntes. </p>`;
      stringhtml += ` <p> Has deixat ${respuestasNoContestadas} de 10 preguntes sense respondre. </p>`;
      stringhtml += ` <p> Has contestat correctament ${respuestasCorrectas} de ${10} preguntes. </p>`;
      
      document.getElementById("botonesOpciones").removeAttribute("hidden");

      partidaContainer.innerHTML = stringhtml;
      mostrarDetalleRespuestas();
    })
    .catch((e) => {
      partidaContainer.innerHTML = `<p>Error cargando respustas: ${e.message}</p>`;
    });
  }, 2000) 
}


function renderitzarMarcador(resposta_elegida) {
    console.log("resposta elegida " + resposta_elegida);
    estatDeLaPartida.respuestasUsuari[estatDeLaPartida.preguntaActual] = resposta_elegida;
    console.log(estatDeLaPartida);
  localStorage.setItem("partida", JSON.stringify(estatDeLaPartida))
  console.log(estatDeLaPartida)
}

////////////////////////////////
// FUNCION DONDE SE INICIA TODO
////////////////////////////////

window.addEventListener("DOMContentLoaded", (event) => {
  marcadorContainer.setAttribute("hidden", true);

  fetch(`${rutaActual}getPreguntas.php?action=getPreguntas&n=10`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      estatDeLaPartida = {
        preguntas: data,
        respuestasUsuari: Array(10).fill(null), // Aquí anirem guardant les respostes
        preguntaActual: 0,
        respuestaSeleccionada: null
      }
      verificarSesion();
      inicializarEventListeners();
      if (localStorage.partida) {
        partidaStorage = JSON.parse(localStorage.getItem("partida"));
        console.log("partida guardada en localstorage y es" + JSON.stringify(partidaStorage.preguntas));
        mostrarTodasPreguntas(partidaStorage.preguntas);
      } else {
        mostrarTodasPreguntas(data);
      }
    })
    .catch((e) => {
      partidaContainer.innerHTML = `<p>Error cargando preguntas: ${e.message}</p>`;
    });
});

///////////////////////////////////////////////////////////////
// FUNCIONES RELACIONADAS CON LA SESIÓN Y LA PARTIDA GUARDADA
//////////////////////////////////////////////////////////////

function BorrarPartida() {
  localStorage.removeItem("partida");
  estatDeLaPartida = {
    preguntas: [],
    respuestasUsuari: Array(10).fill(null), // Aquí anirem guardant les respostes
    preguntaActual: 0,
};
  tiempoParaResponder = tiempo; // reiniciar tiempo
  mostrarTodasPreguntas(estatDeLaPartida.preguntas);
  marcadorContainer.setAttribute("hidden", true);
};

function guardarNombre() {
    const nombreInput = document.getElementById("nombreJugador");
    const nombre = nombreInput.value.trim();
    if (localStorage.getItem("nombreJugador")) {
      return true; 
    } else {
      if (nombre === "") {
          alert("❌ Por favor, introduce tu nombre antes de continuar.");
          nombreInput.focus(); // Enfocar el input para que escriba
          nombreInput.style.borderColor = "red"; // Resaltar en rojo
          return false; 
      }
      
      localStorage.setItem("nombreJugador", nombre);
      
      console.log("✅ Nombre guardado:", nombre);
      return true; 
    }
}

function verificarSesion() {
    const nombreGuardado = localStorage.getItem("nombreJugador");
    
    if (nombreGuardado) {
        // Si hay nombre guardado, mostrar mensaje de bienvenida
        mensajeUser.innerHTML = `
            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 10px; border-radius: 5px; margin-top: 10px;">
                <h3>¡Hola de nuevo, ${nombreGuardado}! 👋</h3>
                <p>Tu sesión anterior se ha restaurado.</p>
            </div>
        `;
        // Ocultar el formulario inicial
        document.getElementById("nombreJugador").setAttribute("hidden", true);
    } else {
      return;
    }
}


////////////////////////////
// FUNCIONES DE EL MARCADOR
////////////////////////////

function actualitzaMarcador(mostrarResultados = false) {
  let htmlString = "<h4>📊 Progreso</h4>";
  htmlString += "<div class='marcador-grid'>";
  
  for (let i = 0; i < estatDeLaPartida.preguntas.length; i++) {
    const respondida = estatDeLaPartida.respuestasUsuari[i] !== null;
    const esActual = i === estatDeLaPartida.preguntaActual;
    
    let badgeClass = 'text-bg-secondary';
    let icon = i + 1;
    
    // Si está respondida
    if (respondida) {
        // Durante el juego solo mostrar que está respondida
        badgeClass = 'text-bg-success';
        icon = '✓';
      }    

    let bordeActual = esActual ? 'border border-primary border-3' : '';
    
    htmlString += `
      <div class="marcador-item ${bordeActual}" onclick="irAPregunta(${i})">
        <span class='badge ${badgeClass}'>${icon}</span>
        <small>P${i + 1}</small>
      </div>
    `;
  }
  
  htmlString += "</div>";

  marcadorContainer.innerHTML = htmlString;
  console.log(estatDeLaPartida);
}


///////////////////////////////////////////////////////////////
// FUNCION PARA MOSTRAR LOS DETALLES DESPUES DE LA PARTIDA
//////////////////////////////////////////////////////////////

function mostrarDetalleRespuestas() {
  const contenedorDetalle = document.getElementById("detalle-respuestas");
  contenedorDetalle.removeAttribute("hidden"); // se muestra solo al final
  contenedorDetalle.innerHTML = "<h4>Detalle de tus respuestas:</h4>";

  estatDeLaPartida.preguntas.forEach((pregunta, i) => {
    const respElegida = estatDeLaPartida.respuestasUsuari[i];
    let simbolo = "";
    let textoRespuesta = "";

    if (respElegida === null) {
      simbolo = "⚪ No respondida";
      textoRespuesta = "No respondida";
    } else if (respElegida == pregunta.correct_answer) {
      simbolo = "✔️ Correcta";
      textoRespuesta = pregunta.respuestas[respElegida];
    } else {
      simbolo = "❌ Incorrecta";
      textoRespuesta = pregunta.respuestas[respElegida];
    }

    contenedorDetalle.innerHTML += `
      <div class="detalle-pregunta">
        <p><strong>P${i+1}: ${pregunta.pregunta}</strong></p>
        <p>Tu respuesta: ${textoRespuesta} ${simbolo}</p>
      </div>
    `;
  });
}




///////////////////////////////////////////////////////////////
// FUNCION QUE TE LLEVA A LA PREGUNTA QUE SELECCIONES
//////////////////////////////////////////////////////////////

window.irAPregunta = function(numeroPregunta) {
  if (numeroPregunta >= 0 && numeroPregunta < estatDeLaPartida.preguntas.length) {
    let preguntaAnterior = estatDeLaPartida.preguntaActual;
    estatDeLaPartida.preguntaActual = numeroPregunta;
    PreguntaVisible(preguntaAnterior, numeroPregunta);
    actualitzaMarcador();
  }
};
