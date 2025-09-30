var tiempo = 50;
let tiempoParaResponder = tiempo; // en segundos
let temporizadorCorriendo = false;
let eventListenerAgregado = false;

let interval; // varible global del tempporizador para poder pararlo cuando quiera

let estatDeLaPartida = {
  preguntas: [],
  respuestasUsuari: [], // Aquí anirem guardant les respostes
  preguntaActual: 0,
  respuestaSeleccionada: null
};

let partidaContainer = document.getElementById("partida");
let temporizadorContainer = document.getElementById("temporizador");
let sesionContainer = document.getElementById("sesion");
let btnsCambiarPregunta = document.getElementById("btnsCambiarPregunta");
let botonesOpciones = document.getElementById("botonesOpciones");

let respuestasTotales = 0;
let respuestasCorrectas = 0;

// Iiciar los listeners de los botones
function inicializarEventListeners() {
  console.log(eventListenerAgregado);
  if (eventListenerAgregado) return;
  
  // listener para los botones de las respuestas
  partidaContainer.addEventListener("click", function (e) {
    console.log("han clickado a " + e.target);
    let respuesta = e.target.getAttribute("resp");
    if (e.target.classList.contains("btn")) {
      estatDeLaPartida.respuestaSeleccionada = respuesta;
      console.log("respuesta seleccionada " + estatDeLaPartida.respuestaSeleccionada);      
      // ✅ DESTACAR el botón clickeado
      e.target.style.backgroundColor = "#28a745"; // Verde para elegida
      e.target.style.color = "white";
    }
  })
  // listener para el inicio de sesión 
  sesionContainer.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnIniciarSesion") {
      let validName = guardarNombre();
      if (!validName) return;
      document.getElementById("sesion").setAttribute("hidden", true);
      document.getElementById("btnsCambiarPregunta").removeAttribute("hidden");
      PreguntaVisible(estatDeLaPartida.preguntaActual, estatDeLaPartida.preguntaActual);
    }
    // TODO: añadir listener de boton de cerras sesión
  });

  btnsCambiarPregunta.addEventListener("click", function (e) {
    let preguntaMostrada = estatDeLaPartida.preguntaActual;
    if (e.target && e.target.id === "btnAnterior") {
      if (estatDeLaPartida.preguntaActual > 0) {
        estatDeLaPartida.preguntaActual--;
        PreguntaVisible(preguntaMostrada, estatDeLaPartida.preguntaActual);
        renderitzarMarcador(estatDeLaPartida.respuestaSeleccionada);
      }
    } else if (e.target && e.target.id === "btnSiguiente") {
      if (estatDeLaPartida.preguntaActual < estatDeLaPartida.preguntas.length - 1) {
        estatDeLaPartida.preguntaActual++;
        PreguntaVisible(preguntaMostrada, estatDeLaPartida.preguntaActual);
        renderitzarMarcador(estatDeLaPartida.respuestaSeleccionada);
      }
    }
  });
    

  // listener para el boton de volver a comenzar
  botonesOpciones.addEventListener("click", () => {
    if (event.target && event.target.id !== "btnVolverComenzar") {
      // Detener temporizador si está corriendo
      temporizadorCorriendo = false;
      tiempoParaResponder = tiempo; // reiniciar tiempo

      estatDeLaPartida = {
        preguntas: [],
        respuestasUsuari: [], // Aquí anirem guardant les respostes
        preguntaActual: 0,
        respuestaSeleccionada: null
      };
      console.log(estatDeLaPartida);
      // Obtener nuevas preguntas del back
      fetch(`../back/getPreguntas.php?action=getPreguntas&n=10`)
        .then(res => res.json())
        .then(data => {
          estatDeLaPartida.preguntas = data;
          document.getElementById("botonesOpciones").setAttribute("hidden", true);
          PreguntaVisible(estatDeLaPartida.preguntaActual, estatDeLaPartida.preguntaActual);
        })
        .catch(e => {
          partidaContainer.innerHTML = `<p>Error cargando preguntas: ${e.message}</p>`;
        });
    }
  });
    eventListenerAgregado = true;
  }

// FUNCIONES DEL TEMPORIZADOR
function mostrarTiempo() {
  if (!temporizadorContainer) return; // evita errores si no existe
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
  // let i = 0;
  // if (estatDeLaPartida.respuestasSeleccionadas.length > i ) {
    document.getElementById("pregunta-" + preguntaOcultar).setAttribute("hidden", true);
    document.getElementById("pregunta-" + preguntaMostrar).removeAttribute("hidden");

    if (estatDeLaPartida.respuestasUsuari[estatDeLaPartida.preguntaActual] !== undefined && estatDeLaPartida.respuestasUsuari && estatDeLaPartida.respuestaSeleccionada !== null) {
      const preguntaActual = estatDeLaPartida.preguntaActual;
      const botones = document.querySelectorAll(`.btn[preg="${preguntaActual}"]`);
      botones.forEach(btn => {
        btn.disabled = true;
        btn.style.backgroundColor = "#ccc"; // Gris para bloqueados
      });
      estatDeLaPartida.respuestaSeleccionada = null;
    } else {
      console.log("no hay respuesta guardada");
    }
}
// FUNCIONES DEL JUEGO
function mostrarTodasPreguntas(preguntas) {
  let i = estatDeLaPartida.preguntaActual;
  let stringhtml = "";
  for (i; i < preguntas.length; i++) {
    // variable de la imagen y la pregunta a mostrar
    let preguntaMostrada = preguntas[i].pregunta;
    let imagenMostrada = preguntas[i].imagen;

    stringhtml += `<div id=pregunta-${i} hidden>`;
    stringhtml += ` <h3 preg="${i}"> ${preguntaMostrada} </h3> `;
    console.log("imagen mostrada " + imagenMostrada);
    stringhtml += ` <img src="${imagenMostrada}" width="300" length="300"/> <br>`;
    for (let j = 0; j < preguntas[i].respuestas.length; j++) {
      let btnId = `btn-${i}-${j}`;
      stringhtml += `<button preg="${i}" resp="${j}" type="radio" id="${btnId}" class="btn">${preguntas[i].respuestas[j]} </button>`
  }
    stringhtml += `</div>`;
}

  partidaContainer.innerHTML = stringhtml;
  // } else {
  //   mostrarFinal(stringhtml);
  //   console.log("fin de las preguntas");
  // }
  iniciarTemporizador();
}

function mostrarFinal() {
  clearInterval(interval);
  // stringhtml = "";
  partidaContainer.innerHTML = `<h2>Calculando resultados...</h2>`;
  fetch(`../back/finalitza.php?action=finalitza`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ respuestas: estatDeLaPartida.respuestasUsuari }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(
        "data total" + data.total + " data correctas " + data.correctas
      );
      respuestasTotales = data.total;
      respuestasCorrectas = data.correctas;
      // console.log("data total" + respuestasTotales + " data correctas " + respuestasCorrectas);
      let stringhtml = "";
      stringhtml += ` <h3> FIN DE LAS PREGUNTAS </h3> `;
      stringhtml += ` <p> RESULTADOS: </p>`;
      stringhtml += ` <p> Has contestat ${respuestasTotales} preguntes. </p>`;
      stringhtml += ` <p> Has contestat correctament ${respuestasCorrectas} de ${10} preguntes. </p>`;
      
      document.getElementById("btnsCambiarPregunta").setAttribute("hidden", true);
      document.getElementById("botonesOpciones").removeAttribute("hidden");

      partidaContainer.innerHTML = stringhtml;
    })
    .catch((e) => {
      partidaContainer.innerHTML = `<p>Error cargando respustas: ${e.message}</p>`;
    });
}

// window.changeColor = function(resposta_elegida, id_pregunta, btnId) {
//   var moi = document.getElementById(btnId);
//   var resposta_correcta = preguntas.preguntes[id_pregunta].resposta_correcta;

//   renderitzarMarcador(resposta_correcta, resposta_elegida);
//   if(resposta_correcta == resposta_elegida  ) {
//     moi.style.color = 'green';
//   } else {
//     moi.style.color = 'red';
//   }
// }

function renderitzarMarcador(resposta_elegida) {
  if (estatDeLaPartida.preguntaActual < estatDeLaPartida.preguntas.length-1) {
    console.log("resposta elegida " + resposta_elegida);
    estatDeLaPartida.respuestasUsuari.push(resposta_elegida);
    // estatDeLaPartida.preguntaActual++;
    console.log("pepepeppepe");
    console.log(estatDeLaPartida);
    // mostrarTodasPreguntas(estatDeLaPartida.preguntas);
  } else {
    estatDeLaPartida.respuestasUsuari.push(resposta_elegida);
    estatDeLaPartida.preguntaActual++;
    console.log("fin de las preguntas");
    mostrarFinal();
  }
  localStorage.setItem("partida", JSON.stringify(estatDeLaPartida))
  console.log(estatDeLaPartida)
}

window.addEventListener("DOMContentLoaded", (event) => {
  
  fetch(`../back/getPreguntas.php?action=getPreguntas&n=10`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      estatDeLaPartida = {
        preguntas: data,
        respuestasUsuari: [], // Aquí anirem guardant les respostes
        preguntaActual: 0,
        respuestaSeleccionada: null
      }
      inicializarEventListeners();
      if (localStorage.partida) {
        let partidaStorage = JSON.parse(localStorage.getItem("partida"));
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

// "INICO DE SESIÓN" 

function BorrarPartida() {
  localStorage.removeItem("partida");
  estatDeLaPartida = {
    preguntas: [],
    respuestasUsuari: [], // Aquí anirem guardant les respostes
    preguntaActual: 0,
};
  tiempoParaResponder = tiempo; // reiniciar tiempo
  mostrarTodasPreguntas(estatDeLaPartida.preguntas);
};



function guardarNombre() {
    const nombreInput = document.getElementById("nombreJugador");
    const nombre = nombreInput.value.trim();
    
    // ❌ VALIDACIÓN: Si no hay nombre, BLOQUEAR TODO
    if (nombre === "") {
        alert("❌ Por favor, introduce tu nombre antes de continuar.");
        nombreInput.focus(); // Enfocar el input para que escriba
        nombreInput.style.borderColor = "red"; // Resaltar en rojo
        return false; // ⚠️ IMPORTANTE: Devolver false
    }
    
    // ✅ Si llegamos aquí, hay nombre válido
    localStorage.setItem("nombreJugador", nombre);
    
    console.log("✅ Nombre guardado:", nombre);
    return true; // ✅ Todo OK, permitir continuar
}

function verificarSesion() {
    const nombreGuardado = localStorage.getItem("nombreJugador");
    
    if (nombreGuardado) {
        // Si hay nombre guardado, mostrar mensaje de bienvenida
        mensajeSesion.innerHTML = `
            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 10px; border-radius: 5px; margin-top: 10px;">
                <h3>¡Hola de nuevo, ${nombreGuardado}! 👋</h3>
                <p>Tu sesión anterior se ha restaurado.</p>
                <button id="btnContinuar" style="background-color: #28a745; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                    Continuar jugando
                </button>
                <button id="btnCambiarNombre" style="background-color: #007bff; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                    Cambiar nombre
                </button>
            </div>
        `;
        
        // Ocultar el formulario inicial
        document.getElementById("nombreJugador").style.display = "none";
        document.getElementById("btnIniciarSesion").style.display = "none";
        
        // Agregar eventos a los nuevos botones
        document.getElementById("btnContinuar").addEventListener("click", function() {
            iniciarJuego();
        });
        
        document.getElementById("btnCambiarNombre").addEventListener("click", function() {
            mostrarFormularioNombre();
        });
        
    } else {
        // Si no hay nombre guardado, mostrar formulario normal
        mostrarFormularioNombre();
    }
}

// function reiniciarJuego() {
//   // Resetear estado
//   estatDeLaPartida = {
//     preguntas: [],
//     respuestasUsuari: [],
//     preguntaActual: 0,
//   };
//   tiempoParaResponder = 5;
//   temporizadorCorriendo = false;

//   // Mostrar mensaje de carga
//   partidaContainer.innerHTML = `<h2>Cargando nuevas preguntas...</h2>`;

//   // Fetch al backend para obtener nuevas preguntas
//   fetch(`../back/getPreguntas.php?action=getPreguntas&n=10`)
//     .then((res) => res.json())
//     .then((data) => {
//       estatDeLaPartida.preguntas = data;
//       mostrarTodasPreguntas(estatDeLaPartida.preguntas); // reutiliza tu función existente
//     })
//     .catch((e) => {
//       partidaContainer.innerHTML = `<p>Error cargando preguntas: ${e.message}</p>`;
//     });
// }
// function fetchPreguntas(n) {
//   fetch(`../../back/getPreguntas.php?action=getPreguntas&n=${n}`)
//     .then(res => res.json())
//     .then(data => {
//       preguntas = data;
//       preguntaActual = 0;
//       estatDeLaPartidaContainer.respuestasUsuari = [];
//       inicializarEventListeners();
//       mostrarTodasPreguntas();
//     })
//     .catch(e => {
//       container.innerHTML = `<p>Error cargando preguntas: ${e.message}</p>`;
//     });
// }
