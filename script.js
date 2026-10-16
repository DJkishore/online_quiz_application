const questions = [
  {
    category: "WEB BASICS",
    question: "Which language is used to structure the content of a web page?",
    options: ["CSS", "HTML", "JavaScript", "SQL"],
    answer: 1,
    explanation: "HTML defines the structure and content of a web page."
  },
  {
    category: "CSS",
    question: "Which CSS property changes the text colour?",
    options: ["font-style", "background-color", "color", "text-align"],
    answer: 2,
    explanation: "The color property sets the foreground colour of text."
  },
  {
    category: "JAVASCRIPT",
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["const", "let", "static", "define"],
    answer: 1,
    explanation: "let declares a block-scoped variable whose value can be reassigned."
  },
  {
    category: "WEB BASICS",
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Output Method", "Digital Ordinance Model", "Document Oriented Mode"],
    answer: 0,
    explanation: "DOM stands for Document Object Model, a programming interface for HTML and XML documents."
  },
  {
    category: "JAVASCRIPT",
    question: "Which method selects an element by its ID in JavaScript?",
    options: ["document.queryAll()", "document.getElementById()", "document.getByClass()", "window.selectId()"],
    answer: 1,
    explanation: "document.getElementById() returns the element with the specified ID."
  },
  {
    category: "CSS",
    question: "Which layout system is designed for arranging items in rows or columns?",
    options: ["Flexbox", "SQL", "JSON", "DOM"],
    answer: 0,
    explanation: "CSS Flexbox is a one-dimensional layout system for arranging items in a row or column."
  },
  {
    category: "HTML",
    question: "Which HTML element creates a hyperlink?",
    options: ["<link>", "<href>", "<a>", "<url>"],
    answer: 2,
    explanation: "The <a> (anchor) element creates a hyperlink, usually with an href attribute."
  },
  {
    category: "JAVASCRIPT",
    question: "Which operator checks both value and type equality in JavaScript?",
    options: ["=", "==", "===", "!="],
    answer: 2,
    explanation: "The strict equality operator === compares without converting operand types."
  },
  {
    category: "RESPONSIVE DESIGN",
    question: "Which HTML tag helps a page scale correctly on mobile screens?",
    options: ["<mobile>", "<meta name=\"viewport\">", "<scale>", "<responsive>"],
    answer: 1,
    explanation: "The viewport meta tag tells the browser how to set the page's dimensions and scaling."
  },
  {
    category: "WEB BASICS",
    question: "Which HTTP status code usually means a page was not found?",
    options: ["200", "301", "403", "404"],
    answer: 3,
    explanation: "HTTP 404 indicates that the requested resource could not be found."
  }
];

const intro = document.getElementById("intro");
const quizPanel = document.getElementById("quizPanel");
const resultPanel = document.getElementById("resultPanel");
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const questionText = document.getElementById("questionText");
const questionCategory = document.getElementById("questionCategory");
const optionsList = document.getElementById("optionsList");
const currentNumber = document.getElementById("currentNumber");
const totalNumber = document.getElementById("totalNumber");
const progressFill = document.getElementById("progressFill");
const progressTrack = document.getElementById("progressTrack");
const answeredCount = document.getElementById("answeredCount");

let currentIndex = 0;
let userAnswers = Array(questions.length).fill(null);

totalNumber.textContent = String(questions.length).padStart(2, "0");

function startQuiz() {
  currentIndex = 0;
  userAnswers = Array(questions.length).fill(null);
  intro.classList.add("hidden");
  resultPanel.classList.add("hidden");
  quizPanel.classList.remove("hidden");
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const question = questions[currentIndex];
  currentNumber.textContent = String(currentIndex + 1).padStart(2, "0");
  questionCategory.textContent = question.category;
  questionText.textContent = question.question;
  optionsList.innerHTML = "";

  question.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option" + (userAnswers[currentIndex] === index ? " selected" : "");
    button.setAttribute("aria-pressed", String(userAnswers[currentIndex] === index));

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.className = "option-text";
    text.textContent = optionText;

    const check = document.createElement("span");
    check.className = "option-check";
    check.textContent = "✓";
    check.setAttribute("aria-hidden", "true");

    button.append(letter, text, check);
    button.addEventListener("click", () => {
      userAnswers[currentIndex] = index;
      renderQuestion();
    });
    optionsList.appendChild(button);
  });

  const progress = ((currentIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
  progressTrack.setAttribute("aria-valuemax", String(questions.length));
  progressTrack.setAttribute("aria-valuenow", String(currentIndex + 1));
  answeredCount.textContent = `${userAnswers.filter(answer => answer !== null).length} of ${questions.length} answered`;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = userAnswers[currentIndex] === null;
  nextBtn.innerHTML = currentIndex === questions.length - 1
    ? 'See results <span aria-hidden="true">→</span>'
    : 'Next question <span aria-hidden="true">→</span>';
}

function goNext() {
  if (userAnswers[currentIndex] === null) return;
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResults();
  }
}

function goPrevious() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

function showResults() {
  const correct = questions.reduce((total, question, index) =>
    total + (userAnswers[index] === question.answer ? 1 : 0), 0);
  const answered = userAnswers.filter(answer => answer !== null).length;
  const wrong = answered - correct;
  const unanswered = questions.length - answered;
  const percentage = Math.round((correct / questions.length) * 100);

  quizPanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
  document.getElementById("scorePercent").textContent = `${percentage}%`;
  document.getElementById("correctCount").textContent = correct;
  document.getElementById("wrongCount").textContent = wrong;
  document.getElementById("unansweredCount").textContent = unanswered;
  document.getElementById("scoreRing").style.background =
    `conic-gradient(var(--primary) ${percentage * 3.6}deg, #e9e8f7 ${percentage * 3.6}deg)`;

  const resultTitle = document.getElementById("resultTitle");
  const resultCopy = document.getElementById("resultCopy");
  const resultIcon = document.getElementById("resultIcon");

  if (percentage >= 80) {
    resultTitle.textContent = "Excellent work!";
    resultCopy.textContent = "You have a strong understanding of these web development basics. Keep it up!";
    resultIcon.textContent = "✦";
  } else if (percentage >= 50) {
    resultTitle.textContent = "Good effort!";
    resultCopy.textContent = "You're making progress. Review the answers below and try again to improve your score.";
    resultIcon.textContent = "↗";
  } else {
    resultTitle.textContent = "Keep learning!";
    resultCopy.textContent = "Every attempt helps you improve. Review the explanations and give the quiz another try.";
    resultIcon.textContent = "✎";
  }

  document.getElementById("reviewSummary").textContent = `${questions.length} questions`;
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";

  questions.forEach((question, index) => {
    const selected = userAnswers[index];
    const isCorrect = selected === question.answer;
    const item = document.createElement("article");
    item.className = "review-item " + (selected === null ? "review-unanswered" : isCorrect ? "review-correct" : "review-wrong");

    const title = document.createElement("p");
    title.className = "review-question";
    title.textContent = `${index + 1}. ${question.question}`;

    const yourAnswer = document.createElement("p");
    yourAnswer.className = "review-answer";
    yourAnswer.textContent = `Your answer: ${selected === null ? "Not answered" : question.options[selected]}`;

    const correctAnswer = document.createElement("p");
    correctAnswer.className = "review-correct-answer";
    const correctLabel = document.createElement("strong");
    correctLabel.textContent = `Correct answer: ${question.options[question.answer]}`;
    correctAnswer.appendChild(correctLabel);

    const explanation = document.createElement("p");
    explanation.className = "review-answer";
    explanation.textContent = question.explanation;

    item.append(title, yourAnswer, correctAnswer, explanation);
    reviewList.appendChild(item);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

startBtn.addEventListener("click", startQuiz);
prevBtn.addEventListener("click", goPrevious);
nextBtn.addEventListener("click", goNext);
restartBtn.addEventListener("click", startQuiz);
