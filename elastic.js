const questions = [

      {
        question: "1. What is elasticity",
        options: ["Ability to resist heat", "Ability to conduct electricity", "Ability to return to original shape", "Ability to absorb water"],
        answer: 2
      },
      {
        question: "2. Which of these is most elastic?",
        options: ["Rubber", "Wood", "Clay", "Plastic"],
        answer: 0
      },
      {
        question: "3. What does Hooke's Law state?",
        options: ["Force is proportional to extension", "Mass is constant", "Energy is conserved", "Force is inversely related to extension"],
        answer: 0
      },
      {
        question: "4. The limit beyond which a material doesn’t return to its original shape is called?",
        options: ["Yield point", "Elastic limit", "Breaking point", "Extension limit"],
        answer: 1
      },
      {
        question: "5. Unit of Young’s modulus is?",
        options: ["N", "N/m", "Pa", "J"],
        answer: 2
      },
      {
        question: "6. Young’s modulus is defined as?",
        options: ["Stress × Strain", "Stress / Strain", "Strain / Stress", "Force × Area"],
        answer: 1
      },
      {
        question: "7. Which of these materials obeys Hooke’s Law best?",
        options: ["Rubber", "Steel", "Clay", "Lead"],
        answer: 1
      },
      {
        question: "8. A perfectly elastic body?",
        options: ["Retains shape", "Returns exactly to original shape", "Breaks under force", "Deforms permanently"],
        answer: 1
      },
      {
        question: "9. Strain has?",
        options: ["Units of N", "Units of m/s", "No units", "Units of kg"],
        answer: 2
      },
      {
        question: "10. Stress is defined as?",
        options: ["Force × Area", "Force / Area", "Area / Force", "Mass / Volume"],
        answer: 1
      },
      {
        question: "11. What is the property of a material that allows it to regain its original shape after being deformed by an external force?",
        options: ["Rigidity", "Ductility", "Elasticity", "Plasticity"],
        answer: 2
      },
      {
        question: "12. Which of the following materials is considered highly elastic?",
        options: ["Rubber", "Glass", "Steel", "Clay"],
        answer: 0
      },
      {
        question: "13. What is the ratio of the change in length of an object to its original length when subjected to a tensile force called?",
        options: ["Young's modulus", "Shear modulus", "Bulk modulus", "Strain"],
        answer: 3
      },
      {
        question: "14. Which type of stress occurs when two equal and opposite forces act tangentially to each other on a material?",
        options: ["Tensile stress", "Compressive stress", "Shear stress", "Bulk stress"],
        answer: 2
      },
      {
        question: "15. Which type of deformation occurs when a material's length increases under the influence of tensile stress?",
        options: ["Tensile deformation", "Compressive deformation", "Shear deformation", "Plastic deformation"],
        answer: 0
      },
      {
        question: "16. Which of the following materials would have the highest Young's modulus value?",
        options: ["Rubber", "Steel", "Glass", "Plastic"],
        answer: 1
      },
      {
        question: "17. What is the term for the point on a stress-strain curve where a material undergoes permanent deformation without any increase in stress?",
        options: ["Elastic limit", "Yield point", "Fracture point", "Breaking point"],
        answer: 1
      },
      {
        question: "18. Which type of deformation occurs when a material's length decreases under the influence of compressive stress?",
        options: ["Tensile deformation", "Compressive deformation", "Shear deformation", "Elastic deformation"],
        answer: 1
      },
      {
        question: "19. What is the measure of a material's resistance to shearing forces called?",
        options: ["Young's modulus", "Shear modulus", "Bulk modulus", "Poisson's ratio"],
        answer: 1
      },
      {
        question: "20. Which of the following is a measure of the fractional change in volume of a material under hydrostatic stress?",
        options: ["Young's modulus", "Shear modulus", "Bulk modulus", "Poisson's ratio"],
        answer: 2
      },
      {
        question: "21. Tensile strain is equal to:",
        options: ["Force per unit area", "Force per unit volume", "Extension per unit length", "Force per unit length"],
        answer: 2
      },
      {
        question: "22. Hooke's law states that:",
        options: ["The extension is proportional to the load when the elastic limit is not exceeded", "The extension is inversely proportional to the load when the elastic limit is not exceeded", "The extension is independent of the load when the elastic limit is not exceeded", "Load is dependent on extension"],
        answer: 0
      },
      {
        question: "23. Dimensions of strain are:",
        options: ["[L]", "[M][L]^{-1}[T]^{-2}", "[L]^{-1}", "It's a dimensionless quantity"],
        answer: 3
      },
      {
        question: "24. At the 'yield point' of a copper wire:",
        options: ["The load hasn't exceeded the elastic limit yet; so, Hooke's law applies", "The load has already exceeded the elastic limit and the material has become plastic", "Even the plastic stage has passed and the wire has snapped already", "Like Brass and Bronze, Copper has no yield point"],
        answer: 1
      },
      {
        question: "25. Substances that elongate considerably and undergo plastic deformation before they break are known as:",
        options: ["Brittle substances", "Breakable substances", "Ductile substances", "Elastic substances"],
        answer: 2
      },
      { question: "26. Young’s modulus is defined as?", 
        options: ["Stress × Strain", "Stress / Strain", "Strain / Stress", "Force × Area"], 
        answer: 1
       },
      { question: "27. Which of these materials obeys Hooke’s Law best?",
         options: ["Rubber", "Steel", "Clay", "Lead"],
         answer: 1
        },
      { question: "28. A perfectly elastic body?", 
        options: ["Retains shape", "Returns exactly to original shape", "Breaks under force", "Deforms permanently"],
        answer: 1
      },
      { question: "29. Strain has?", 
        options: ["Units of N", "Units of m/s", "No units", "Units of kg"], 
        answer: 2 
      },
      { question: "30. Stress is defined as?",
         options: ["Force × Area", "Force / Area", "Area / Force", "Mass / Volume"],
         answer: 1 },
      // Add 20 more simple sample questions
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