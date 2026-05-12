const tasks = [
  {
    id: 1,
    title: 'Hacer tarea de matemáticas',
    category: 'Estudio',
    icon: 'fa-calculator',
    completed: false,
  },
  {
    id: 2,
    title: 'Ensayo de historia',
    category: 'Estudio',
    icon: 'fa-book-open',
    completed: false,
  },
  {
    id: 3,
    title: 'Rutina de ejercicio',
    category: 'Disciplina',
    icon: 'fa-dumbbell',
    completed: false,
  },
];

const philosophicalQuotes = [
  'La disciplina pesa gramos. El arrepentimiento pesa toneladas.',
  'Tu futuro depende de lo que haces hoy.',
  'La constancia vence al talento.',
  'La mente domina antes de que el cuerpo conquiste.',
  'Los pequeños pasos diarios construyen imperios.',
  'La incomodidad es el precio del crecimiento.',
];

const completionMessages = [
  '🔥 Increíble trabajo',
  '⚡ Productividad máxima',
  '🚀 Estás evolucionando',
  '👑 Tu disciplina está creciendo',
  '💎 Hoy ganaste otra batalla',
];

const taskList = document.getElementById('taskList');
const fabButton = document.getElementById('fabButton');
const modal = document.getElementById('modal');
const createTaskButton = document.getElementById('createTaskButton');
const taskInput = document.getElementById('taskInput');
const categoryInput = document.getElementById('categoryInput');
const progressCircle = document.querySelector('.progress-circle');
const progressPercent = document.getElementById('progressPercent');
const celebration = document.getElementById('celebration');
const celebrationText = document.getElementById('celebrationText');
const dailyQuote = document.getElementById('dailyQuote');
const clock = document.getElementById('clock');
const loadingQuote = document.getElementById('loadingQuote');
const ultimateMode = document.getElementById('ultimateMode');

loadingQuote.innerText = philosophicalQuotes[
  Math.floor(Math.random() * philosophicalQuotes.length)
];

dailyQuote.innerText = philosophicalQuotes[
  Math.floor(Math.random() * philosophicalQuotes.length)
];

function updateClock() {

  const now = new Date();

  clock.innerText = now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

setInterval(updateClock, 1000);
updateClock();

fabButton.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

createTaskButton.addEventListener('click', () => {

  const title = taskInput.value.trim();
  const category = categoryInput.value.trim();

  if (!title) return;

  tasks.unshift({
    id: Date.now(),
    title,
    category: category || 'Personal',
    icon: 'fa-star',
    completed: false,
  });

  taskInput.value = '';
  categoryInput.value = '';

  modal.classList.add('hidden');

  renderTasks();
  updateProgress();

});

function renderTasks() {

  taskList.innerHTML = '';

  tasks.forEach(task => {

    const card = document.createElement('div');

    card.className = `task-card glass-card ${
      task.completed ? 'completed' : ''
    }`;

    card.innerHTML = `

      <div class="task-top">

        <div class="task-left">

          <div class="task-icon">
            <i class="fa-solid ${task.icon}"></i>
          </div>

          <div>
            <div class="task-title">${task.title}</div>
            <div class="category">${task.category}</div>
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

    card.addEventListener('click', (e) => {

  if (e.target.closest('.delete-task')) {

    const index = tasks.findIndex(t => t.id === task.id);

    tasks.splice(index, 1);

    renderTasks();
    updateProgress();

    return;
  }

      task.completed = !task.completed;

      if (task.completed) {
        showCelebration();
      }

      renderTasks();
      updateProgress();
      checkUltimateCompletion();

    });

    taskList.appendChild(card);

  });
}

function updateProgress() {

  const completed = tasks.filter(t => t.completed).length;

  const percent = Math.round((completed / tasks.length) * 100);

  progressPercent.innerText = `${percent}%`;

  const circumference = 276;

  const offset = circumference - (percent / 100) * circumference;

  progressCircle.style.strokeDashoffset = offset;
}

function showCelebration() {

  const randomMessage = completionMessages[
    Math.floor(Math.random() * completionMessages.length)
  ];

  celebrationText.innerText = randomMessage;

  celebration.classList.remove('hidden');

  celebration.style.animation = 'none';

  celebration.offsetHeight;

  celebration.style.animation = null;

  setTimeout(() => {
    celebration.classList.add('hidden');
  }, 2000);
}

function checkUltimateCompletion() {

  const allCompleted = tasks.every(task => task.completed);

  if (allCompleted && tasks.length > 0) {

    ultimateMode.classList.remove('hidden');

    setTimeout(() => {
      ultimateMode.classList.add('hidden');
    }, 4000);
  }
}

renderTasks();
updateProgress();