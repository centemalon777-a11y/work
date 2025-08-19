const questions = [
 // ...existing code...
// Add these to your questions array
{
  question: "Which of the following is NOT a simple machine?",
  options: ["Lever", "Pulley", "Inclined Plane", "Motor"],
  answer: 3
},
{
  question: "The ratio of output force to input force in a machine is called:",
  options: ["Efficiency", "Mechanical Advantage", "Velocity Ratio", "Load"],
  answer: 1
},
{
  question: "A seesaw is an example of which type of lever?",
  options: ["First class", "Second class", "Third class", "Fourth class"],
  answer: 0
},
{
  question: "Which simple machine is used to lift a flag on a flagpole?",
  options: ["Wheel and axle", "Pulley", "Lever", "Inclined plane"],
  answer: 1
},
{
  question: "The efficiency of a machine is always:",
  options: ["100%", "Less than 100%", "More than 100%", "Zero"],
  answer: 1
},
{
  question: "A wheelbarrow is an example of a:",
  options: ["First class lever", "Second class lever", "Third class lever", "Pulley"],
  answer: 1
},
{
  question: "Which of the following increases the mechanical advantage of a lever?",
  options: ["Shorter effort arm", "Longer effort arm", "Shorter load arm", "Both B and C"],
  answer: 3
},
{
  question: "The point about which a lever rotates is called:",
  options: ["Load", "Effort", "Fulcrum", "Pivot"],
  answer: 2
},
{
  question: "A fixed pulley changes the ______ of the force applied.",
  options: ["Magnitude", "Direction", "Both", "None"],
  answer: 1
},
{
  question: "Which machine is used to hold objects tightly together?",
  options: ["Screw", "Wedge", "Pulley", "Lever"],
  answer: 0
},
{
  question: "The work output of a machine is always ______ the work input.",
  options: ["Greater than", "Equal to", "Less than", "Unrelated to"],
  answer: 2
},
{
  question: "A pair of scissors is an example of:",
  options: ["First class lever", "Second class lever", "Third class lever", "Inclined plane"],
  answer: 0
},
{
  question: "Which of the following is a compound machine?",
  options: ["Knife", "Bicycle", "Ramp", "Pulley"],
  answer: 1
},
{
  question: "The mechanical advantage of an inclined plane increases when:",
  options: ["The slope is steeper", "The slope is gentler", "The length is shorter", "The height is greater"],
  answer: 1
},
{
  question: "A crowbar is used as a:",
  options: ["First class lever", "Second class lever", "Third class lever", "Pulley"],
  answer: 0
},
{
  question: "Which simple machine is found in a screw?",
  options: ["Inclined plane", "Lever", "Pulley", "Wedge"],
  answer: 0
},
{
  question: "The velocity ratio of a machine is defined as:",
  options: ["Input distance / Output distance", "Output force / Input force", "Input force / Output force", "Output distance / Input distance"],
  answer: 0
},
{
  question: "A nutcracker is an example of:",
  options: ["First class lever", "Second class lever", "Third class lever", "Inclined plane"],
  answer: 1
},
{
  question: "Which of the following is NOT a function of a machine?",
  options: ["Change the direction of a force", "Increase the speed of work", "Multiply force", "Create energy"],
  answer: 3
},
{
  question: "The efficiency of a perfect machine is:",
  options: ["0%", "50%", "100%", "More than 100%"],
  answer: 2
},
{
  question: "A fishing rod is an example of:",
  options: ["First class lever", "Second class lever", "Third class lever", "Pulley"],
  answer: 2
},
{
  question: "Which of the following is a force multiplier?",
  options: ["First class lever", "Second class lever", "Both A and B", "Third class lever"],
  answer: 2
},
{
  question: "A wedge is used to:",
  options: ["Lift objects", "Split objects", "Hold objects", "Rotate objects"],
  answer: 1
},
{
  question: "The load in a wheelbarrow is placed:",
  options: ["Between the effort and fulcrum", "At the fulcrum", "At the effort", "None of the above"],
  answer: 0
},
{
  question: "Which of the following is a distance multiplier?",
  options: ["Third class lever", "Second class lever", "First class lever", "Pulley"],
  answer: 0
},
{
  question: "A movable pulley provides:",
  options: ["No mechanical advantage", "Mechanical advantage of 2", "Mechanical advantage of 1", "Mechanical advantage of 0.5"],
  answer: 1
},
{
  question: "Which simple machine is used in an axe?",
  options: ["Wedge", "Lever", "Pulley", "Inclined plane"],
  answer: 0
},
{
  question: "The formula for efficiency is:",
  options: ["(Work output / Work input) x 100%", "(Work input / Work output) x 100%", "(Load / Effort) x 100%", "(Effort / Load) x 100%"],
  answer: 0
},
{
  question: "A doorknob is an example of:",
  options: ["Wheel and axle", "Pulley", "Lever", "Inclined plane"],
  answer: 0
},
{
  question: "Which of the following is a simple machine used to raise water from a well?",
  options: ["Pulley", "Lever", "Screw", "Wedge"],
  answer: 0
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