const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const timeEl = document.querySelector('#time');
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');

 
let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0;
let questionAvailable = [];
var timer;
var timerCount;
const MAX_QUESTIONS= 4 ;


let questions =[
    {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<js>",
    choice3: "<scripting>",
    choice4: "<javascript>",
    theAnswer: 1
    },
    {
    question: "What would 'Math.floor(6.3);' return?",
    choice1: "8",
    choice2: "5",
    choice3: "6",
    choice4: "15",
    theAnswer: 3
    },
    {
    question: "What does API stand for?",
    choice1: "Application Programming Interface",
    choice2: "Algorithms Plus Interaction",
    choice3: "Arrays Programmed Inline",
    choice4: "Assess Problem Indicators",
    theAnswer: 1
    },
    {
    question: "How do you retrieve data from localStorage?",
    choice1: "retrieveItem",
    choice2: "getData",
    choice3: "getItem",
    choice4: "retrieveEl",
    theAnswer: 3
    },
    {
    question: "Which of the following is a conditional statement?",
    choice1: "'if'",
    choice2: "'else if'",
    choice3: "'switch'",
    choice4: "All of the above",
    theAnswer: 4
    },
    {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    theAnswer: 4,
    }
];

function startTimer() {
    timerCount = 90;
    timer = setInterval(function() {
      timerCount--;
      timeEl.textContent = timerCount;
     
      if (timerCount <= 0) {
        clearInterval(timer);
        alert("whoops! Time is Up! You can try again")
        return window.location.assign("index.html");
      } 
    }, 1000);
  }

function startQuiz() {
    questionCounter = 0;
    questionAvailable = [...questions]
    getNewQuestion();
};

function getNewQuestion() {
    if(questionAvailable.length===0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("recentScore",timerCount);
        return window.location.assign("end.html");
    }
    
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * questionAvailable.length);
    currentQuestion = questionAvailable[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice=> {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    questionAvailable.splice(questionIndex, 1);
    acceptingAnswers = true;
};

 
choices.forEach(choice =>{
    choice.addEventListener('click',e =>{
        if(!acceptingAnswers) 
        return;

        acceptingAnswers = false;
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.theAnswer ? 'correct' :'incorrect'

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion(); 
        }, 1000);

        if (classToApply === 'incorrect') {
            timerCount -=10;     
        }
    });
});

function init() {
    startQuiz();
    startTimer();
}

init();