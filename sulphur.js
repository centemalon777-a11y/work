 const questions = [
 { question: "1. What is the symbol of sulphur?", options: ["S", "Su", "Sl", "Sr"], answer: 0 },
      { question: "2. What is the atomic number of sulphur?", options: ["14", "16", "18", "20"], answer: 1 },
      { question: "3. What is the color of sulphur?", options: ["White", "Yellow", "Red", "Gray"], answer: 1 },
      { question: "4. Sulphur is a ___ non-metal.", options: ["Soft", "Brittle", "Hard", "Flexible"], answer: 1 },

{ question: "5. Sulphur dioxide is used as?", options: ["Fuel", "Bleaching agent", "Food", "Base"], answer: 1 },
      { question: "6. What is the chemical formula of sulphuric acid?", options: ["H2SO3", "H2SO4", "H2S", "SO3"], answer: 1 },
      { question: "7. Which group does sulphur belong to?", options: ["Group 14", "Group 15", "Group 16", "Group 17"], answer: 2 },
      { question: "8. Sulphur is found naturally in?", options: ["Crude oil", "Salt", "Gold", "Wood"], answer: 0 },
      { question: "9. What is the smell of hydrogen sulphide?", options: ["Sweet", "Rotten eggs", "No smell", "Fruity"], answer: 1 },
      { question: "10. What is the common oxidation state of sulphur in H2SO4?", options: ["+2", "+4", "+6", "-2"], answer: 2 },
      { question: "11. Sulphur is used in the manufacture of?", options: ["Plastic", "Rubber", "Steel", "Lime"], answer: 1 },
      { question: "12. Sulphur burns in air to form?", options: ["SO2", "H2S", "SO3", "H2O"], answer: 0 },
      { question: "13. What is the state of sulphur at room temperature?", options: ["Gas", "Liquid", "Solid", "Plasma"], answer: 2 },
      { question: "14. What is the molecular formula of rhombic sulphur?", options: ["S", "S2", "S6", "S8"], answer: 3 },

{ question: "15. Which acid causes acid rain with sulphur compounds?", options: ["HCl", "HNO3", "H2SO4", "CH3COOH"], answer: 2 },
      { question: "16. Sulphur dioxide reacts with water to form?", options: ["HCl", "H2SO3", "HNO3", "H2SO4"], answer: 1 },
      { question: "17. What is the boiling point of sulphur?", options: ["100°C", "200°C", "445°C", "600°C"], answer: 2 },
      { question: "18. What happens when sulphur is heated?", options: ["Evaporates", "Sublimes", "Melts and turns brown", "Freezes"], answer: 2 },
      { question: "19. Which is a sulphur-containing amino acid?", options: ["Methionine", "Lysine", "Glycine", "Leucine"], answer: 0 },
      { question: "20. Sulphur dioxide is ___ in nature.", options: ["Basic", "Neutral", "Acidic", "Amphoteric"], answer: 2 },
      { question: "21. How many allotropes does sulphur have?", options: ["1", "2", "4", "More than 4"], answer: 3 },
      { question: "22. Which gas causes choking during volcanic eruptions?", options: ["CO2", "SO2", "H2", "O2"], answer: 1 },
      { question: "23. Sulphur reacts with hydrogen to form?", options: ["HCl", "H2S", "HSO3", "SO3"], answer: 1 },

{ question: "24. The process of adding sulphur to rubber is called?", options: ["Plasticizing", "Sulphonation", "Vulcanization", "Sulfating"], answer: 2 },
      { question: "25. Sulphur is ___ conductor of electricity.", options: ["Good", "Excellent", "Poor", "Super"], answer: 2 },
      { question: "26. Sulphur can act as a ___ agent.", options: ["Reducing", "Oxidizing", "Catalyst", "Base"], answer: 0 },
      { question: "27. Which of these contains sulphur?", options: ["Chalk", "Gypsum", "Gunpowder", "Glass"], answer: 2 },
      { question: "28. Sulphur is obtained from?", options: ["Rocks", "Brimstone", "Limestone", "Air"], answer: 1 },
      { question: "29. What is the role of sulphur in fertilizers?", options: ["Color", "Acidity", "Growth", "Protein synthesis"], answer: 3 },
      { question: "30. Sulphur cycle occurs between?", options: ["Air and water", "Land, air and living things", "Sun and Earth", "Oceans only"], answer: 1 }
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