let tiempoParaResponder = 5; // en segundos
let temporizadorCorriendo = false;
let eventListenerAgregado = false;

let estatDeLaPartida = { 
preguntas: [],
contadorPreguntes: 0, 
respostesUsuari: [], // Aquí anirem guardant les respostes 
preguntaActual: 0
}; 

let partidaContainer = document.getElementById("partida");
let temporizadorContainer = document.getElementById("temporizador");


// Iiciar los listeners de los botones
function inicializarEventListeners() {
  if (eventListenerAgregado) return;
  
  // let elem = document.getElementById("partida");
  partidaContainer.addEventListener('click', function(e) {
    console.log("han clickado a " + e.target)   
    if(e.target.classList.contains('btn')){
      console.log("esto si es un boton que tiene los datos" + e.target.getAttribute("preg") +"--"+ e.target.getAttribute("resp"));
      renderitzarMarcador(e.target.getAttribute("resp"),e.target.getAttribute("preg"))
    }
  });
  
  eventListenerAgregado = true;
}

// FUNCIONES DEL TEMPORIZADOR
function mostrarTiempo() {
  // var elem = document.getElementById("temporizador");
  if (!temporizadorContainer) return; // evita errores si no existe
  console.log("tiempo para responder " + tiempoParaResponder);
  temporizadorContainer.textContent = "Temps restant: " + tiempoParaResponder + " s";
}


function iniciarTemporizador() {
  mostrarTiempo();
  if (temporizadorCorriendo) return;
  temporizadorCorriendo = true;
  let interval = setInterval(() => {
    if (tiempoParaResponder > 0) {
      tiempoParaResponder--;
      mostrarTiempo();
    } else {
      clearInterval(interval);
      temporizadorCorriendo = false;
      mostrarFinal();
    }}, 1000);
}

// FUNCIONES DEL JUEGO
function mostrarPregunta() {
  // let elem = document.getElementById("partida");
  let i = estatDeLaPartida.preguntaActual;
  let stringhtml= "";

  let preguntaMostrada = preguntas.preguntes[i].pregunta;
  let imagenMostrada = preguntas.preguntes[i].imatge;

  if(i<=preguntas.preguntes.length) {
    stringhtml += ` <h3> ${preguntaMostrada} </h3> `;
    stringhtml += ` <img src="${imagenMostrada}" width="300"/> <br>`;
    for (let j = 0; j < preguntas.preguntes[i].respostes.length; j++) {
      let btnId = `btn-${i}-${j}`;
      stringhtml += `<button preg="${i}" resp="${j} type="radio" id="${btnId}" class="btn">${preguntas.preguntes[i].respostes[j]} </button> `;
    }

    partidaContainer.innerHTML = stringhtml;

  } else {
    mostrarFinal(stringhtml);
    console.log("fin de las preguntas");
  }  
  iniciarTemporizador();
}


 function mostrarFinal() {
  let elem = document.getElementById("partida");
  let stringhtml= "";
  stringhtml += ` <h3> FIN DE LAS PREGUNTAS </h3> `;
    stringhtml += ` <p> RESULTADOS: </p>`;
    estatDeLaPartida.respostesUsuari.forEach((respuestaUsuari, indice) => {
      let respuesta_correcta = preguntas.preguntes[indice].resposta_correcta;
      stringhtml += ` <h4><br>${preguntas.preguntes[indice].pregunta}</h4>`;
      stringhtml += ` <img src="${preguntas.preguntes[indice].imatge}" width="300"/> <br>`;
      if(preguntas.preguntes[indice].resposta_correcta == respuestaUsuari) {
        stringhtml += ` <p> La respuesta de la pregunta ${indice+1} es correcta!!!`;
        stringhtml += ` <p> ${preguntas.preguntes[indice].respostes[respuesta_correcta]} </p>`;
      } else {
        stringhtml += ` <p> La respuesta de la pregunta ${indice+1} es incorrecta!!!`;
        stringhtml += ` <p> La pregunta que elegiste es: ${preguntas.preguntes[indice].respostes[respuestaUsuari]} </p>`;
        stringhtml += ` <p> La pregunta correcta es <b>${preguntas.preguntes[indice].respostes[respuesta_correcta]}</b> </p>`;
      }
    });

    document.getElementById("btnEnviarDatos").removeAttribute("hidden");

    partidaContainer.innerHTML = stringhtml;
 }

window.changeColor = function(resposta_elegida, id_pregunta, btnId) {
  var moi = document.getElementById(btnId);
  var resposta_correcta = preguntas.preguntes[id_pregunta].resposta_correcta;

  renderitzarMarcador(resposta_correcta, resposta_elegida);
  if(resposta_correcta == resposta_elegida  ) {
    moi.style.color = 'green';
  } else {
    moi.style.color = 'red';
  }
}

function renderitzarMarcador(resposta_correcta, resposta_elegida) {
  estatDeLaPartidaContainer.respostesUsuari.push(resposta_elegida);
  estatDeLaPartidaContainer.preguntaActual++;
  if(resposta_correcta == resposta_elegida) {
    estatDeLaPartidaContainer.contadorPreguntes++;
  }
  console.log(estatDeLaPartida);
  mostrarPregunta();
}

// inicializarEventListeners();
// mostrarPregunta();


window.addEventListener("DOMContentLoaded", (event) =>{
  fetch(`../back/getPreguntas.php?action=getPreguntas&n=10`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        estatDeLaPartida.preguntas = data;
        estatDeLaPartida.preguntaActual = 0;
        estatDeLaPartida.respostesUsuari = [];
        mostrarPregunta();
      })
      .catch(e => {
        partidaContainer.innerHTML = `<p>Error cargando preguntas: ${e.message}</p>`;
      });
  });


  // function fetchPreguntas(n) {
  //   fetch(`../../back/getPreguntas.php?action=getPreguntas&n=${n}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       preguntas = data;
  //       preguntaActual = 0;
  //       estatDeLaPartidaContainer.respostesUsuari = [];
  //       inicializarEventListeners();
  //       mostrarPregunta();
  //     })
  //     .catch(e => {
  //       container.innerHTML = `<p>Error cargando preguntas: ${e.message}</p>`;
  //     });
  // }