const questions = [
 // ...existing code...
{
  question: "Which of the following is a scalar quantity?",
  options: ["Velocity", "Acceleration", "Speed", "Displacement"],
  answer: 2
},
{
  question: "Which of the following is a vector quantity?",
  options: ["Distance", "Speed", "Mass", "Force"],
  answer: 3
},
{
  question: "The magnitude of a vector is always:",
  options: ["Negative", "Zero", "Positive or zero", "Positive"],
  answer: 2
},
{
  question: "Which of these is NOT a vector?",
  options: ["Displacement", "Velocity", "Work", "Acceleration"],
  answer: 2
},
{
  question: "Which of the following is a scalar quantity?",
  options: ["Momentum", "Weight", "Energy", "Acceleration"],
  answer: 2
},
{
  question: "Which of the following is a vector quantity?",
  options: ["Time", "Temperature", "Displacement", "Mass"],
  answer: 2
},
{
  question: "Which of these is a scalar?",
  options: ["Force", "Power", "Impulse", "Acceleration"],
  answer: 1
},
{
  question: "Which of the following is a vector?",
  options: ["Distance", "Speed", "Velocity", "Work"],
  answer: 2
},
{
  question: "Which of the following is a scalar quantity?",
  options: ["Area", "Displacement", "Velocity", "Acceleration"],
  answer: 0
},
{
  question: "Which of the following is a vector quantity?",
  options: ["Energy", "Pressure", "Weight", "Power"],
  answer: 2
},
{
  question: "Which of these is a scalar?",
  options: ["Momentum", "Work", "Force", "Acceleration"],
  answer: 1
},
{
  question: "Which of the following is a vector?",
  options: ["Mass", "Distance", "Acceleration", "Speed"],
  answer: 2
},
{
  question: "Which of the following is a scalar quantity?",
  options: ["Impulse", "Volume", "Force", "Acceleration"],
  answer: 1
},
{
  question: "Which of the following is a vector quantity?",
  options: ["Density", "Length", "Displacement", "Temperature"],
  answer: 2
},
{
  question: "Which of these is a scalar?",
  options: ["Weight", "Velocity", "Distance", "Acceleration"],
  answer: 2
},
{
  question: "Which of the following is a vector?",
  options: ["Speed", "Distance", "Displacement", "Work"],
  answer: 2
},
{
  question: "Which of the following is a scalar quantity?",
  options: ["Acceleration", "Velocity", "Mass", "Force"],
  answer: 2
},
{
  question: "Which of the following is a vector quantity?",
  options: ["Energy", "Momentum", "Power", "Work"],
  answer: 1
},
{
  question: "Which of these is a scalar?",
  options: ["Impulse", "Force", "Acceleration", "Velocity"],
  answer: 0
},
{
  question: "Which of the following is a vector?",
  options: ["Time", "Temperature", "Weight", "Mass"],
  answer: 2
},
{
  question: "Which of the following is a scalar quantity?",
  options: ["Displacement", "Distance", "Velocity", "Acceleration"],
  answer: 1
},
{
  question: "Which of the following is a vector quantity?",
  options: ["Area", "Volume", "Force", "Energy"],
  answer: 2
},
{
  question: "Which of these is a scalar?",
  options: ["Acceleration", "Velocity", "Speed", "Displacement"],
  answer: 2
},
{
  question: "Which of the following is a vector?",
  options: ["Work", "Power", "Momentum", "Energy"],
  answer: 2
},
{
  question: "Which of the following is a scalar quantity?",
  options: ["Impulse", "Force", "Acceleration", "Velocity"],
  answer: 0
},
{
  question: "Which of the following is a vector quantity?",
  options: ["Pressure", "Weight", "Energy", "Time"],
  answer: 1
},
{
  question: "Which of these is a scalar?",
  options: ["Displacement", "Velocity", "Distance", "Acceleration"],
  answer: 2
},
{
  question: "Which of the following is a vector?",
  options: ["Mass", "Speed", "Acceleration", "Temperature"],
  answer: 2
},
{
  question: "Which of the following is a scalar quantity?",
  options: ["Momentum", "Work", "Force", "Acceleration"],
  answer: 1
},
{
  question: "Which of the following is a vector quantity?",
  options: ["Energy", "Power", "Impulse", "Work"],
  answer: 2
},
// ...existing code...
];


let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timerInterval;
let timeLeft = 30 * 60; // 30 minutes in seconds

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer() {
  timerEl.textContent = `Time Left: ${formatTime(timeLeft)}`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${formatTime(timeLeft)}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResult();
      speak("Time is up! The quiz has ended.");
    }
  }, 1000);
}

function showQuestion() {
  selectedOption = null;
  nextBtn.disabled = true;
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectOption(idx, btn);
    li.appendChild(btn);
    optionsEl.appendChild(li);
  });
  scoreEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  // Show/hide buttons
  if (currentQuestion === questions.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  } else {
    nextBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
  }
}

function selectOption(idx, btn) {
  selectedOption = idx;
  Array.from(optionsEl.querySelectorAll('button')).forEach(b => b.disabled = true);
  const isCorrect = idx === questions[currentQuestion].answer;
  btn.style.background = isCorrect ? '#28a745' : '#dc3545';
  if (isCorrect) {
    score++;
    speak("Correct! Well done.");
  } else {
    const correctAnswer = questions[currentQuestion].options[questions[currentQuestion].answer];
    speak("Incorrect. The correct answer is " + correctAnswer + ".");
  }
  nextBtn.disabled = false;
  submitBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  showQuestion();
};

submitBtn.onclick = showResult;

function showResult() {
  if (timerInterval) clearInterval(timerInterval);
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  submitBtn.style.display = 'none';
  scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
  speak(`Quiz completed. Your score is ${score} out of ${questions.length}.`);
  saveScoreHistory(score, questions.length);
  displayScoreHistory();
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  }
}

// Score history logic
function saveScoreHistory(score, total) {
  const history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
  const now = new Date();
  history.push({
    date: now.toLocaleString(),
    score: score,
    total: total
  });
  localStorage.setItem('scoreHistory', JSON.stringify(history));
}

function displayScoreHistory() {
  const historyList = document.getElementById('history-list');
  if (!historyList) return;
  const history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
  historyList.innerHTML = '';
  history.slice(-10).reverse().forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.date}: ${entry.score} / ${entry.total}`;
    historyList.appendChild(li);
  });
}

displayScoreHistory();
showQuestion();
startTimer();