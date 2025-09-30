function EsborrarPartida() {
  localStorage.removeItem("partida");
  estatDeLaPartida = {
    preguntaActual: 0,
    contadorPreguntes: 0,
    respostesUsuari: [], // Aquí anirem guardant les respostes 
    tempsRestant:30
  }
  actualitzaMarcador();
};