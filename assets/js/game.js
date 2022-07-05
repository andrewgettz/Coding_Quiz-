
//Variables 
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const shotClockContainer = document.getElementById('shot-clock'); 
const startBtn = document.getElementById("play-btn")

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
const startingSeconds = 20
let time = startingSeconds 

//Set Vairables 

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5
const TIMER_INCREASE  = 10

//Timer function 

setInterval(updateShotClockContainer, 1000)

 function updateShotClockContainer () {
    let seconds = time 
    if(time > 0){
    shotClockContainer.innerHTML = seconds
    time --}
    else {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('././end.html')
    }
}





//Array of Questions 
let questions = [
/* q1 Inside which HTML element do we put the JavaScript? 
a1 <script> --
a2 <scripting> 
a3 <javascript> 
a4 <js> */
{
    question: 'Inside which HTML element do we put the JavaScript? ',
    choice1: '<script>', 
    choice2: '<scripting> ',
    choice3: '<javascript> ',
    choice4: '<js>',
    answer: 1,
},
   /*
q2 Where is the correct place to insert a JavaScipt? 
2a The <head> section 
2b The <body> section --
3b Both the <head> and the <body> section are correct
2d None of Above
*/{
    question: 'Where is the correct place to insert a JavaScipt?',
    choice1: 'The <head> section ', 
    choice2: 'The <body> section',
    choice3: 'Both the <head> and the <body> section are correct',
    choice4: 'None of Above',
    answer: 2,
},
 /*q3 What is the correct syntax for referring to an external script call "xx.js"? 

3a <script scr="xx.js"> --
3b <script name="xx.js">
3c <script href="xx.js">
*/
{
    question: 'Inside which HTML element do we put the JavaScript? ',
    choice1: '<script scr="xx.js">', 
    choice2: '<script name="xx.js">',
    choice3: '<script href="xx.js">',
    choice4: 'None of the Above',
    answer: 1,
},
/*q4 How does a WHILE loop start

4a while (i <= 10; i++) --
4b while (i = 1 to 10)
4c while (i <= 10)
4d none of the above */
{
    question: 'Inside which HTML element do we put the JavaScript? ',
    choice1: 'while (i <= 10; i++)', 
    choice2: 'while (i = 1 to 10)',
    choice3: 'while (i <= 10)',
    choice4: 'None of the Above',
    answer: 1,
},

/*q5 How do you write "Hello World" in an alert box? 

5a msg("Hello World");
5b msgBox("Hello World");
5c alertBox("Hello World");
5d alert("Hello World"); --
*/
{
    question: 'Inside which HTML element do we put the JavaScript? ',
    choice1: 'msg("Hello World");', 
    choice2: 'msgBox("Hello World");',
    choice3: 'alertBox("Hello World");',
    choice4: 'alert("Hello World");',
    answer: 4,
}
]

//Start Game Function 

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    timer = 10
    getNewQuestion()
    
}

//Get new question function 

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('././end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}


//Parses out if answers are correct and applys clas, total points, and timer increase 
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            //Adds SCORE_POINTS to total score 
            incrementScore(SCORE_POINTS)
            //Add TIMER_INCREADER to total score 
            incrementTimer(TIMER_INCREASE)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})



//Increments score and timer 

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

incrementTimer = num => {
    time += num
    shotClockContainer.innerHTML = time

} 




//Calls Start Game function 

startGame()