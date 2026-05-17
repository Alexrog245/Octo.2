
const taskGrid = document.getElementById('taskGrid');

const progressCircle =
  document.getElementById('progressCircle');

const progressText =
  document.getElementById('progressText');

const currentTime =
  document.getElementById('currentTime');

const addTaskBtn =
  document.getElementById('addTaskBtn');

const modal =
  document.getElementById('modal');
  
  const closeModalBtn =
  document.getElementById('closeModalBtn');

  /* =========================================
   CLOSE MODAL
========================================= */

closeModalBtn.addEventListener('click', () => {

  modal.classList.add('hidden');

});

/* CLOSE WHEN CLICK OUTSIDE */

modal.addEventListener('click', (e) => {

  if(e.target === modal){

    modal.classList.add('hidden');

  }

});

const saveTaskBtn =
  document.getElementById('saveTaskBtn');

const taskTitleInput =
  document.getElementById('taskTitle');

const taskCategoryInput =
  document.getElementById('taskCategory');

const taskIconInput =
  document.getElementById('taskIcon');
  
  const taskHourInput =
  document.getElementById('taskHour');

const reminderTypeInput =
  document.getElementById('reminderType');

const quoteText =
  document.getElementById('quoteText');

const completeSound =
  document.getElementById('completeSound');

const legendarySound =
  document.getElementById('legendarySound');

const particles =
  document.getElementById('particles');

/* =========================================
   PARTICLES
========================================= */

for(let i = 0; i < 40; i++){

  const particle =
    document.createElement('span');

  particle.style.left =
    Math.random() * 100 + '%';

  particle.style.animationDuration =
    (5 + Math.random() * 8) + 's';

  particle.style.opacity =
    Math.random();

  particles.appendChild(particle);

}

/* =========================================
   QUOTES
========================================= */

const quotes = [

  'La disciplina construye imperios.',

  'Tu futuro depende de lo que haces hoy.',

  'La constancia transforma vidas.',

  'Las metas sin acción son solo deseos.',

  'Conviértete en alguien imparable.',

  'Tu mejor versión requiere sacrificio.',

  'Sin sistema no existe evolución.',

  'El progreso pequeño sigue siendo progreso.'

];

/* =========================================
   LOAD RANDOM QUOTE
========================================= */

function randomQuote(){

  const random =
    quotes[Math.floor(Math.random() * quotes.length)];

  quoteText.textContent = random;

}

randomQuote();

/* =========================================
   CLOCK
========================================= */

function updateClock(){

  const now = new Date();

  currentTime.textContent =
    now.toLocaleTimeString([], {
      hour:'2-digit',
      minute:'2-digit'
    });

}

setInterval(updateClock, 1000);

updateClock();

/* =========================================
   TASKS + STORAGE
========================================= */

let tasks = JSON.parse(
  localStorage.getItem('octo_tasks')
) || [

  {
    id:1,
    title:'Hacer tarea de matemáticas',
    category:'Estudio',
    icon:'📘',
    completed:false
  },

  {
    id:2,
    title:'Entrenamiento',
    category:'Ejercicio',
    icon:'💪',
    completed:false
  }

];

/* =========================================
   SAVE TASKS
========================================= */

function saveTasks(){

  localStorage.setItem(
    'octo_tasks',
    JSON.stringify(tasks)
  );

}

/* =========================================
   RENDER TASKS
========================================= */

function renderTasks(){

  taskGrid.innerHTML = '';

  tasks.forEach(task => {

    const card =
      document.createElement('div');

    card.className =
      `task-card glass ${
        task.completed ? 'completed' : ''
      }`;

    card.innerHTML = `

      <div class="task-top">

        <div class="task-left">

          <div class="task-icon">
            ${task.icon}
          </div>

          <div>

            <div class="task-title">
              ${task.title}
            </div>

            <div class="category">
              ${task.category}
            </div>
            ${
  task.hour
  ?
  `
  <div class="task-time">
    ⏰ ${task.hour}
  </div>
  `
  :
  ''
}

          </div>

        </div>

        <div class="task-actions">

          <div class="delete-task">
            <i class="fa-solid fa-trash"></i>
          </div>

          <div class="check-circle">
            <i class="fa-solid fa-check"></i>
          </div>

        </div>

      </div>

    `;

    /* DELETE */

    const deleteBtn =
      card.querySelector('.delete-task');

    deleteBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      tasks =
        tasks.filter(t => t.id !== task.id);

      saveTasks();

      renderTasks();

      updateProgress();

    });

    /* COMPLETE */

    card.addEventListener('click', () => {

      task.completed = !task.completed;

      saveTasks();

      renderTasks();

      updateProgress();

      if(task.completed){

        completeSound.currentTime = 0;

        completeSound.play();

        showCelebration();

      }

      checkLegendary();

    });

    taskGrid.appendChild(card);

  });

}

renderTasks();

/* =========================================
   PROGRESS
========================================= */

function updateProgress(){

  const completed =
    tasks.filter(task => task.completed).length;

  const percentage =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  progressText.textContent =
    `${percentage}%`;

  const circumference = 339;

  const offset =
    circumference -
    (percentage / 100) * circumference;

  progressCircle.style.strokeDashoffset =
    offset;

}

updateProgress();

/* =========================================
   OPEN MODAL
========================================= */

addTaskBtn.addEventListener('click', () => {

  modal.classList.remove('hidden');

});


  /* =========================================
   TASK PRESETS
========================================= */

const presetButtons =
  document.querySelectorAll('.preset-btn');

const presetData = {

  '💪 Entrenar':{
    category:'Ejercicio',
    icon:'💪'
  },

  '📚 Estudiar':{
    category:'Estudio',
    icon:'📚'
  },

  '🐶 Pasear perro':{
    category:'Mascotas',
    icon:'🐶'
  },

  '⛽ Gasolina':{
    category:'Transporte',
    icon:'⛽'
  },

  '🍽️ Dar comida':{
    category:'Mascotas',
    icon:'🍽️'
  },

  '💧 Tomar agua':{
    category:'Salud',
    icon:'💧'
  },

  '📞 Llamada':{
    category:'Trabajo',
    icon:'📞'
  },

  '🛒 Compras':{
    category:'Casa',
    icon:'🛒'
  }

};

presetButtons.forEach(button => {

  button.addEventListener('click', () => {

    const preset =
      presetData[button.textContent.trim()];

    taskTitleInput.value =
      button.textContent.trim();

    taskCategoryInput.value =
      preset.category;

    taskIconInput.value =
      preset.icon;

  });

});


/* =========================================
   SAVE NEW TASK
========================================= */

saveTaskBtn.addEventListener('click', () => {

  const title =
    taskTitleInput.value.trim();

  const category =
    taskCategoryInput.value.trim();

  const icon =
    taskIconInput.value.trim() || '✨';

  if(!title || !category){

    alert('Completa todos los campos');

    return;

  }

tasks.push({

  id:Date.now(),

  title,

  category,

  icon,

  hour:taskHourInput.value,

  reminderType:
    reminderTypeInput.value,

  completed:false

});

  saveTasks();

  renderTasks();

  updateProgress();

  modal.classList.add('hidden');

  taskTitleInput.value = '';

  taskCategoryInput.value = '';

  taskIconInput.value = '';

});

/* =========================================
   CELEBRATION
========================================= */

function showCelebration(){

  const messages = [

    '🔥 Excelente',

    '🚀 Sigue avanzando',

    '👑 Disciplina pura',

    '⚡ Tu mejor versión despierta',

    '🧠 Estás evolucionando',

    '🌟 Gran progreso'

  ];

  const random =
    messages[Math.floor(Math.random() * messages.length)];

  const celebration =
    document.createElement('div');

  celebration.className =
    'celebration';

  celebration.innerHTML =
    random;

  document.body.appendChild(
    celebration
  );

  setTimeout(() => {

    celebration.remove();

  }, 2000);

}

/* =========================================
   LEGENDARY MODE
========================================= */

function checkLegendary(){

  if(tasks.length === 0) return;

  const allCompleted =
    tasks.every(task => task.completed);

  if(allCompleted){

    legendarySound.currentTime = 0;

    legendarySound.play();

    const legendary =
      document.createElement('div');

    legendary.className =
      'legendary';

    legendary.innerHTML = `

      <div class="legendary-content">

        <h1>LEGENDARY</h1>

        <p>
          Has completado todas tus tareas.
          Tu disciplina construye tu destino.
        </p>

      </div>

    `;

    document.body.appendChild(
      legendary
    );

    setTimeout(() => {

      legendary.remove();

    }, 4500);

  }

}

/* =========================================
   LOADER
========================================= */

window.addEventListener('load', () => {

  const loader =
    document.getElementById('loader');

  setTimeout(() => {

    loader.style.opacity = '0';

    setTimeout(() => {

      loader.style.display = 'none';

    }, 600);

  }, 2200);

});
