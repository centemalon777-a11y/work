const questions = [
     {
        question: "1. What is the general formula of alkanes?",
        options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnH2nO2"],
        answer: 1
      },
      {
        question: "2. Which of these is an aromatic compound?",
        options: ["Ethane", "Propane", "Benzene", "Butene"],
        answer: 2
      },
      {
        question: "3. Which functional group is present in alcohols?",
        options: ["-OH", "-COOH", "-CHO", "-NH2"],
        answer: 0
      },
      {
        question: "4. Ethene is an example of a(n)...",
        options: ["Alkyne", "Alkane", "Alkene", "Arene"],
        answer: 2
      },
      {
        question: "5. Which compound is a carboxylic acid?",

options: ["Hydrochloric acid", "Sulfuric acid", "Acetic acid", "Formic acid"],
        answer: 2
      },
      {
        question: "13. What is the product of esterification?",
        options: ["Acid and base", "Ester and water", "Salt and water", "Alcohol"],
        answer: 1
      },
      {
        question: "14. Which of the following is not a hydrocarbon?",
        options: ["CH4", "C2H6", "CH3OH", "C3H8"],
        answer: 2
      },
      {
        question: "15. Ethanol can be oxidized to?",
        options: ["Methane", "Ethanoic acid", "Propane", "Ethene"],
        answer: 1
      },
      {
        question: "16. Which is a secondary alcohol?",
        options: ["CH3OH", "CH3CH2OH", "CH3CHOHCH3", "CH3CH2CH2OH"],
        answer: 2
      },
      {
        question: "17. Which group is present in amines?",
        options: ["-OH", "-NH2", "-COOH", "-CHO"],
        answer: 1
      },
      {
        question: "18. But-2-yne has how many triple bonds?",
        options: ["1", "2", "3", "0"],
        answer: 0
      },
      {
        question: "19. Cracking of hydrocarbons produces?",
        options: ["Alcohol", "Smaller alkanes/alkenes", "Ester", "Acid"],
        answer: 1
      },
      {
        question: "20. What is the first member of alkyne series?",

options: ["CH3OH", "CH3COOH", "CH3CH2NH2", "CH3CHO"],
        answer: 1
      },
      {
        question: "6. What is isomerism?",
        options: [
          "Compounds with same molecular formula but different structure",
          "Different compounds",
          "Same structure and properties",
          "Same elements only"
        ],
        answer: 0
      },
      {
        question: "7. Methane belongs to which homologous series?",
        options: ["Alkene", "Alkyne", "Alcohol", "Alkane"],
        answer: 3
      },
      {
        question: "8. Which compound can undergo addition reaction?",
        options: ["Ethane", "Ethene", "Methane", "Propane"],
        answer: 1
      },
      {
        question: "9. What is the IUPAC name of CH3-CH2-CH3?",
        options: ["Propene", "Propyne", "Propane", "Propanol"],
        answer: 2
      },
      {
        question: "10. What is the functional group of aldehydes?",
        options: ["-COOH", "-CHO", "-OH", "-NH2"],
        answer: 1
      },
      {
        question: "11. Which compound is unsaturated?",
        options: ["Methane", "Butane", "Ethene", "Propane"],
        answer: 2
      },
      {
        question: "12. Which acid is found in vinegar?",

options: ["Methyne", "Ethyne", "Propyne", "Butyne"],
        answer: 1
      },
      {
        question: "21. Which is a ketone?",
        options: ["CH3CHO", "CH3COCH3", "CH3OH", "CH3COOH"],
        answer: 1
      },
      {
        question: "22. What happens in hydrogenation of alkenes?",
        options: ["Add hydrogen", "Remove hydrogen", "Add halogen", "Oxidize"],
        answer: 0
      },
      {
        question: "23. Polymerization involves?",
        options: ["Breaking bonds", "Forming large molecules", "Combustion", "Hydrolysis"],
        answer: 1
      },
      {
        question: "24. Which is NOT a characteristic of homologous series?",
        options: ["Same functional group", "Same chemical properties", "Different functional group", "Gradation in physical properties"],
        answer: 2
      },
      {
        question: "25. Ethanol can be produced by?",
        options: ["Cracking", "Fermentation", "Neutralization", "Saponification"],
        answer: 1
      },
      {
        question: "26. What is saponification?",
        options: ["Soap formation", "Hydrogenation", "Polymerization", "Oxidation"],
        answer: 0
      },
      {
        question: "27. Which of these is a monomer?",

options: ["Polyethylene", "Ethene", "Nylon", "Teflon"],
        answer: 1
      },
      {
        question: "28. What is the formula of butanoic acid?",
        options: ["C4H10", "C4H8O2", "C4H6", "C4H10O"],
        answer: 1
      },
      {
        question: "29. Which compound has a sweet smell and is used in perfumes?",
        options: ["Aldehyde", "Alcohol", "Ester", "Alkane"],
        answer: 2
      },
      {
        question: "30. Toluene is also known as?",
        options: ["Methylbenzene", "Ethylbenzene", "Phenol", "Benzyl alcohol"],
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