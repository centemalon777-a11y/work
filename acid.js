const questions = [
   {
    question: "1. What is the pH of a neutral solution?",
    options: ["0", "7", "14", "1"],
    answer: 0
  },
  {
    question: "2. Which acid is found in vinegar?",
    options: ["Hydrochloric acid", "Citric acid", "Acetic acid", "Sulfuric acid"],
    answer: 2
  },
  {
    question: "3. Which base is used in soap making?",
    options: ["HCl", "NaOH", "H2SO4", "CH3COOH"],
    answer: 1
  },
  {
    question: "4. Which gas is released when acids react with metals?",
    options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"],
    answer: 1
  },
  {
    question: "5. What is a salt?",
    options: ["A type of acid", "A product of acid-base reaction", "Only NaCl", "A strong base"],
    answer: 1
  },
  {
    question: "6. Which of these is a strong acid?",
    options: ["HCl", "CH3COOH", "H2CO3", "HNO2"],
    answer:0
  },
  {
    question: "7. What is the pH range of acids?",
    options: ["0-6.9", "7", "7.1-14", "14-20"],
    answer: 0
  },
  {
    question: "8. Which indicator turns red in acid?",

options: ["Phenolphthalein", "Litmus", "Methyl orange", "Bromothymol blue"],
    answer: 1
  },
  {
    question: "9. What is the chemical name of table salt?",
    options: ["KCl", "NaOH", "NaCl", "CaCl2"],
    answer: 2
  },
  {
    question: "10. Which acid is used in car batteries?",
    options: ["Hydrochloric acid", "Sulfuric acid", "Nitric acid", "Acetic acid"],
    answer: 1
  },
  {
    question: "11. Which base is found in antacids?",
    options: ["H2SO4", "Mg(OH)2", "NaCl", "CH3COOH"],
    answer: 1
  },
  {
    question: "12. What happens to blue litmus in acid?",
    options: ["Stays blue", "Turns red", "Turns green", "No change"],
    answer: 1
  },
  {
    question: "13. Which of the following is not a base?",
    options: ["NaOH", "KOH", "HCl", "Ca(OH)2"],
    answer: 2
  },
  {
    question: "14. Which of these is an organic acid?",
    options: ["Hydrochloric acid", "Acetic acid", "Sulfuric acid", "Nitric acid"],
    answer: 1
  },
  {
    question: "15. Which compound is used to neutralize stomach acid?",
    options: ["NaCl", "NaHCO3", "H2SO4", "NH4Cl"],
    answer: 1
  },
  {
    question: "16. A substance with pH 13 is likely to be?",

options: ["A weak base", "A neutral substance", "A strong acid", "A strong base"],
    answer: 3
  },
  {
    question: "17. What do you call a solution that resists changes in pH?",
    options: ["Indicator", "Buffer", "Salt", "Acid"],
    answer: 1
  },
  {
    question: "18. Which salt is formed from HCl and NaOH?",
    options: ["KCl", "NaCl", "CaCl2", "NH4Cl"],
    answer: 1
  },
  {
    question: "19. Which acid is present in lemons?",
    options: ["Lactic acid", "Citric acid", "Acetic acid", "Formic acid"],
    answer: 1
  },
  {
    question: "20. What is formed when an acid reacts with a base?",
    options: ["Water only", "Salt only", "Salt and water", "Gas and water"],
    answer: 2
  },
  {
    question: "21. Which base is used in toothpaste?",
    options: ["NaOH", "KOH", "Ca(OH)2", "Mg(OH)2"],
    answer: 2
  },
  {
    question: "22. What is the main use of indicators?",
    options: ["To change pH", "To color solutions", "To test acidity or alkalinity", "To form salts"],
    answer: 2
  },
  {
    question: "23. What does the pH scale measure?",
    options: ["Concentration", "Temperature", "Acidity/alkalinity", "Volume"],
    answer: 2
  },
  {

question: "24. Ammonia is a?",
    options: ["Strong acid", "Weak base", "Salt", "Indicator"],
    answer: 1
  },
  {
    question: "25. Which acid is used in food preservation?",
    options: ["Formic acid", "Citric acid", "Benzoic acid", "Acetic acid"],
    answer: 2
  },
  {
    question: "26. What is the pH of pure water?",
    options: ["6", "7", "8", "5"],
    answer: 1
  },
  {
    question: "27. Which salt is used to soften hard water?",
    options: ["NaCl", "Na2CO3", "KCl", "MgSO4"],
    answer: 1
  },
  {
    question: "28. Which of these is a property of acids?",
    options: ["Soapy feel", "Bitter taste", "Sour taste", "Slippery"],
    answer: 2
  },
  {
    question: "29. What is a neutralization reaction?",
    options: ["Base + Metal", "Salt + Water", "Acid + Base → Salt + Water", "Acid + Salt"],
    answer: 2
  },
  {
    question: "30. Which compound is an example of a salt?",
    options: ["NaCl", "NaOH", "H2SO4", "NH3"],
    answer: 0
  }
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