let rutaPRODback = "/P0/back/";
let rutaLOCAL = "../back/";
let rutaActual = rutaLOCAL // ESTA VARIBLE SE LE ASIGNARA LA RUTA QUE SE QUIERA USAR Y ASI NO HAY QUE CAMBIAR TODAS UNA A UNA

const container = document.getElementById('admin-container');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const refreshBtn = document.getElementById('refresh-btn');
const formTitle = document.getElementById('form-title');
const questionsList = document.getElementById('questions-list');
const fileInput = document.getElementById('imagen');
const fileNameSpan = document.querySelector('.file-name');

let preguntas = [];
let editMode = false;
let eventListenerAgregado = false;


loadQuestions();


//////////////////////////////////////////////////
// FUNCION PARA QUE COMPRUEBE QUE LA IMAGEN SEA UNA URL VALIDA
//////////////////////////////////////////////////

function isValidURL(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}



//////////////////////////////////////////////////
// LISTENERS DE LA PARTE DE ADMIN
//////////////////////////////////////////////////

function inicializarEventListeners() {
  if (eventListenerAgregado) return;

  // Listener para el botón de guardar
  saveBtn.addEventListener('click', () => {
    const id = document.getElementById('id').value;
    const question = document.getElementById('question').value.trim();
    const answer_1 = document.getElementById('answer_1').value.trim();
    const answer_2 = document.getElementById('answer_2').value.trim();
    const answer_3 = document.getElementById('answer_3').value.trim();
    const answer_4 = document.getElementById('answer_4').value.trim();
    const correct_answer = Number.parseInt(document.getElementById('correct_answer').value);
    const imagen = document.getElementById('imagen').value.trim();
    const imagenFile = document.getElementById('imagen').files[0];

    if (!question || !answer_1 || !answer_2 || !answer_3 || !answer_4 || correct_answer < 1 || correct_answer > 4) {
      showMessage('Todos los campos son obligatorios y la URL debe ser válida', 'error');
      return;
    }

    if (editMode) {
      updateQuestion(id, question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagenFile);
    } else {
      createQuestion(question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagenFile);
    }
  });

  // Listener para el botón de cancelar
  cancelBtn.addEventListener('click', () => {
    resetForm();
  });

  // Listener para el botón de refrescar
  refreshBtn.addEventListener('click', () => {
    loadQuestions();
  });

  // Listener para los botones de la tabla (editar y eliminar)
  questionsList.addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-action="edit"]');
    const deleteBtn = e.target.closest('[data-action="delete"]');

    if (editBtn) {
      const id = editBtn.dataset.id;
      editQuestion(id);
    } else if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      deleteQuestion(id);
    }
  });

  eventListenerAgregado = true;
}


////////////////////////////////////////////////////////
// FUNCION PARA CAMBIAR LA VISTA DEL INPUT DE LA IMAGEN
////////////////////////////////////////////////////////

fileInput.addEventListener('change', function() {
  if (this.files.length > 0) {
    fileNameSpan.textContent = this.files[0].name;
  } else {
    fileNameSpan.textContent = 'Selecciona un archivo...';
  }
});


//////////////////////////////////////////////////
// FUNCION QUE CREA LAS PREGUNTAS 
//////////////////////////////////////////////////

function createQuestion(question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagenFile) {
  const formData = new FormData();
  formData.append('question', question);
  formData.append('answer_1', answer_1);
  formData.append('answer_2', answer_2);
  formData.append('answer_3', answer_3);
  formData.append('answer_4', answer_4);
  formData.append('correct_answer', correct_answer);
  if (imagenFile) formData.append('imagen', imagenFile);

  fetch(`${rutaActual}admin.php?action=create`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showMessage(data.message, 'success');
      resetForm();
      loadQuestions();
    } else {
      showMessage(data.message, 'error');
    }
  })
  .catch(e => {
    showMessage('Error al crear pregunta: ' + e.message, 'error');
  });
}

//////////////////////////////////////////////////
// FUNCION PARA VOLVER A CARGAR LAS PREGUNTAS
//////////////////////////////////////////////////

function loadQuestions() {
  fetch(`${rutaActual}admin.php?action=read`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        preguntas = data.data;
        displayQuestions();
      } else {
        showMessage('Error al cargar preguntas: ' + data.message, 'error');
      }
    })
    .catch(e => {
      showMessage('Error cargando preguntas: ' + e.message, 'error');
    });
}

//////////////////////////////////////////////////
// MOSTRAR TODAS LAS PREGUNTAS DE LA BASE DE DATOS
//////////////////////////////////////////////////

function displayQuestions() {
  if (preguntas.length === 0) {
    questionsList.innerHTML = '<p>No hay preguntas registradas</p>';
    return;
  }

  let html = `<table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Pregunta</th>
        <th>Respuestas</th>
        <th>Correcta</th>
        <th>Imagen</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>`;

  for(const q of preguntas) {
    const answers = `1: ${q.answer_1}<br>2: ${q.answer_2}<br>3: ${q.answer_3}<br>4: ${q.answer_4}`;
    html += `
      <tr>
        <td>${q.id}</td>
        <td>${q.question.substring(0, 50)}${q.question.length > 50 ? '...' : ''}</td>
        <td style="font-size: 12px;">${answers}</td>
        <td>${q.correct_answer}</td>
        <td><img src="${q.imagen}" width="50" height="50" style="object-fit: cover;"/></td>
        <td>
          <button class="btn-warning" data-action="edit" data-id="${q.id}">Editar</button>
          <button class="btn-danger" data-action="delete" data-id="${q.id}">Eliminar</button>
        </td>
      </tr>`;
  };

  html += '</tbody></table>';
  questionsList.innerHTML = html;
}

function editQuestion(id) {
  const question = preguntas.find(q => q.id == id);
  if (!question) return;
  
  document.getElementById('id').value = question.id;
  document.getElementById('question').value = question.question;
  document.getElementById('answer_1').value = question.answer_1;
  document.getElementById('answer_2').value = question.answer_2;
  document.getElementById('answer_3').value = question.answer_3;
  document.getElementById('answer_4').value = question.answer_4;
  document.getElementById('correct_answer').value = question.correct_answer;
  document.getElementById('imagen').value = question.imagen;

  formTitle.textContent = 'Editar Pregunta';
  saveBtn.textContent = 'Actualizar Pregunta';
  cancelBtn.style.display = 'inline-block';
  editMode = true;

  // Scroll al formulario
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


//////////////////////////////////////////////////
// ACTUALIZAR LAS PREGUNTAS 
//////////////////////////////////////////////////

function updateQuestion(id, question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagenFile) {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('question', question);
  formData.append('answer_1', answer_1);
  formData.append('answer_2', answer_2);
  formData.append('answer_3', answer_3);
  formData.append('answer_4', answer_4);
  formData.append('correct_answer', correct_answer);

  if (imagenFile) {
    formData.append('imagen', imagenFile);
  } else {
    // si no seleccionan nueva imagen, enviamos la ruta actual para mantenerla
    const currentImage = document.getElementById('imagen').getAttribute("data-current");
    if (currentImage) formData.append('imagen_actual', currentImage);
  }

  fetch(`${rutaActual}admin.php?action=update`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showMessage(data.message, 'success');
      resetForm();
      loadQuestions();
    } else {
      showMessage(data.message, 'error');
    }
  })
  .catch(e => {
    showMessage('Error al actualizar pregunta: ' + e.message, 'error');
  });
}

function deleteQuestion(id) {
  if (!confirm('¿Estás seguro de eliminar esta pregunta?')) {
    return;
  }

  fetch(`${rutaActual}admin.php?action=delete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showMessage(data.message, 'success');
      loadQuestions();
    } else {
      showMessage(data.message, 'error');
    }
  })
  .catch(e => {
    showMessage('Error al eliminar pregunta: ' + e.message, 'error');
  });
}

//////////////////////////////////////////////////
// RESETEAR EL FORM PARA DEJARLOS EN BLANCO
//////////////////////////////////////////////////

function resetForm() {
  document.getElementById('id').value = '';
  document.getElementById('question').value = '';
  document.getElementById('answer_1').value = '';
  document.getElementById('answer_2').value = '';
  document.getElementById('answer_3').value = '';
  document.getElementById('answer_4').value = '';
  document.getElementById('correct_answer').value = '1';
  document.getElementById('imagen').value = '';
  
  formTitle.textContent = 'Crear Nueva Pregunta';
  saveBtn.textContent = 'Guardar Pregunta';
  cancelBtn.style.display = 'none';
  editMode = false;
}

function showMessage(message, type) {
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  container.insertBefore(messageDiv, container.firstChild);
  
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

//////////////////////////////////////////////////
// INCIALIZAR EVENT LISTENERS AL CARGAR LA PÁGINA
//////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', () => {
  inicializarEventListeners();
});