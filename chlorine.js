 const questions = [
      { question: "1. What is the symbol for chlorine?", options: ["Cl", "Ch", "C", "Ci"], answer: 0 },
      { question: "2. What is the atomic number of chlorine?", options: ["16", "17", "18", "19"], answer: 1 },
      { question: "3. What is the color of chlorine gas?", options: ["Colorless", "Greenish-yellow", "Red", "Blue"], answer: 1 },
      { question: "4. What happens when chlorine reacts with hydrogen?", options: ["Explodes in sunlight", "Becomes stable", "Turns red", "No reaction"], answer: 0 },
      { question: "5. Which organ does chlorine affect when inhaled?", options: ["Eyes", "Lungs", "Heart", "Kidney"], answer: 1 },
      { question: "6. What is bleaching powder’s chemical name?", options: ["NaClO", "Ca(OCl)₂", "KClO", "HClO"], answer: 1 },
      { question: "7. What is the molar mass of chlorine?", options: ["35.5 g/mol", "40 g/mol", "17 g/mol", "20 g/mol"], answer: 0 },
      { question: "8. What is the test for chlorine gas?", options: ["Turns limewater milky", "Turns red litmus blue", "Bleaches damp litmus", "Smells like eggs"], answer: 2 },
      { question: "9. Chlorine reacts with sodium to form?", options: ["NaOH", "NaCl", "NaClO", "Na2O"], answer: 1 },
      { question: "10. Which isotope of chlorine is most common?", options: ["Cl-35", "Cl-36", "Cl-37", "Cl-38"], answer: 0 },
      { question: "11. Chlorine is obtained from?", options: ["Air", "Water", "Salt", "Oil"], answer: 2 },
      { question: "12. Which of the following is used as disinfectant?", options: ["Cl2", "H2", "O2", "N2"], answer: 0 },
      { question: "13. What is the boiling point of chlorine?", options: ["-34°C", "0°C", "100°C", "-100°C"], answer: 0 },
      { question: "14. Chlorine was used as a weapon in which war?", options: ["WWI", "WWII", "Cold War", "Vietnam War"], answer: 0 },
      { question: "15. Chlorine is ___ than air.", options: ["Heavier", "Lighter", "Equal", "Same"], answer: 0 },
      { question: "16. Chlorine is produced by electrolysis of?", options: ["Water", "Brine", "Hydrogen", "Salt rock"], answer: 1 },
      { question: "17. The smell of chlorine is?", options: ["Sweet", "Pungent", "Odorless", "Fruity"], answer: 1 },
      { question: "18. Which vitamin is destroyed by chlorine?", options: ["A", "B", "C", "D"], answer: 2 },
      { question: "19. Chlorine forms an ion with what charge?", options: ["+1", "-1", "+2", "0"], answer: 1 },
      { question: "20. What is household bleach made from?", options: ["NaCl", "NaOCl", "KCl", "CaCl2"], answer: 1 },
      { question: "21. Chlorine is used in making which polymer?", options: ["PVC", "Polyester", "Nylon", "Teflon"],
        answer: 0 },
      { question: "22. Chlorine belongs to which group?", options: ["Alkali metals", "Halogens", "Noble gases", "Transition metals"], answer: 1 },
      { question: "23. Which state is chlorine at room temperature?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: 2 },
      { question: "24. Chlorine is used to?", options: ["Soften water", "Purify water", "Increase pH", "Boil water"], answer: 1 },
      { question: "25. What is the molecular formula of chlorine gas?", options: ["Cl", "Cl2", "ClO2", "ClO"], answer: 1 },
      { question: "26. Which acid is formed when chlorine dissolves in water?", options: ["Nitric acid", "Hydrochloric acid", "Sulfuric acid", "Carbonic acid"], answer: 1 },
      { question: "27. Chlorine is toxic to?", options: ["Bacteria", "Viruses", "Humans", "All of the above"], answer: 3 },
      { question: "28. Which compound contains chlorine?", options: ["NaCl", "KOH", "H2SO4", "CH4"], answer: 0 },
      { question: "29. What is the electron configuration of chlorine?", options: ["1s2 2s2 2p6 3s2 3p5", "1s2 2s2 2p6 3s2 3p6", "1s2 2s2 2p6 3s2 3p3", "1s2 2s2 2p6 3s1"], answer: 0 },
      { question: "30. What is the common oxidation state of chlorine?", options: ["+1", "-1", "+3", "0"], answer: 1 },
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