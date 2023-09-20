var timeLeft = $('.timeLeft')
var quiz = $("#questions")
var score = $('.score')
var finalScore = $('#finalScore')
var titleScreen = $(".titleScreen")
var startButton = $('#startButton')
var goBack = $('.goBackButton')
var clear = $('.clearHighscoreButton')
var scoreCount = 0;
var count = 25;
var timer;

var quizQuestions = [
    {
        id: "q1",
        question: "This is a question",
        answers: [
            "a",
            "b",
            "c",
            "d",
        ],
        correct: "a",
    },
    {
        id: "q2",
        question: "",
        answers: [
            "a",
            "b",
            "c",
            "d",
        ],
        correct: "c",
    },
    {
        id: "q3",
        question: "",
        answers: [
            "a",
            "b",
            "c",
            "d",
        ],
        correct: "c",
    },
    {
        id: "q4",
        question: "",
        answers: [
            "a",
            "b",
            "c",
            "d",
        ],
        correct: "d",
    },
    {
        id: "q5",
        question: "",
        answers: [
            "a",
            "b",
            "c",
            "d",
        ],
        correct: "b",
    },
];

console.log(quizQuestions[0].question);

function quizGame(){
    
}

startButton.on('click', function (event) {
    event.preventDefault();
  
    titleScreen.hide();
    quizGame
  
  });
  
