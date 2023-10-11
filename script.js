// will each question be in a card?
// 1. need a landing page with a start button for user to click on and trigger the first question
// need an event listener for the start button
// need a link at the top left to show stored scores
// need a timer at the top right

// 2. display first question, answer choices should be in bubbles, color changes with hover
// user clicks on answer choice, if correct, continue with questions; if incorrect, decrease time by x increment, 

// 3. continue to next question. show at bottom if user was correct/incorrect



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

  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  // retry will be used to loop back quiz and start over
  const retestButton = document.getElementById('retest');
  // showAnswer can be used to store score?
  const showScoresButton = document.getElementById('showScore');

  let currentQuestion = 0;
  let score = 0;
  // TODO: GET RID OF THIS ARRAY
  let incorrectAnswers = [];
// TODO: GET RID OF SHUFFLEARRAY FX
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
// TODO ADD FX TO SHOW STARTING CARD/PAGE BEFORE BEGGINNING QUIZ, FIX displayQuestion call 
// at end of program to start with this new fx, ensure it cascades thru all other fx's

  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
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
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retestButton.style.display = 'inline-block';
    showScoresButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
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
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }



submitButton.addEventListener('click', checkAnswer);
retestButton.addEventListener('click', retryQuiz);
// showScoreButton can be used to show saved scores
// TODO: FIGURE OUT HOW TO SAVE SCORES
showScoresButton.addEventListener('click', showScores);

displayQuestion();