
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

  /* OCTO */

  'La disciplina construye versiones que el miedo jamás conocerá.',

  'El enfoque elimina el caos.',

  'Tu futuro está observando tus hábitos.',

  'La constancia silenciosa siempre supera al talento desordenado.',

  'Las pequeñas victorias también construyen imperios.',

  'La evolución personal ocurre en silencio.',

  'Primero controlas tus hábitos. Luego ellos construyen tu destino.',

  'La acción destruye la ansiedad.',

  'La disciplina pesa gramos. El arrepentimiento toneladas.',

  'Nadie ve las batallas mentales que ganas cada día.',

  /* AYANOKOJI STYLE */

  'Las emociones interfieren con las decisiones eficientes.',

  'La igualdad es una ilusión creada para tranquilizar débiles.',

  'La gente revela quién es cuando obtiene poder.',

  'El control emocional siempre será una ventaja.',

  'Quien domina su mente controla el juego.',

  'El silencio también puede ser una estrategia.',

  'La debilidad emocional destruye el potencial.',

  'La verdadera superioridad es el autocontrol.',

  'La lógica fría evita errores innecesarios.',

  'No necesitas reconocimiento para evolucionar.',

  /* FILOSOFÍA */

  'El tiempo seguirá avanzando contigo o sin ti.',

  'Tus hábitos actuales están creando tu futuro.',

  'El miedo desaparece después de actuar.',

  'La comodidad destruye más sueños que el fracaso.',

  'La mente puede ser prisión o arma.',

  'El caos interno también se entrena.',

  'Cada día ignorado también tiene consecuencias.',

  /* GAMER */

  'La vida también tiene ranked.',

  'AFK demasiado tiempo.',

  'No subes de nivel evitando misiones.',

  'Cada tarea completada es experiencia acumulada.',

  'Modo competitivo activado.',

  /* ANIME */

  'Incluso alguien débil puede cambiar su destino.',

  'La disciplina también es una forma de poder.',

  'Las personas cambian cuando deciden avanzar.',

  'Sigue avanzando.',

  'El verdadero enemigo suele ser uno mismo.'

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
setInterval(() => {

  randomQuote();

}, 15000);

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

      checkMindState();

      updateProgress();

      updateStats();

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
   PSYCHOLOGICAL SYSTEM
========================================= */

function checkMindState(){

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  const pending =
    tasks.filter(
      task => !task.completed
    ).length;

  /* MUCHAS COMPLETADAS */

  if(completed >= 5){

    quoteText.textContent =

      'La disciplina ya está formando parte de tu identidad.';

  }

  /* MUCHAS PENDIENTES */

  if(pending >= 5){

    quoteText.textContent =

      'Tus hábitos actuales están construyendo tu futuro.';

  }

  /* TODO COMPLETADO */

  if(
    tasks.length > 0 &&
    tasks.every(task => task.completed)
  ){

    quoteText.textContent =

      'El autocontrol siempre será una ventaja.';
  }

}

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
   STATS SYSTEM
========================================= */

function updateStats(){

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  const pending =
    tasks.filter(
      task => !task.completed
    ).length;

  const percent =
    tasks.length === 0
    ? 0
    : Math.round(
      (completed / tasks.length) * 100
    );

  document.getElementById(
    'completedCount'
  ).textContent = completed;

  document.getElementById(
    'pendingCount'
  ).textContent = pending;

  document.getElementById(
    'disciplinePercent'
  ).textContent = `${percent}%`;

}

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

scheduleNotification({

  title,

  icon,

  hour:taskHourInput.value,

  reminderType:
    reminderTypeInput.value

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
   SCHEDULE NOTIFICATIONS
========================================= */

function scheduleNotification(task){

  if(!task.hour) return;

  const now = new Date();

  const taskTime =
    new Date();

  const [hours, minutes] =
    task.hour.split(':');

  taskTime.setHours(hours);

  taskTime.setMinutes(minutes);

  taskTime.setSeconds(0);

  const reminderOffset =
    parseInt(task.reminderType) * 60000;

  const notificationTime =
    taskTime.getTime() - reminderOffset;

  const delay =
    notificationTime - now.getTime();

  if(delay > 0){

    setTimeout(() => {

      sendTaskReminder(task);

    }, delay);

  }

}

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
/* =========================================
   NOTIFICATION SYSTEM
========================================= */

if('Notification' in window){

  Notification.requestPermission();

}

const motivationalNotifications = {

  '💪':[

    'Tu entrenamiento te está esperando. La disciplina no descansa.',

    'Los cuerpos fuertes se construyen en días donde no tienes ganas.',

    'No entrenar hoy también es una decisión.'

  ],

  '📚':[

    'Tu futuro depende de lo que estudies hoy.',

    'Cada minuto estudiando te aleja de la mediocridad.',

    'Ayanokoji no dejaría esta tarea pendiente.'

  ],

  '💧':[

    'Tu cuerpo también necesita mantenimiento.',

    'Hasta las máquinas más poderosas necesitan energía.',

    'Pequeños hábitos crean grandes resultados.'

  ],

  '🧠':[

    'Controla tu mente o ella te controlará a ti.',

    'La disciplina mental cambia destinos.',

    'Piensa menos. Ejecuta más.'

  ],

  '🎮':[

    'AFK demasiado tiempo.',

    'Modo competitivo activado.',

    'No pierdas experiencia hoy.'

  ],

  'default':[

    'La disciplina construye versiones legendarias.',

    'Tu mejor versión necesita constancia.',

    'El progreso también ocurre en silencio.'

  ]

};

function sendTaskReminder(task){

  if(Notification.permission !== 'granted')
    return;

  const messages =
    motivationalNotifications[task.icon]
    ||
    motivationalNotifications['default'];

  const randomMessage =
    messages[
      Math.floor(
        Math.random() * messages.length
      )
    ];

  navigator.serviceWorker.ready.then(registration => {

    registration.showNotification(

      `⏰ ${task.title}`,

      {

        body: randomMessage,

        icon:'icon.png',

        badge:'icon.png',

        vibrate:[

          200,
          100,
          200

        ],

        tag:'octo-task',

        renotify:true

      }

    );

  });

}


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

/* =========================================
   SERVICE WORKER
========================================= */

if('serviceWorker' in navigator){

  window.addEventListener('load', () => {

    navigator.serviceWorker
      .register('./sw.js')

      .then(() => {

        console.log(
          'Service Worker registrado'
        );

      });

  });

}