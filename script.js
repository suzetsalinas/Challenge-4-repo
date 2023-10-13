// data used for each question's card
const quizData = [
    {
      question: 'Commonly used data types DO NOT include: ',
      options: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      question: 'The condition in an if/else statement is enclosed with ____.',
      options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
      answer: 'parenthesis',
    },
    {
      question: 'Arrays in JavaScript can be used to store ___.',
      options: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
      answer: 'all of the above',
    },
    {
      question: 'String values must be enclosed with ___ when being assigned to variables.',
      options: ['commas', 'curly brackets', 'quotes', 'paranthesis'],
      answer: 'quotes',
    },
    {
      question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
      options: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
      answer: 'console.log',
    }
    
  ];

// grabbing ID elements from the document and storing them in constants
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const retestButton = document.getElementById('retest');
const showScoresButton = document.getElementById('showScore');
const timerElement = document.getElementById('timer-value');

// initializing quiz
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let timer;
let timeLeft = 60;


// Fx used to show each question and its answer choices, calls timer Fx
function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  

  for (let i = 0; i < questionData.options.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    

    const optionText = document.createTextNode(questionData.options[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);

  startTimer();
}

// Fx for timer purposes 
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      timeLeft = 0;
      displayResult();
    } else {
      timerElement.textContent = timeLeft;
      timeLeft--;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  stopTimer();
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retestButton.style.display = 'inline-block';
  showScoresButton.style.display = 'none';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  startTimer();
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retestButton.style.display = 'none';
  showScoresButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showScores() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retestButton.style.display = 'inline-block';
  showScoresButton.style.display = 'none';

}



submitButton.addEventListener('click', checkAnswer);
retestButton.addEventListener('click', retryQuiz);
showScoresButton.addEventListener('click', showScores);

displayQuestion();