const questions = [
   { 
    question: "1. What is the SI unit of work?",
     options: ["Newton", "Joule", "Watt", "Pascal"],
      answer: 1
     },
  { question: "2. What is the formula for kinetic energy?", options: ["mv", "1/2mv²", "mg", "mv²"], 
    answer: 1
   },
  { question: "3. Power is defined as:", options: ["Force × Distance", "Work × Time", "Work / Time", "Energy × Time"], 
    answer: 2
},
{ question: "4. The unit of power is:", options: ["Joule", "Watt", "Newton", "Pascal"],
   answer: 1 
  },
  { question: "5. 1 horsepower is equal to:", options: ["746 watts", "1000 watts", "500 watts", "250 watts"], answer: 0 },
  { question: "6. Kinetic energy depends on:", options: ["Mass and velocity", "Mass and acceleration", "Force and displacement", "Power and time"], answer: 0 },
  { question: "7. Potential energy is the energy due to:", options: ["Motion", "Position", "Temperature", "Pressure"], answer: 1 },
  { question: "8. Law of conservation of energy says:", options: ["Energy is lost", "Energy is constant", "Energy is created", "Energy is pressure"], answer: 1 },
  { question: "9. A machine's efficiency is always less than:", options: ["100%", "90%", "80%", "70%"], answer: 0 },
  { question: "10. Mechanical advantage is:", options: ["Load ÷ Effort", "Effort ÷ Load", "Work × Time", "Power × Time"], answer: 0 },
  { question: "11. Work done against gravity is:", options: ["Potential energy", "Kinetic energy", "Friction", "Heat"], answer: 0 },
  { question: "12. Power can be increased by:", options: ["Doing work faster", "More force", "Slow speed", "Smaller mass"], answer: 0 },
  { question: "13. Watt equals:", options: ["1 J/s", "1 N", "1 m/s", "1 N·m"], answer: 0 },
  { question: "14. Energy in a spring is:", options: ["Elastic PE", "Kinetic", "Chemical", "Heat"], answer: 0 },
  { question: "15. Friction does what work?", options: ["Negative", "Positive", "Zero", "Infinite"], answer: 0 },
  { question: "16. GPE depends on:", options: ["mgh", "mv", "ma", "t"], answer: 0 },
  { question: "17. Isolated system energy is:", options: ["Constant", "Zero", "Increasing", "Decreasing"], answer: 0 },
  { question: "18. Work-energy theorem relates:", options: ["Work & KE", "Work & PE", "Power & Time", "Force & Mass"], answer: 0 },
  { question: "19. Energy in a moving body is:", options: ["Kinetic", "Potential", "Elastic", "Heat"], answer: 0 },
  { question: "20. 100W bulb uses energy in 1 hr:", options: ["360,000 J", "60,000 J", "1000 J", "10,000 J"], answer: 0 },
  { question: "21. Energy of stretched rubber band:", options: ["Elastic PE", "Chemical", "Heat", "GPE"], answer: 0 },
  { question: "22. No work is done if:", options: ["No displacement", "No force", "No time", "No mass"], answer: 4 },
  { question: "23. Which has more power?", options: ["Fast lifter", "Slow lifter", "Same", "None"], answer: 4 },
  { question: "24. Energy that depends on position:", options: ["Potential", "Kinetic", "Heat", "Elastic"], answer: 0 },
  { question: "25. Work formula:", options: ["Force × Distance", "Force ÷ Time", "Mass × Accel", "Power × Time"], answer: 0 },
  { question: "26. Efficiency is:", options: ["Output/Input × 100%", "Input/Output", "Load/Effort", "Work × Time"], answer: 0 },
  { question: "27. SI unit of energy:", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 0 },
  { question: "28. Positive work means:", options: ["Force aids motion", "Force opposes", "No work", "No force"], answer: 0 },
  { question: "29. Motion with no energy lost:", options: ["Ideal", "Friction", "Real", "Elastic"], answer: 0 },
  { question: "30. Work done by gravity is:", options: ["Positive/Negative", "Always Zero", "Never done", "Friction"], answer: 0 }
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