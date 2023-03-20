// select the necessary elements from the HTML
const questionEl = document.getElementById('questions');
const quizContainer = document.getElementById('quiz');
const progressText = document.getElementById('progress');
const scoreText = document.getElementById('IQ');
const progressBarFull = document.getElementById('status100');
const choices = Array.from(document.getElementsByClassName('choices'));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// define the quiz questions
let questions = [
  {
    question:"What do cows drink?",
    choice1: "Milk",
    choice2: "Water",
    choice3: "Juice",
    choice4: "Soda",
    answer: 2
  },
  {
    question:'How many bones do babies have?',
    choice1: '300',
    choice2: '100',
    choice3: '6234',
    choice4: '2',
    answer: 1,
},

{
    question:'What is the Super Bowl',
    choice1: 'NFL',
    choice2: 'Mega cereal',
    choice3: 'Football',
    choice4: 'American basketball',
    answer: 1 ,
},

{
    question:'How many moons do Jupiter Have',
    choice1: '113',
    choice2: '1',
    choice3: '0',
    choice4: '92',
    answer: 4,
},

{
    question:'What is the currency of Poland?',
    choice1: 'Rupies',
    choice2: 'Dollar',
    choice3: 'Euro',
    choice4: 'Zloty',
    answer: 4,
},

{
    question:'What is 153 times 231?',
    choice1: '42643',
    choice2: '35523',
    choice3: '35343',
    choice4: '2413',
    answer: 3,
},
{
    question:'When was the first ever world cup?',
    choice1: '1992',
    choice2: '1890',
    choice3: '1872',
    choice4: '1930',
    answer: 4,
}

];

// define the constants for the quiz
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

// start the quiz
startQuiz();

// function to start the quiz
function startQuiz() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

// function to get a new question
function getNewQuestion() {
  // check if there are still questions available
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // save the score to localStorage
    localStorage.setItem('mostRecentScore', score);

    // go to the end screen
    return window.location.assign('./finish.html');
  }

  // increment the question counter
  questionCounter++;
  // update the progress text
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // select a random question from the available questions
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionEl.innerText = currentQuestion.question;

  // loop through the choices and update their text
  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  // remove the used question from the available questions
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}

// add an event listener to the quizContainer element
quizContainer.addEventListener('click', e => {
  if (e.target.classList.contains('choices') && acceptingAnswers) {
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    // determine if the answer is correct and update the score
    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    // add the class to show if the answer is correct or incorrect
    selectedChoice.parentElement.classList.add(classToApply);

    // delay the next question to allow the user to see if their answer was correct or incorrect
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  }
});

// function to increment the score and update the score text
function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}
