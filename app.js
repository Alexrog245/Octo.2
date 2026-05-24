/* =========================================
   OCTO — app.js  
========================================= */

/* =========================================
   1. REFERENCIAS AL HTML
========================================= */

const taskGrid          = document.getElementById('taskGrid');
const progressCircle    = document.getElementById('progressCircle');
const progressText      = document.getElementById('progressText');
const currentTime       = document.getElementById('currentTime');
const addTaskBtn        = document.getElementById('addTaskBtn');
const modal             = document.getElementById('modal');
const closeModalBtn     = document.getElementById('closeModalBtn');
const saveTaskBtn       = document.getElementById('saveTaskBtn');
const taskTitleInput    = document.getElementById('taskTitle');
const taskCategoryInput = document.getElementById('taskCategory');
const taskIconInput     = document.getElementById('taskIcon');
const taskHourInput     = document.getElementById('taskHour');
const reminderTypeInput = document.getElementById('reminderType');
const completedCount    = document.getElementById('completedCount');
const pendingCount      = document.getElementById('pendingCount');
const disciplineCount   = document.getElementById('disciplineCount');
const totalCount        = document.getElementById('totalCount');
const quoteText         = document.getElementById('quoteText');
const completeSound     = document.getElementById('completeSound');
const legendarySound    = document.getElementById('legendarySound');
const particles         = document.getElementById('particles');
const themeToggle       = document.getElementById('themeToggle');

/* =========================================
   2. SERVICE WORKER
   Se registra una sola vez al cargar.
   Es necesario para notificaciones
   en segundo plano.
========================================= */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then(() => console.log('✅ Service Worker registrado'))
      .catch(err => console.error('❌ Error SW:', err));
  });
}

/* =========================================
   3. PERMISOS DE NOTIFICACIÓN
   Se pide una sola vez. Si el usuario
   dice "no", no habrá notificaciones
   pero la app sigue funcionando normal.
========================================= */

async function requestNotificationPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }
}

requestNotificationPermission();

/* =========================================
   4. TEMA CLARO / OSCURO
   Al cargar revisamos la preferencia
   guardada anteriormente en localStorage.
========================================= */

const savedTheme = localStorage.getItem('octo_theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('octo_theme', isLight ? 'light' : 'dark');
});

/* =========================================
   5. PARTÍCULAS DE FONDO
========================================= */

for (let i = 0; i < 40; i++) {
  const particle = document.createElement('span');
  particle.style.left              = Math.random() * 100 + '%';
  particle.style.animationDuration = (5 + Math.random() * 8) + 's';
  particle.style.opacity           = (Math.random() * 0.35).toFixed(2);
  particle.style.animationDelay    = (Math.random() * 8) + 's';
  particles.appendChild(particle);
}

/* =========================================
   6. FRASES — 75 frases de todo tipo

   Categorías:
   · Anime (Classroom of the Elite, Naruto,
     AOT, One Piece, Bleach, MHA, etc.)
   · Filósofos clásicos (Marco Aurelio,
     Epicteto, Nietzsche, Aristóteles...)
   · Militares / Estrategas (Sun Tzu,
     Napoleón, Zapata, Bolívar...)
   · Escritores / Poetas (Bukowski,
     Neruda, Kafka, Borges, García Márquez)
   · Música / Rap (Tupac, Eminem,
     Kendrick, Jay-Z, Bad Bunny...)
   · Directores de cine (Nolan, Kubrick,
     Tarantino...)
   · Referentes modernos (MrBeast,
     James Clear, Álex Hormozi...)
   · Octo (frases propias de la app)
========================================= */

const quotes = [

  /* ---- ANIME ---- */
  { text: 'La disciplina tarde o temprano derrota al talento.',
    author: 'Ayanokoji — Classroom of the Elite' },
  { text: 'La ventaja se construye cuando nadie está mirando.',
    author: 'Ayanokoji — Classroom of the Elite' },
  { text: 'Las personas cambian cuando entienden lo que pierden.',
    author: 'Ayanokoji — Classroom of the Elite' },
  { text: 'No existe el talento innato. Todo es cuestión de cuánto deseas lograrlo.',
    author: 'Ayanokoji — Classroom of the Elite' },
  { text: 'Si no puedes hacer lo pequeño bien, jamás podrás hacer lo grande.',
    author: 'Ayanokoji — Classroom of the Elite' },
  { text: 'El fracaso no es el opuesto del éxito. Es parte de él.',
    author: 'Naruto Uzumaki — Naruto' },
  { text: 'Cuando pienses en rendirte, recuerda por qué empezaste.',
    author: 'Rock Lee — Naruto' },
  { text: 'El esfuerzo supera al genio cuando el genio no trabaja.',
    author: 'Rock Lee — Naruto' },
  { text: 'La juventud es exactamente eso: darlo todo aunque te equivoques.',
    author: 'Might Guy — Naruto' },
  { text: 'Un hombre que no puede proteger nada no merece llamarse fuerte.',
    author: 'Ichigo Kurosaki — Bleach' },
  { text: 'Si te rindes ahora, nunca sabrás lo cerca que estabas.',
    author: 'Ippo Makunouchi — Hajime no Ippo' },
  { text: 'No importa cuántas veces caigas. Lo que importa es cuántas veces te levantas.',
    author: 'Izuku Midoriya — My Hero Academia' },
  { text: 'Avanza. Si te rindes aquí, todo lo que sacrificaste no habrá valido nada.',
    author: 'Levi Ackerman — Attack on Titan' },
  { text: 'La libertad es lo más valioso del mundo. Vale pagar su precio.',
    author: 'Erwin Smith — Attack on Titan' },
  { text: 'El hombre que no puede defender lo que le importa no puede llamarse guerrero.',
    author: 'Roronoa Zoro — One Piece' },
  { text: 'Los sueños no mueren. Solo se duermen en quienes dejan de luchar.',
    author: 'Monkey D. Luffy — One Piece' },
  { text: 'La gente que no puede soltar algo importante nunca puede ganar nada.',
    author: 'Light Yagami — Death Note' },
  { text: 'El límite no existe. Solo existe la voluntad de seguir.',
    author: 'Gojo Satoru — Jujutsu Kaisen' },

  /* ---- FILÓSOFOS CLÁSICOS ---- */
  { text: 'Pierde todo el tiempo que quieras conquistando tu interior.',
    author: 'Marco Aurelio — Filósofo romano' },
  { text: 'Nunca nada externo te derrotará si primero te has conquistado a ti mismo.',
    author: 'Marco Aurelio — Filósofo romano' },
  { text: 'La felicidad de tu vida depende de la calidad de tus pensamientos.',
    author: 'Marco Aurelio — Meditaciones' },
  { text: 'Soporta y abstente. Ese es el núcleo de toda disciplina.',
    author: 'Epicteto — Filósofo estoico' },
  { text: 'No es el hombre sabio quien se lamenta de lo que no tiene.',
    author: 'Epicteto — Filósofo estoico' },
  { text: 'Solo sé que nada sé. Y ese es el comienzo de toda sabiduría.',
    author: 'Sócrates — Filósofo griego' },
  { text: 'El hombre que mueve montañas comienza apartando piedras pequeñas.',
    author: 'Confucio — Filósofo chino' },
  { text: 'Lo que no me mata, me hace más fuerte.',
    author: 'Friedrich Nietzsche — Filósofo alemán' },
  { text: 'El que tiene un porqué para vivir puede soportar casi cualquier cómo.',
    author: 'Friedrich Nietzsche — Filósofo alemán' },
  { text: 'Somos lo que hacemos repetidamente. La excelencia no es un acto, es un hábito.',
    author: 'Aristóteles — Filósofo griego' },
  { text: 'El tiempo que no se usa bien es el que más pesa al final.',
    author: 'Séneca — Filósofo estoico' },
  { text: 'Mientras enseñamos, aprendemos.',
    author: 'Séneca — Cartas a Lucilio' },

  /* ---- MILITARES / ESTRATEGAS / LIBERTADORES ---- */
  { text: 'Conoce a tu enemigo y conócete a ti mismo. Ganarás mil batallas.',
    author: 'Sun Tzu — El Arte de la Guerra' },
  { text: 'La oportunidad se multiplica cuando se aprovecha.',
    author: 'Sun Tzu — El Arte de la Guerra' },
  { text: 'Imposible es una palabra del diccionario de los cobardes.',
    author: 'Napoleón Bonaparte — Estratega militar' },
  { text: 'El genio es la capacidad de hacer un esfuerzo infinito.',
    author: 'Napoleón Bonaparte — Estratega militar' },
  { text: 'Prefiero morir de pie que vivir de rodillas.',
    author: 'Emiliano Zapata — Revolucionario mexicano' },
  { text: 'La gloria está en ser grande y en nunca abusar de la grandeza.',
    author: 'Simón Bolívar — El Libertador' },
  { text: 'Un pueblo ignorante es instrumento ciego de su propia destrucción.',
    author: 'Simón Bolívar — El Libertador' },
  { text: 'Las cadenas que más pesan son las que no se ven.',
    author: 'José Martí — Héroe cubano' },

  /* ---- ESCRITORES / POETAS ---- */
  { text: 'Lo que importa no es cuánto vives, sino cómo vives cada momento.',
    author: 'Charles Bukowski — Escritor' },
  { text: 'Puedo sobrevivir bien, pero vivir es otra cosa.',
    author: 'Franz Kafka — Escritor' },
  { text: 'El tiempo que no se usa bien es el que más pesa al final.',
    author: 'Jorge Luis Borges — Escritor' },
  { text: 'Tarde o temprano, los que ganan son los que creen que pueden.',
    author: 'Richard Bach — Escritor' },
  { text: 'No llores porque terminó. Sonríe porque sucedió.',
    author: 'Gabriel García Márquez — Nobel de Literatura' },
  { text: 'Puedo escribir los versos más tristes esta noche. Y aun así, seguir.',
    author: 'Pablo Neruda — Poeta' },

  /* ---- MÚSICA / RAP ---- */
  { text: 'La realidad es errónea. Los sueños son para los reales.',
    author: 'Tupac Shakur — Rapero' },
  { text: 'No te dejes vencer por las circunstancias. Crea las tuyas.',
    author: 'Tupac Shakur — Rapero' },
  { text: 'Si tienes miedo de empezar, imagina cómo se siente arrepentirse.',
    author: 'Eminem — Rapero' },
  { text: 'No existe el éxito sin esfuerzo. Lo que crees que es suerte, es trabajo acumulado.',
    author: 'Eminem — Rapero' },
  { text: 'Si no crees en ti mismo, nadie más lo hará.',
    author: 'Kendrick Lamar — Rapero' },
  { text: 'Las personas más exitosas han fallado más veces que el promedio. Por eso ganaron.',
    author: 'Jay-Z — Artista y empresario' },
  { text: 'El éxito para mí es hacer lo que amo cada día.',
    author: 'Bad Bunny — Artista' },

  /* ---- DIRECTORES DE CINE ---- */
  { text: 'Tu tiempo es limitado. No lo malgastes viviendo la vida de otro.',
    author: 'Christopher Nolan — Director' },
  { text: 'Cada decisión que tomas crea el universo en el que vives.',
    author: 'Christopher Nolan — Director' },
  { text: 'Si algo vale la pena hacerse, vale la pena hacerlo lento y bien.',
    author: 'Stanley Kubrick — Director' },
  { text: 'El detalle es lo que separa lo ordinario de lo extraordinario.',
    author: 'Stanley Kubrick — Director' },
  { text: 'Cuando renuncias a tus sueños, mueres por dentro.',
    author: 'Quentin Tarantino — Director' },

  /* ---- REFERENTES MODERNOS ---- */
  { text: 'No se trata de cuánto tienes. Se trata de cuánto das.',
    author: 'MrBeast — Creator' },
  { text: 'Haz lo que te da miedo. Ahí es exactamente donde empieza el crecimiento.',
    author: 'MrBeast — Creator' },
  { text: 'El volumen supera al talento cuando el talento no trabaja con volumen.',
    author: 'Álex Hormozi — Empresario' },
  { text: 'No necesitas motivación. Necesitas identidad. Actúa como quien quieres ser.',
    author: 'James Clear — Atomic Habits' },
  { text: 'Un 1% mejor cada día es 37 veces mejor al final del año.',
    author: 'James Clear — Atomic Habits' },
  { text: 'Los hábitos son el interés compuesto de la superación personal.',
    author: 'James Clear — Atomic Habits' },
  { text: 'Haz lo que tienes que hacer hasta que puedas hacer lo que quieres hacer.',
    author: 'Oprah Winfrey — Presentadora y empresaria' },

  /* ---- OCTO ---- */
  { text: 'Los débiles dependen de motivación. Los fuertes dependen de sistemas.',
    author: 'Octo' },
  { text: 'La constancia convierte lo imposible en inevitable.',
    author: 'Octo' },
  { text: 'Cada día que ignoras tu potencial, alguien menos talentoso te supera.',
    author: 'Octo' },
  { text: 'El tiempo igual pasará. Decide en quién te convertirás mientras pasa.',
    author: 'Octo' },
  { text: 'Tu futuro no es lo que imaginas. Es lo que haces hoy.',
    author: 'Octo' },
  { text: 'La disciplina construye imperios silenciosos.',
    author: 'Octo' },
  { text: 'No necesitas sentir ganas. Necesitas actuar. Las ganas llegan después.',
    author: 'Octo' },
  { text: 'El progreso más poderoso es el que nadie ve todavía.',
    author: 'Octo' },

];

/* Evita repetir la misma frase dos veces seguidas */
let lastQuoteIndex = -1;

function randomQuote() {
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === lastQuoteIndex);

  lastQuoteIndex = index;
  const q = quotes[index];

  quoteText.innerHTML = `
    "${q.text}"
    <br><br>
    <span class="quote-author">— ${q.author}</span>
  `;
}

randomQuote();
setInterval(randomQuote, 18000);

/* =========================================
   7. RELOJ
========================================= */

function updateClock() {
  const now = new Date();
  currentTime.textContent = now.toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit'
  });
}

setInterval(updateClock, 1000);
updateClock();

/* =========================================
   8. TAREAS — CARGA DESDE localStorage
========================================= */

let tasks = JSON.parse(localStorage.getItem('octo_tasks')) || [
  { id: 1, title: 'Hacer tarea de matemáticas', category: 'Estudio',   icon: '📘', completed: false, hour: '', reminderType: '30' },
  { id: 2, title: 'Entrenamiento',              category: 'Ejercicio', icon: '💪', completed: false, hour: '', reminderType: '30' },
];

/* =========================================
   9. GUARDAR TAREAS
========================================= */

function saveTasks() {
  localStorage.setItem('octo_tasks', JSON.stringify(tasks));
}

/* =========================================
   10. ACTUALIZAR ESTADÍSTICAS
========================================= */

function updateStats() {
  const completed  = tasks.filter(t => t.completed).length;
  const pending    = tasks.filter(t => !t.completed).length;
  const total      = tasks.length;
  const discipline = total === 0 ? 0 : Math.round((completed / total) * 100);

  completedCount.textContent  = completed;
  pendingCount.textContent    = pending;
  totalCount.textContent      = total;
  disciplineCount.textContent = discipline + '%';
}

/* =========================================
   11. PROGRESO CIRCULAR
   Circunferencia = 2 × π × 54 ≈ 339
========================================= */

function updateProgress() {
  const completed     = tasks.filter(t => t.completed).length;
  const percentage    = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
  const circumference = 339;
  const offset        = circumference - (percentage / 100) * circumference;

  progressText.textContent              = percentage + '%';
  progressCircle.style.strokeDashoffset = offset;
}

/* =========================================
   12. SISTEMA PSICOLÓGICO DE FRASES
   Cambia la frase según el estado del usuario.
========================================= */

function checkMindState() {
  const completed = tasks.filter(t => t.completed).length;
  const pending   = tasks.filter(t => !t.completed).length;

  if (tasks.length > 0 && tasks.every(t => t.completed)) {
    quoteText.innerHTML = `"El autocontrol siempre será tu mayor ventaja."<br><br><span class="quote-author">— Octo</span>`;
    return;
  }
  if (completed >= 5) {
    quoteText.innerHTML = `"La disciplina ya está formando parte de tu identidad."<br><br><span class="quote-author">— Octo</span>`;
    return;
  }
  if (pending >= 5) {
    quoteText.innerHTML = `"Tus hábitos actuales están construyendo tu futuro."<br><br><span class="quote-author">— Octo</span>`;
  }
}

/* =========================================
   13. RENDERIZAR TAREAS
   Incluye estado vacío con imagen propia.
   Usa "octo-break.png" cuando no hay tareas.
========================================= */

function renderTasks() {
  taskGrid.innerHTML = '';

  /* Estado vacío — imagen octo-break.png */
  if (tasks.length === 0) {
    taskGrid.innerHTML = `
      <div class="empty-state">
        <img src="octo-break.png" class="empty-img" alt="Octo en break"
             onerror="this.style.display='none'; document.getElementById('emptyFallback').style.display='block'">
        <span id="emptyFallback" style="display:none; font-size:56px;">🐙</span>
        <strong>Octo está en break...</strong>
        <p>No hay tareas por ahora.<br>Agrega una y construye tu mejor versión.</p>
      </div>
    `;
    return;
  }

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = `task-card glass ${task.completed ? 'completed' : ''}`;

    card.innerHTML = `
      <div class="task-top">
        <div class="task-left">
          <div class="task-icon">${task.icon}</div>
          <div>
            <div class="task-title">${task.title}</div>
            <div class="category">${task.category}</div>
            ${task.hour ? `<div class="task-time">⏰ ${task.hour}</div>` : ''}
          </div>
        </div>
        <div class="task-actions">
          <div class="delete-task"  title="Eliminar"><i class="fa-solid fa-trash"></i></div>
          <div class="check-circle" title="Completar"><i class="fa-solid fa-check"></i></div>
        </div>
      </div>
    `;

    /* Borrar */
    card.querySelector('.delete-task').addEventListener('click', (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
      updateProgress();
      updateStats();
      checkMindState();
    });

    /* Completar / descompletar */
    card.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
      updateProgress();
      updateStats();
      checkMindState();

      if (task.completed) {
        completeSound.currentTime = 0;
        completeSound.play().catch(() => {});
        showCelebration();
      }

      checkLegendary();
    });

    taskGrid.appendChild(card);
  });
}

/* =========================================
   14. MODAL — ABRIR Y CERRAR
========================================= */

addTaskBtn.addEventListener('click',    () => modal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

/* =========================================
   15. PRESETS DE TAREAS RÁPIDAS
========================================= */

const presetData = {
  '💪 Entrenar':     { category: 'Ejercicio',  icon: '💪' },
  '📚 Estudiar':     { category: 'Estudio',    icon: '📚' },
  '🐶 Pasear perro': { category: 'Mascotas',   icon: '🐶' },
  '⛽ Gasolina':     { category: 'Transporte', icon: '⛽' },
  '🍽️ Dar comida':   { category: 'Mascotas',   icon: '🍽️' },
  '💧 Tomar agua':   { category: 'Salud',      icon: '💧' },
  '📞 Llamada':      { category: 'Trabajo',    icon: '📞' },
  '🛒 Compras':      { category: 'Casa',       icon: '🛒' },
};

document.querySelectorAll('.preset-btn').forEach(button => {
  button.addEventListener('click', () => {
    const key    = button.textContent.trim();
    const preset = presetData[key];
    if (!preset) return;
    taskTitleInput.value    = key;
    taskCategoryInput.value = preset.category;
    taskIconInput.value     = preset.icon;
  });
});

/* =========================================
   16. GUARDAR NUEVA TAREA
========================================= */

saveTaskBtn.addEventListener('click', () => {
  const title    = taskTitleInput.value.trim();
  const category = taskCategoryInput.value.trim();
  const icon     = taskIconInput.value.trim() || '✨';

  if (!title || !category) {
    alert('Completa el título y la categoría');
    return;
  }

  const newTask = {
    id:           Date.now(),
    title,
    category,
    icon,
    hour:         taskHourInput.value,
    reminderType: reminderTypeInput.value,
    completed:    false,
  };

  tasks.push(newTask);
  saveTasks();
  scheduleNotification(newTask);
  renderTasks();
  updateProgress();
  updateStats();

  taskTitleInput.value    = '';
  taskCategoryInput.value = '';
  taskIconInput.value     = '';
  taskHourInput.value     = '';
  modal.classList.add('hidden');
});

/* =========================================
   17. MENSAJES DE NOTIFICACIÓN POR EMOJI
========================================= */

const notificationMessages = {
  '💪': [
    'Tu cuerpo refleja tus hábitos. No faltes.',
    'Cada repetición construye disciplina.',
    'La incomodidad de hoy será poder mañana.',
  ],
  '📚': [
    'El conocimiento te da ventaja sobre los demás.',
    'Estudiar hoy evita arrepentimientos mañana.',
    'Ayanokoji no dejaría esta tarea pendiente.',
  ],
  '💧': [
    'Tu cuerpo también necesita mantenimiento.',
    'Hasta las máquinas más poderosas necesitan energía.',
    'Pequeños hábitos crean grandes resultados.',
  ],
  '🐶': [
    'Tu compañero te está esperando.',
    'La responsabilidad también se practica aquí.',
    'Cuidar a otros te hace más grande.',
  ],
  '🛒': [
    'Resolver lo pequeño mantiene el control total.',
    'La organización evita el caos.',
    'Cada tarea completada fortalece tu sistema.',
  ],
  '📞': [
    'La comunicación construye relaciones sólidas.',
    'No dejes para mañana lo que puedes resolver hoy.',
    'Tu disciplina también se refleja en lo social.',
  ],
  '⛽': [
    'Lo operativo también es parte del sistema.',
    'Un profesional resuelve lo urgente sin perder el foco.',
    'No ignores lo pequeño. Lo pequeño sostiene lo grande.',
  ],
  '🍽️': [
    'La constancia también se practica en lo cotidiano.',
    'Las responsabilidades diarias forjan el carácter.',
    'Cada hábito cuenta, hasta los más simples.',
  ],
  'default': [
    'La disciplina construye versiones legendarias.',
    'Tu mejor versión necesita constancia.',
    'El progreso también ocurre en silencio.',
  ],
};

/* =========================================
   18. PROGRAMAR NOTIFICACIÓN
   Una sola función. Usa setTimeout
   + Service Worker para que funcione
   aunque el usuario cambie de pestaña.
========================================= */

function scheduleNotification(task) {
  if (!task.hour)                            return;
  if (!('Notification' in window))           return;
  if (Notification.permission !== 'granted') return;

  const [hour, minute]  = task.hour.split(':').map(Number);
  const reminderMinutes = parseInt(task.reminderType) || 0;

  const now              = new Date();
  const notificationTime = new Date();
  notificationTime.setHours(hour, minute, 0, 0);
  notificationTime.setMinutes(notificationTime.getMinutes() - reminderMinutes);

  const delay = notificationTime.getTime() - now.getTime();
  if (delay <= 0) return; // la hora ya pasó hoy

  const messages      = notificationMessages[task.icon] || notificationMessages['default'];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  setTimeout(() => {
    navigator.serviceWorker.ready
      .then(reg => {
        reg.showNotification(`${task.icon} ${task.title}`, {
          body:               randomMessage,
          icon:               'icon.png',
          badge:              'icon.png',
          vibrate:            [200, 100, 200],
          tag:                `octo-${task.id}`,
          requireInteraction: true,
          renotify:           true,
        });
      })
      .catch(err => console.error('❌ Notificación:', err));
  }, delay);
}

/* =========================================
   19. RE-PROGRAMAR NOTIFICACIONES AL ABRIR
   setTimeout no sobrevive al cerrar el
   navegador, así que las volvemos a
   programar cada vez que la app se abre.
========================================= */

function rescheduleAllNotifications() {
  tasks
    .filter(t => !t.completed && t.hour)
    .forEach(scheduleNotification);
}

/* =========================================
   20. CELEBRACIÓN AL COMPLETAR TAREA
========================================= */

function showCelebration() {
  const messages = [
    '🔥 Excelente',
    '🚀 Sigue avanzando',
    '👑 Disciplina pura',
    '⚡ Tu mejor versión despierta',
    '🧠 Estás evolucionando',
    '🌟 Gran progreso',
    '💎 Imparable',
    '🎯 En la zona',
  ];

  const random      = messages[Math.floor(Math.random() * messages.length)];
  const celebration = document.createElement('div');
  celebration.className = 'celebration';
  celebration.innerHTML = random;
  document.body.appendChild(celebration);
  setTimeout(() => celebration.remove(), 2000);
}

/* =========================================
   21. MODO LEGENDARY
   Se activa cuando completas TODAS
   las tareas del día.
========================================= */

function checkLegendary() {
  if (tasks.length === 0)             return;
  if (!tasks.every(t => t.completed)) return;

  legendarySound.currentTime = 0;
  legendarySound.play().catch(() => {});

  const legendary = document.createElement('div');
  legendary.className = 'legendary';
  legendary.innerHTML = `
    <div class="legendary-content">
      <h1>LEGENDARY</h1>
      <p>Has completado todas tus tareas.<br>Tu disciplina construye tu destino.</p>
    </div>
  `;
  document.body.appendChild(legendary);
  setTimeout(() => legendary.remove(), 4500);
}

/* =========================================
   22. LOADER DE INICIO
========================================= */

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.display = 'none'; }, 600);
  }, 2200);
});

/* =========================================
   23. ARRANQUE DE LA APP
========================================= */

renderTasks();
updateProgress();
updateStats();
rescheduleAllNotifications();
