import dataFlags from './data.js';  
console.log(dataFlags);

let estatDeLaPartida = { 
contadorPreguntes: 0, 
respostesUsuari: [], // Aquí anirem guardant les respostes 
preguntaActual: 0
}; 

function mostrarPregunta() {
  let elem = document.getElementById("partida");
  let i = estatDeLaPartida.preguntaActual;
  let stringhtml= "";

  if(i<dataFlags.preguntes.length) {
    stringhtml += ` <h3> ${dataFlags.preguntes[i].pregunta} </h3> `;
    stringhtml += ` <img src="${dataFlags.preguntes[i].imatge}" width="300"/> <br>`;
    for (let j = 0; j < dataFlags.preguntes[i].respostes.length; j++) {
      let btnId = `btn-${i}-${j}`;
      stringhtml += `<button type="radio" id="${btnId}" onClick="changeColor(${j}, ${i}, '${btnId}')">${dataFlags.preguntes[i].respostes[j]} </button> `;
    }
  } else {
    stringhtml += ` <h3> FIN DE LAS PREGUNTAS </h3> `;
    stringhtml += ` <p> RESULTADOS: </p>`;
    estatDeLaPartida.respostesUsuari.forEach((respuestaUsuari, indice) => {
      let respuesta_correcta = dataFlags.preguntes[indice].resposta_correcta;
      stringhtml += ` <h4><br>${dataFlags.preguntes[indice].pregunta}</h4>`;
      stringhtml += ` <img src="${dataFlags.preguntes[indice].imatge}" width="300"/> <br>`;
      if(dataFlags.preguntes[indice].resposta_correcta == respuestaUsuari) {
        stringhtml += ` <p> La respuesta de la pregunta ${indice+1} es correcta!!!`;
        stringhtml += ` <p> ${dataFlags.preguntes[indice].respostes[respuesta_correcta]} </p>`;
      } else {
        stringhtml += ` <p> La respuesta de la pregunta ${indice+1} es incorrecta!!!`;
        stringhtml += ` <p> La pregunta que elegiste es: ${dataFlags.preguntes[indice].respostes[respuestaUsuari]} </p>`;
        stringhtml += ` <p> La pregunta correcta es <b>${dataFlags.preguntes[indice].respostes[respuesta_correcta]}</b> </p>`;
      }
    });
    // hacer el bucle para mostrar cada pregunta y la respuesta correcta, que lea las preguntas que ha marcado y 
    // sepa si esta bien o esta mal la pregunta, hacemos un bulce de las respostes del usuari y revisamos el 
    // indice de cada preugnta, si no coincide con el indice correcto del json entonces que ponga incorrecto +
    // y que la ponga en rojo y ponga la correcta a un costado
    //si esta bien entonces que ponga que esta bien, que lo ponga de color verde

    document.getElementById("btnEnviarDatos").removeAttribute("hidden");
  }


  elem.innerHTML = stringhtml;
}

window.changeColor = function(resposta_elegida, id_pregunta, btnId) {
  var moi = document.getElementById(btnId);
  var resposta_correcta = dataFlags.preguntes[id_pregunta].resposta_correcta;

  renderitzarMarcador(resposta_correcta, resposta_elegida);
  if(resposta_correcta == resposta_elegida  ) {
    moi.style.color = 'green';
  } else {
    moi.style.color = 'red';
  }
}

function renderitzarMarcador(resposta_correcta, resposta_elegida) {
  estatDeLaPartida.respostesUsuari.push(resposta_elegida);
  estatDeLaPartida.preguntaActual++;
  if(resposta_correcta == resposta_elegida) {
    estatDeLaPartida.contadorPreguntes++;
  }
  console.log(estatDeLaPartida);
  mostrarPregunta();
}

mostrarPregunta();

// window.addEventListener("DOMContentLoaded"), (event) =>{
//   fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(data => {console.log(data);})
//   }