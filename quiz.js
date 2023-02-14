const question = document.querySelector('#questions');
const answers = Array.from(document.querySelectorAll('#answer'));
const progress = document.querySelector('#progress');
const IQ = document.querySelector('#IQ');
const status100 = document.querySelector('#status100');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = 
[
    {
    question:'What do cows drink?',
    choice1: 'Milk',
    choice2: 'Water',
    choice3: 'Juice',
    choice4: 'Grass',
    answer: 2, 
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
        question:'What is the Super Bowl ',
        choice: 'NFL',
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
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => 0
{
            questionCounter = 0
            score = 0
            availableQuestions = [...questions]
            getNewQuestion ()
}

getNewQuestion = () => 
{
    if(availableQuestions.lenght === 0 || questionCounter > MAX_QUESTIONS) 
    {localStorage.setItem('mostRecentScore', score)
return window.location.assign('/finish.html')}

    questionCounter++
    progress.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    status100.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    questions.innerText = currentQuestion.question
    choices.foreach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.foreach(choice => {
    choice.addEventListener('click', e => {
        if(acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset ['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correctans' : 'incorrectans'

        if (classToApply ==='correctans') {incrementScore(SCORE_POINTS)}
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (()=> 
            {selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()}, 1000
            )
    })
})