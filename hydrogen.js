const questions = [
     { question: "1. What is the atomic number of hydrogen?", options: ["0", "1", "2", "3"], answer: 1 },
      { question: "2. What is the symbol of hydrogen?", options: ["Hy", "Hg", "H", "He"], answer: 2 },
      { question: "3. Hydrogen is the ___ element on the periodic table.", options: ["Last", "First", "Second", "Third"], answer: 1 },
      { question: "4. What type of gas is hydrogen at room temperature?", options: ["Liquid", "Solid", "Gas", "Plasma"], answer: 2 },

{ question: "5. Hydrogen combines with oxygen to form ___?", options: ["CO2", "H2O", "NH3", "NaCl"], answer: 1 },
      { question: "6. What is the molecular formula of hydrogen?", options: ["H", "H2", "H3", "H4"], answer: 1 },
      { question: "7. Which of these is a use of hydrogen?", options: ["Fuel", "Salt", "Fertilizer", "Plastic"], answer: 0 },
      { question: "8. Hydrogen is ___ in air.", options: ["Heavier", "Lighter", "Equal", "Solid"], answer: 1 },
      { question: "9. Hydrogen is ___ in water.", options: ["Soluble", "Insoluble", "Reactive", "Neutral"], answer: 1 },
      { question: "10. What is the most abundant element in the universe?", options: ["Oxygen", "Hydrogen", "Carbon", "Nitrogen"], answer: 1 },
      { question: "11. Who discovered hydrogen?", options: ["Lavoisier", "Cavendish", "Mendeleev", "Bohr"], answer: 1 },
      { question: "12. Hydrogen is used in the manufacture of?", options: ["Ammonia", "Baking soda", "Bleach", "Sugar"], answer: 0 },
      { question: "13. Hydrogen can act as a ___ agent.", options: ["Reducing", "Oxidizing", "Neutral", "Catalyst"], answer: 0 },
      { question: "14. Hydrogen is placed in group ___ of the periodic table.", options: ["1", "2", "17", "18"], answer: 0 },

{ question: "15. What is the color of hydrogen flame?", options: ["Blue", "Red", "Colorless", "Green"], answer: 2 },
      { question: "16. Hydrogen is produced by reaction of metal with?", options: ["Base", "Acid", "Salt", "Alcohol"], answer: 1 },
      { question: "17. What is the boiling point of hydrogen?", options: ["-252°C", "0°C", "100°C", "25°C"], answer: 0 },
      { question: "18. What is the role of hydrogen in hydrogenation?", options: ["Oxidize", "Reduce", "Freeze", "Evaporate"], answer: 1 },
      { question: "19. Hydrogen is used in fuel cells to generate?", options: ["Oil", "Gas", "Electricity", "Plastic"], answer: 2 },
      { question: "20. Hydrogen reacts explosively with?", options: ["Carbon", "Helium", "Oxygen", "Iron"], answer: 2 },
      { question: "21. What is the valency of hydrogen?", options: ["1", "2", "0", "3"], answer: 0 },
      { question: "22. What type of bond is found in H2?", options: ["Ionic", "Metallic", "Covalent", "Hydrogen"], answer: 2 },
      { question: "23. Hydrogen is used in ___ industry.", options: ["Textile", "Pharmaceutical", "Petroleum", "All of the above"], answer: 3 },
      { question: "24. Hydrogen has ___ isotope(s).", options: ["1", "2", "3", "4"], answer: 2 },

{ question: "25. Heavy hydrogen is called?", options: ["Protium", "Deuterium", "Tritium", "Isotope"], answer: 1 },
      { question: "26. Radioactive isotope of hydrogen is?", options: ["Protium", "Deuterium", "Tritium", "None"], answer: 2 },
      { question: "27. Hydrogen gas is ___ in nature.", options: ["Stable", "Inert", "Flammable", "Cold"], answer: 2 },
      { question: "28. Electrolysis of water produces hydrogen at which electrode?", options: ["Anode", "Cathode", "Both", "None"], answer: 1 },
      { question: "29. What is formed when hydrogen burns in air?", options: ["Smoke", "Steam", "Carbon", "Ice"], answer: 1 },
      { question: "30. What is the bond angle in H2 molecule?", options: ["90°", "180°", "109.5°", "120°"], answer: 1 }
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