  const container = document.getElementById('admin-container');
  const saveBtn = document.getElementById('save-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const refreshBtn = document.getElementById('refresh-btn');
  const formTitle = document.getElementById('form-title');
  const questionsList = document.getElementById('questions-list');
  
  let preguntas = [];
  let editMode = false;

  // Cargar preguntas al inicio
  loadQuestions();

    function isValidURL(urlString) {
  try {
    const url = new URL(urlString);
    // Opcional: solo http/https
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false; // No es una URL válida
  }
}

  saveBtn.onclick = () => {
    const id = document.getElementById('id').value;
    const question = document.getElementById('question').value.trim();
    const answer_1 = document.getElementById('answer_1').value.trim();
    const answer_2 = document.getElementById('answer_2').value.trim();
    const answer_3 = document.getElementById('answer_3').value.trim();
    const answer_4 = document.getElementById('answer_4').value.trim();
    const correct_answer = parseInt(document.getElementById('correct_answer').value);
    const imagen = document.getElementById('imagen').value.trim();

    if (!question || !answer_1 || !answer_2 || !answer_3 || !answer_4 || correct_answer < 1 || correct_answer > 4 || !isValidURL(imagen)) {
      showMessage('Todos los campos son obligatorios', 'error');
      return;
    }

    if (editMode) {
      updateQuestion(id, question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagen);
    } else {
      createQuestion(question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagen);
    }
  };



  cancelBtn.onclick = () => {
    resetForm();
  };

  refreshBtn.onclick = () => {
    loadQuestions();
  };

  function createQuestion(question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagen) {
    fetch('../back/admin.php?action=create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagen })
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

  function loadQuestions() {
    fetch('../back/admin.php?action=read')
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
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>`;

    preguntas.forEach(q => {
      const answers = `1: ${q.answer_1}<br>2: ${q.answer_2}<br>3: ${q.answer_3}<br>4: ${q.answer_4}`;
      html += `
        <tr>
          <td>${q.id}</td>
          <td>${q.question.substring(0, 50)}${q.question.length > 50 ? '...' : ''}</td>
          <td style="font-size: 12px;">${answers}</td>
          <td>${q.correct_answer}</td>
          <td>
            <button class="btn-warning" onclick="editQuestion(${q.id})">Editar</button>
            <button class="btn-danger" onclick="deleteQuestion(${q.id})">Eliminar</button>
          </td>
        </tr>`;
    });

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
  }

  function updateQuestion(id, question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagen) {
    fetch('../back/admin.php?action=update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id, question, answer_1, answer_2, answer_3, answer_4, correct_answer, imagen })
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

    fetch('../back/admin.php?action=delete', {
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

  function resetForm() {
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