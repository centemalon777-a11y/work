 const questions = [
{ question: "1. Who created the modern periodic table?", options: ["Newton", "Mendeleev", "Dalton", "Bohr"], answer: 1 },
      { question: "2. What is the atomic number of Oxygen?", options: ["6", "7", "8", "9"], answer: 2 },
      { question: "3. Which element has the symbol 'Na'?", options: ["Nitrogen", "Sodium", "Neon", "Nickel"], answer: 1 },
{ question: "4. Group 18 elements are called?", options: ["Alkali metals", "Halogens", "Noble gases", "Transition metals"], answer: 2 },
      { question: "5. Which is the lightest element?", options: ["Helium", "Hydrogen", "Lithium", "Oxygen"], answer: 1 },
      { question: "6. Periods in the periodic table are?", options: ["Rows", "Columns", "Groups", "Shells"], answer: 0 },
      { question: "7. How many periods are there?", options: ["5", "6", "7", "8"], answer: 2 },
      { question: "8. What is the symbol for Iron?", options: ["Ir", "Fe", "I", "In"], answer: 1 },
      { question: "9. Which group contains alkali metals?", options: ["Group 1", "Group 2", "Group 17", "Group 18"], answer: 0 },
      { question: "10. What is the atomic number of Carbon?", options: ["4", "6", "8", "12"], answer: 1 },
      { question: "11. Which element is in Period 2, Group 17?", options: ["Fluorine", "Chlorine", "Bromine", "Iodine"], answer: 0 },
      { question: "12. Transition metals are found in which block?", options: ["s-block", "p-block", "d-block", "f-block"], answer: 2 },
      { question: "13. What is the most reactive metal?", options: ["Potassium", "Calcium", "Sodium", "Francium"], answer: 3 },

{ question: "14. Which element is liquid at room temperature?", options: ["Mercury", "Bromine", "Both", "None"], answer: 2 },
      { question: "15. What is the atomic number of Helium?", options: ["1", "2", "3", "4"], answer: 1 },
      { question: "16. Elements in the same group have?", options: ["Same mass", "Same number of protons", "Similar properties", "Different shells"], answer: 2 },
      { question: "17. Which element has 79 protons?", options: ["Silver", "Gold", "Platinum", "Copper"], answer: 1 },
      { question: "18. Which element is in Group 2, Period 3?", options: ["Magnesium", "Calcium", "Sodium", "Potassium"], answer: 0 },
      { question: "19. What is the symbol for Potassium?", options: ["P", "Pt", "Po", "K"], answer: 3 },
      { question: "20. Halogens are found in which group?", options: ["14", "15", "16", "17"], answer: 3 },
      { question: "21. What is the element with atomic number 26?", options: ["Iron", "Cobalt", "Nickel", "Zinc"], answer: 0 },
      { question: "22. What is the full name of 'Mg'?", options: ["Magnesium", "Manganese", "Mercury", "Magnetite"], answer: 0 },
      { question: "23. Which of these is a metalloid?", options: ["Silicon", "Oxygen", "Gold", "Helium"], answer: 0 },
{ question: "24. Which block contains noble gases?", options: ["s-block", "p-block", "d-block", "f-block"], answer: 1 },
      { question: "25. Which element is in Group 1, Period 3?", options: ["Sodium", "Potassium", "Magnesium", "Calcium"], answer: 0 },
      { question: "26. What is the symbol for lead?", options: ["Ld", "Pb", "Pl", "Pd"], answer: 1 },
      { question: "27. Atomic number of Neon?", options: ["8", "9", "10", "11"], answer: 2 },
      { question: "28. Which gas is used in light bulbs?", options: ["Oxygen", "Hydrogen", "Nitrogen", "Argon"], answer: 3 },
      { question: "29. Who arranged the elements by atomic number?", options: ["Dalton", "Mendeleev", "Moseley", "Bohr"], answer: 2 },
      { question: "30. Which is the last element in Period 2?", options: ["Oxygen", "Neon", "Fluorine", "Nitrogen"], answer: 1 }
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