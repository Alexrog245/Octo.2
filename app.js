
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

  if (e.target === modal) {

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

/* =========================================
   STATS ELEMENTS
========================================= */

const completedCount =
  document.getElementById('completedCount');

const pendingCount =
  document.getElementById('pendingCount');

const disciplineCount =
  document.getElementById('disciplineCount');

const totalCount =
  document.getElementById('totalCount');

const quoteText =
  document.getElementById('quoteText');

const completeSound =
  document.getElementById('completeSound');

const legendarySound =
  document.getElementById('legendarySound');

const particles =
  document.getElementById('particles');

/* =========================================
 NOTIFICATIONS
========================================= */

if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('sw.js')
    .then(() => {

      console.log('Service Worker activo');

    });

}

if (Notification.permission !== 'granted') {

  Notification.requestPermission();

}

/* =========================================
   PARTICLES
========================================= */

for (let i = 0; i < 40; i++) {

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

  {
    text: 'La disciplina tarde o temprano derrota al talento.',
    author: 'Ayanokoji'
  },

  {
    text: 'Los débiles dependen de motivación. Los fuertes dependen de sistemas.',
    author: 'Octo'
  },

  {
    text: 'El hombre conquista el mundo conquistándose a sí mismo.',
    author: 'Zen'
  },

  {
    text: 'El tiempo igual pasará. Decide en quién te convertirás mientras pasa.',
    author: 'Octo'
  },

  {
    text: 'La ventaja se construye cuando nadie está mirando.',
    author: 'Ayanokoji'
  },

  {
    text: 'La constancia convierte lo imposible en inevitable.',
    author: 'Octo'
  },

  {
    text: 'No necesitas sentir ganas. Necesitas actuar.',
    author: 'Kratos'
  },

  {
    text: 'Cada día que ignoras tu potencial alguien menos talentoso te supera.',
    author: 'Octo'
  },

  {
    text: 'Las personas cambian cuando entienden lo que pierden.',
    author: 'Ayanokoji'
  },

  {
    text: 'Tu futuro está creado por lo que haces hoy.',
    author: 'Anime Philosophy'
  },
];

/* =========================================
   LOAD RANDOM QUOTE
========================================= */

function randomQuote() {

  const random =
    quotes[Math.floor(Math.random() * quotes.length)];

  quoteText.innerHTML = `
  "${random.text}"
  <br><br>
  <span class="quote-author">
    — ${random.author}
  </span>
`;

}

randomQuote();
setInterval(() => {

  randomQuote();

}, 15000);

/* =========================================
   CLOCK
========================================= */

function updateClock() {

  const now = new Date();

  currentTime.textContent =
    now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
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
      id: 1,
      title: 'Hacer tarea de matemáticas',
      category: 'Estudio',
      icon: '📘',
      completed: false
    },

    {
      id: 2,
      title: 'Entrenamiento',
      category: 'Ejercicio',
      icon: '💪',
      completed: false
    }

  ];

/* =========================================
   SAVE TASKS
========================================= */

function saveTasks() {

  localStorage.setItem(
    'octo_tasks',
    JSON.stringify(tasks)
  );

}

/* =========================================
   RENDER TASKS
========================================= */

function renderTasks() {

  taskGrid.innerHTML = '';

  tasks.forEach(task => {

    const card =
      document.createElement('div');

    card.className =
      `task-card glass ${task.completed ? 'completed' : ''
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
            ${task.hour
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
      scheduleNotification(tasks[tasks.length - 1]);

      renderTasks();

      checkMindState();

      updateProgress();
      updateStats();

      /* =========================================
         UPDATE STATS
      ========================================= */

      function updateStats() {

        const completed =
          tasks.filter(task => task.completed).length;

        const pending =
          tasks.filter(task => !task.completed).length;

        const total =
          tasks.length;

        const discipline =
          total === 0
            ? 0
            : Math.round(
              (completed / total) * 100
            );

        completedCount.textContent =
          completed;

        pendingCount.textContent =
          pending;

        totalCount.textContent =
          total;

        disciplineCount.textContent =
          `${discipline}%`;

      }

      updateStats();

      updateStats();

    });

    /* COMPLETE */

    card.addEventListener('click', () => {

      task.completed = !task.completed;

      saveTasks();

      renderTasks();

      updateProgress();
      updateStats();

      if (task.completed) {

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

function checkMindState() {

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  const pending =
    tasks.filter(
      task => !task.completed
    ).length;

  /* MUCHAS COMPLETADAS */

  if (completed >= 5) {

    quoteText.textContent =

      'La disciplina ya está formando parte de tu identidad.';

  }

  /* MUCHAS PENDIENTES */

  if (pending >= 5) {

    quoteText.textContent =

      'Tus hábitos actuales están construyendo tu futuro.';

  }

  /* TODO COMPLETADO */

  if (
    tasks.length > 0 &&
    tasks.every(task => task.completed)
  ) {

    quoteText.textContent =

      'El autocontrol siempre será una ventaja.';
  }

}

/* =========================================
   PROGRESS
========================================= */

function updateProgress() {

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
updateStats();

/* =========================================
   STATS SYSTEM
========================================= */

function updateStats() {

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

  '💪 Entrenar': {
    category: 'Ejercicio',
    icon: '💪'
  },

  '📚 Estudiar': {
    category: 'Estudio',
    icon: '📚'
  },

  '🐶 Pasear perro': {
    category: 'Mascotas',
    icon: '🐶'
  },

  '⛽ Gasolina': {
    category: 'Transporte',
    icon: '⛽'
  },

  '🍽️ Dar comida': {
    category: 'Mascotas',
    icon: '🍽️'
  },

  '💧 Tomar agua': {
    category: 'Salud',
    icon: '💧'
  },

  '📞 Llamada': {
    category: 'Trabajo',
    icon: '📞'
  },

  '🛒 Compras': {
    category: 'Casa',
    icon: '🛒'
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
const notificationMessages = {

  '💪': [

    'Tu cuerpo refleja tus hábitos.',
    'Cada repetición construye disciplina.',
    'La fuerza mental también se entrena.'

  ],

  '📚': [

    'La ventaja intelectual se construye en silencio.',
    'Estudiar hoy es dominar mañana.',
    'Cada página leída te separa del promedio.'

  ],

  '🧠': [

    'La disciplina siempre supera a la motivación.',
    'Pensar diferente requiere actuar diferente.',
    'La mente se entrena igual que el cuerpo.'

  ],

  '👑': [

    'Los líderes actúan incluso cuando no quieren.',
    'El respeto se gana con acciones.',
    'Tu disciplina habla antes que tú.'

  ],

  '🚀': [

    'Tu futuro depende de lo que hagas hoy.',
    'Las metas sin acción son ilusiones.',
    'La ambición requiere sacrificio.'

  ]

};


saveTaskBtn.addEventListener('click', () => {

  const title =
    taskTitleInput.value.trim();

  const category =
    taskCategoryInput.value.trim();

  const icon =
    taskIconInput.value.trim() || '✨';

  if (!title || !category) {

    alert('Completa todos los campos');

    return;

  }

  tasks.push({

    id: Date.now(),

    title,

    category,

    icon,

    hour: taskHourInput.value,

    reminderType:
      reminderTypeInput.value,

    completed: false

  });

  scheduleNotification({

    title,

    icon,

    hour: taskHourInput.value,

    reminderType:
      reminderTypeInput.value

  });

  saveTasks();

  renderTasks();

  updateProgress();
  updateStats();

  scheduleNotification(
    title,
    category,
    icon,
    taskHourInput.value,
    reminderTypeInput.value
  );

  modal.classList.add('hidden');

  taskTitleInput.value = '';

  taskCategoryInput.value = '';

  taskIconInput.value = '';

});

/* =========================================
   SCHEDULE NOTIFICATIONS
========================================= */

function scheduleNotification(task) {

  if (!task.hour) return;

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

  if (delay > 0) {

    setTimeout(() => {

      sendTaskReminder(task);

    }, delay);

  }

}

/* =========================================
   CELEBRATION
========================================= */

function showCelebration() {

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

function checkLegendary() {

  if (tasks.length === 0) return;

  const allCompleted =
    tasks.every(task => task.completed);

  if (allCompleted) {

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

if ('Notification' in window) {

  Notification.requestPermission();

}

const motivationalNotifications = {

  '💪': [

    'Tu entrenamiento te está esperando. La disciplina no descansa.',

    'Los cuerpos fuertes se construyen en días donde no tienes ganas.',

    'No entrenar hoy también es una decisión.'

  ],

  '📚': [

    'Tu futuro depende de lo que estudies hoy.',

    'Cada minuto estudiando te aleja de la mediocridad.',

    'Ayanokoji no dejaría esta tarea pendiente.'

  ],

  '💧': [

    'Tu cuerpo también necesita mantenimiento.',

    'Hasta las máquinas más poderosas necesitan energía.',

    'Pequeños hábitos crean grandes resultados.'

  ],

  '🧠': [

    'Controla tu mente o ella te controlará a ti.',

    'La disciplina mental cambia destinos.',

    'Piensa menos. Ejecuta más.'

  ],

  '🎮': [

    'AFK demasiado tiempo.',

    'Modo competitivo activado.',

    'No pierdas experiencia hoy.'

  ],

  'default': [

    'La disciplina construye versiones legendarias.',

    'Tu mejor versión necesita constancia.',

    'El progreso también ocurre en silencio.'

  ]

};

function sendTaskReminder(task) {

  if (Notification.permission !== 'granted')
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

        icon: 'icon.png',

        badge: 'icon.png',

        vibrate: [

          200,
          100,
          200

        ],

        tag: 'octo-task',

        renotify: true

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

if ('serviceWorker' in navigator) {

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

/* =========================================
   SMART NOTIFICATIONS
========================================= */

function scheduleNotification(task) {

  if (!('Notification' in window)) return;

  if (Notification.permission !== 'granted') return;

  if (!task.hour) return;

  const [hour, minute] =
    task.hour.split(':');

  const now = new Date();

  const notificationTime =
    new Date();

  notificationTime.setHours(hour);
  notificationTime.setMinutes(minute);

  notificationTime.setSeconds(0);

  const reminderMinutes =
    parseInt(task.reminderType);

  notificationTime.setMinutes(
    notificationTime.getMinutes() - reminderMinutes
  );

  const timeout =
    notificationTime.getTime() - now.getTime();

  if (timeout <= 0) return;

  setTimeout(() => {

    const categoryMessages =
      notificationMessages[task.icon] || [

        'Tu disciplina define tu destino.'
      ];

    const randomMessage =
      categoryMessages[
      Math.floor(
        Math.random() * categoryMessages.length
      )
      ];

    new Notification(
      `⏰ ${task.title}`,
      {
        body: randomMessage,
        icon: 'icon.png'
      }
    );

  }, timeout);

}
/* =========================================
   NOTIFICATION PERMISSION
========================================= */

if ('Notification' in window) {

  Notification.requestPermission();

}
/* =========================================
   REAL NOTIFICATIONS
========================================= */

function scheduleNotification(
  title,
  category,
  icon,
  hour,
  reminder
) {

  if (!hour) return;

  const now = new Date();

  const taskTime = new Date();

  const [hours, minutes] =
    hour.split(':');

  taskTime.setHours(hours);
  taskTime.setMinutes(minutes);
  taskTime.setSeconds(0);

  taskTime.setMinutes(
    taskTime.getMinutes() - Number(reminder)
  );

  const delay =
    taskTime.getTime() - now.getTime();

  if (delay <= 0) return;

  const messages = {

    '💪': [
      'Tu disciplina física construye tu mente.',
      'Cada entrenamiento te acerca a tu mejor versión.',
      'La incomodidad de hoy será poder mañana.'
    ],

    '📚': [
      'El conocimiento te da ventaja sobre los demás.',
      'Estudiar hoy evita arrepentimientos mañana.',
      'Tu futuro depende de lo que aprendas ahora.'
    ],

    '🧠': [
      'Tu mente necesita entrenamiento diario.',
      'Pensar diferente cambia tu destino.',
      'El enfoque separa a los grandes del resto.'
    ],

    '🛒': [
      'Resolver lo pequeño mantiene el control total.',
      'La organización evita el caos.',
      'Cada tarea completada fortalece tu sistema.'
    ],

    '✨': [
      'No ignores lo que prometiste hacer.',
      'La disciplina supera la motivación.',
      'Tu versión futura depende de esta decisión.'
    ]

  };

  const motivational =
    messages[icon] || messages['✨'];

  const randomMessage =
    motivational[
    Math.floor(
      Math.random() * motivational.length
    )
    ];

  setTimeout(() => {

    navigator.serviceWorker.ready.then(reg => {

      reg.showNotification(
        `${icon} ${title}`,
        {

          body: randomMessage,

          icon: 'icon.png',

          badge: 'icon.png',

          vibrate: [200, 100, 200],

          tag: 'octo-task',

          requireInteraction: true

        }
      );

    });

  }, delay);

}