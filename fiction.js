const questions = [
    { question: "1. What is friction?", 
      options:["A force that aids motion", "A force that opposes motion", "Gravitational pull", "Magnetic force"], 
      answer: 1 },
      { question: "2. Which type of friction is the strongest?", 
        options:  ["Static", "Sliding", "Rolling", "Fluid"],
        answer:   0 },
      { question: "3. What reduces friction?", 
      options:  ["Oil or grease", "Sand", "Weight", "Rough surface"],
       answer: 0 },
      { question: "4. Friction always acts in which direction?",
         options:  ["Direction of motion", "Opposite to motion", "Upward", "Downward"], 
         answer: 1 },

{ question: "5. What type of friction acts on a stationary object?", 
  options:  ["Rolling", "Sliding", "Static", "Fluid"], answer: 2 },
      { question: "6. Which of the following experiences the least friction?",
         options:  ["Sliding a box", "Rolling a ball", "Dragging a chair", "Pulling a rug"], answer: 1 },
      { question: "7. Friction converts kinetic energy into what?",
        options:  ["Sound", "Electricity", "Heat", "Light"], answer: 2 },
      { question: "8. Which surface creates more friction?",
        options:  ["Glass", "Concrete", "Ice", "Smooth metal"], answer: 1 },
      { question: "9. Which device is used to reduce friction in machines?",
         options:  ["Brake", "Bearing", "Pulley", "Gear"], answer: 1 },
      { question: "10. Which type of friction acts on objects moving through water?", 
        options:  ["Static", "Sliding", "Fluid", "Rolling"], answer: 2 },
      { question: "11. Friction can be helpful in which situation?", 
        options:  ["Ice skating", "Walking", "Swimming", "Air travel"], answer: 1 },
      { question: "12. What happens to friction if surfaces are smoother?", 
        options:  ["Increases", "No change", "Decreases", "Becomes infinite"], answer: 2 },
      { question: "13. Lubricants are used to?", 
        options:  ["Increase friction", "Decrease friction", "Stop movement", "Create motion"], answer: 1 },

{ question: "14. What type of force is friction?", 
  options:  ["Contact force", "Non-contact force", "Gravitational force", "Nuclear force"], answer: 0 },
      { question: "15. Which of these is a disadvantage of friction?", 
        options: ["Helps us walk", "Wears out tires", "Lights a match", "Helps hold nails"], answer: 1 },
      { question: "16. When you stop pedaling a bicycle, it slows down due to?",
         options: ["Gravity", "Inertia", "Friction", "Acceleration"], answer: 2 },
      { question: "17. Which factor does NOT affect friction?",
        options: ["Weight", "Speed", "Surface roughness", "Area of contact"], answer: 3 },
      { question: "18. Why do car tires have treads?", 
        options: ["To reduce speed", "To increase friction", "For decoration", "To increase air flow"], answer: 1 },
      { question: "19. Why is it difficult to walk on ice?",
         options:["Too much gravity", "Lack of friction", "Cold temperature", "Hard surface"], answer: 1 },
      { question: "20. Which type of friction is the weakest?",
        options:["Static", "Rolling", "Sliding", "Fluid"], answer: 1 },
      { question: "21. What is the unit of force including friction?",
         options: ["Joule", "Pascal", "Newton", "Watt"], answer: 2 },
      { question: "22. Shoes have soles with patterns to?",
         options: ["Slide better", "Reduce weight", "Increase friction", "Look stylish"], answer: 2 },
      { question: "23. How does increasing weight affect friction?",
         options: ["Reduces it", "Increases it", "No effect", "Eliminates it"], answer: 1 },
      { question: "24. Why are ball bearings used in machines?",
        options:["Increase friction", "Increase speed", "Reduce wear", "Reduce friction"], answer: 3 },
      { question: "25. What kind of friction do airplanes face?",
        options: ["Static", "Rolling", "Sliding", "Fluid"], answer: 3 },
      { question: "26. When two objects are pressed harder, friction?",
         options: ["Increases", "Decreases", "Stays same", "Disappears"], answer: 0 },
      { question: "27. What happens to friction in a vacuum?",
         options: ["Increases", "Remains", "Is zero", "Doubles"], answer: 2 },
      { question: "28. In which condition does sliding friction occur?",
        options: ["When object is still", "When object rolls", "When object slides", "When object falls"], answer: 2 },
      { question: "29. A smoother surface usually results in?",
         options: ["More friction", "Less friction", "No friction", "Slippery motion"], answer: 1 },
      { question: "30. Without friction, we would?",
         options:["Walk easily", "Drive safely", "Slide uncontrollably", "Stick to surfaces"], answer: 2 },
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