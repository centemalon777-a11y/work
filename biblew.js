const questions = [
   { question: "Who built the ark?", options: ["Noah", "Moses", "David", "Abraham"], answer: 0 },
      { question: "How many disciples did Jesus have?", options: ["10", "12", "14", "7"], answer: 1 },
      { question: "Where was Jesus born?", options: ["Nazareth", "Jerusalem", "Bethlehem", "Galilee"], answer: 2 },

{ question: "Who betrayed Jesus?", options: ["Peter", "Judas", "John", "Paul"], answer: 1 },
      { question: "What is the first book of the Bible?", options: ["Exodus", "Psalms", "Genesis", "Matthew"], answer: 2 },
      { question: "How many days did God take to create the world?", options: ["5", "6", "7", "8"], answer: 1 },
      { question: "Who led the Israelites out of Egypt?", options: ["Joshua", "Moses", "Aaron", "Joseph"], answer: 1 },
      { questionq: "What is the last book of the Bible?", options: ["Revelation", "Genesis", "Malachi", "Acts"], answer: 0 },
      { question: "Who was swallowed by a great fish?", options: ["Jonah", "Elijah", "Daniel", "Peter"], answer: 0 },
      { question: "What did Jesus feed the 5000 with?", options: ["Bread & fish", "Meat & wine", "Fruits", "Water"], answer: 0 },
      
      { question: "What is the shortest verse in the Bible?", options: ["Jesus wept.", "Pray always.", "Love God.", "God is love."], answer: 0 },
      { question: "Who wrote most of the New Testament?", options: ["Paul", "Peter", "John", "Matthew"], answer: 0 },
      { question: "Who denied Jesus three times?", options: ["Judas", "Thomas", "Peter", "James"], answer: 2 },

{ question: "What was the first miracle of Jesus?", options: ["Healing blind", "Walking on water", "Turning water to wine", "Raising Lazarus"], answer: 2 },
      { question: "Who killed Goliath?", options: ["Saul", "David", "Solomon", "Samson"], answer: 1 },
      { question: "Which apostle was a tax collector?", options: ["James", "Matthew", "Andrew", "Bartholomew"], answer: 1 },
      { question: "What did God create on the first day?", options: ["Earth", "Man", "Light", "Sun"], answer: 2 },
      { uestionq: "What is the Bible's longest chapter?", options: ["Psalm 119", "John 3", "Genesis 1", "Psalm 23"], answer: 0 },
      { question: "How many people were saved in the ark?", options: ["4", "6", "8", "10"], answer: 2 },
      { question: "What river did Jesus get baptized in?", options: ["Jordan", "Nile", "Tigris", "Euphrates"], answer: 0 },
      { question: "Who is the mother of Jesus?", options: ["Martha", "Mary", "Elizabeth", "Sarah"], answer: 1 },
      { question: "What is the first commandment?", options: ["Do not kill", "Honor parents", "No other gods", "Keep Sabbath"], answer: 2 },
      { question: "Who received the 10 commandments?", options: ["Abraham", "Moses", "David", "Isaiah"], answer: 1 },
      { question: "Which book has the story of creation?", options: ["Exodus", "Genesis", "Psalms", "Romans"], answer: 1 },
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