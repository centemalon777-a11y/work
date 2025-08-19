const questions = [
 { question: "1. What is friction?", options: ["A push", "A pull", "A resistive force", "An electric force"],
   answer: 2},
  { question: "2. Friction always acts:", options: ["In the direction of motion", "Perpendicular to motion", "Opposite to motion", "Randomly"],
     answer: 2 },
  { question: "3. Which surface produces more friction?", options: ["Smooth", "Rough", "Wet", "Oily"],
     answer: 1 },
  { question: "4. Which type of friction is the highest?", options: ["Static", "Sliding", "Rolling", "Fluid"],
    answer: 0 },
  { question: "5. Lubricants are used to:", options: ["Increase friction", "Cause fire", "Reduce friction", "Cool surfaces"],
     answer: 2 },
  { question: "6. The SI unit of frictional force is:", options: ["Joule", "Newton", "Pascal", "Watt"],
     answer: 1 },
  { question: "7. Friction is necessary for:", options: ["Walking", "Flying", "Floating", "Evaporation"],
     answer: 0 },
  { question: "8. Which factor does NOT affect friction?", options: ["Weight", "Surface type", "Color", "Area of contact"],
    answer: 2 },
  { question: "9. Ball bearings help reduce friction by:", options: ["Increasing surface area", "Increasing mass", "Changing sliding to rolling", "Creating heat"],
    answer: 2 },
  { question: "10. Friction produces:", options: ["Cold", "Heat", "Sound", "Light"],
    answer: 1 },
  { question: "11. The force that opposes motion through fluids is called:", options: ["Drag", "Static", "Rolling", "Kinetic"],
    answer: 0 },
  { question: "12. Which friction occurs when an object just begins to move?", options: ["Sliding", "Static", "Rolling", "Fluid"],
     answer: 1 },
  { question: "13. Less friction means:", options: ["More resistance", "Less heat", "Less efficiency", "More grip"],
     answer: 1 },
  { question: "14. Which material reduces friction best?", options: ["Rubber", "Wood", "Oil", "Sandpaper"],
     answer: 2 },
  { question: "15. Friction in machines causes:", options: ["Sparks", "Wear and tear", "Color change", "Electricity"],
     answer: 1 },
  { question: "16. Friction is caused by:", options: ["Magnetism", "Surface irregularities", "Gravity", "Electric force"],
     answer: 1 },
  { question: "17. What increases friction?", options: ["Lubricant", "Smooth surface", "Rough surface", "Water"],
     answer: 2 },
  { question: "18. Friction can be reduced by:", options: ["Greasing", "Pressing hard", "Making it rough", "Increasing weight"],
    answer: 0 },
  { question: "19. Static friction is greater than:", options: ["Sliding friction", "Drag", "Normal force", "None"], answer: 0 },
  { question: "20. Which is a disadvantage of friction?", options: ["Walking", "Writing", "Wearing of tires", "Lighting a match"],
     answer: 2 },
  { question: "21. Without friction, what would be difficult?", options: ["Sliding", "Flying", "Walking", "Boiling"], answer: 2 },
  { question: "22. Shoes with more tread increase:", options: ["Friction", "Speed", "Mass", "Drag"], answer: 0 },
  { question: "23. Friction is considered a:", options: ["Conservative force", "Non-conservative force", "Magnetic force", "Balanced force"],
    answer: 1 },
  { question: "24. Friction in the air is also called:", options: ["Resistance", "Air friction", "Air drag", "All of the above"],
     answer: 3 },
  { question: "25. Increasing weight on a surface usually:", options: ["Reduces friction", "Increases friction", "No effect", "Cancels friction"],
     answer: 1 },

{ question: "26. The direction of friction is:", options: ["Forward", "Sideways", "Against motion", "Toward center"],
  answer: 2 },
  { question: "27. Friction is useful in:", options: ["Braking systems", "Electricity", "Boiling", "Evaporation"],
    answer: 0 },
  { question: "28. Smooth surfaces have:", options: ["High friction", "Zero friction", "Low friction", "No effect"],
     answer: 2 },
  { question: "29. Sand is used on icy roads to:", options: ["Melt ice", "Reduce speed", "Increase friction", "Cool surface"],
     answer: 2 },
  { question: "30. Friction converts motion energy into:", options: ["Sound", "Light", "Heat", "Magnetism"],
    answer: 2 }

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