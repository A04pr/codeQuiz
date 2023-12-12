const quizData = [
    {
        question: "This is an example, the answer is A.",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A"
    },
    {
        question: "This is an example, the answer is B.",
        options: ["A", "B", "C", "D"],
        correctAnswer: "B"
    },
    {
        question: "This is an example, the answer is D.",
        options: ["A", "B", "C", "D"],
        correctAnswer: "D"
    }
];

$(document).ready(function () {
    const questionsContainer = $("#questions-container");
    const nextBtn = $("#nextBtn");
    const restartBtn = $("#restartBtn");
    const startBtn = $('#startBtn');
    const resultsContainer = $("#results-container");
    const title = $("#title");
    const description = $("#description");
    const timerDisplay = $("#timer");
    const highScoreContainer = $("#highScoreContainer");
    const submitScoreBtn = $("#submitScoreBtn");
    const initialsInput = $("#initialsInput");
    let currentStep = 0;
    let timer;

    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    function buildQuiz() {
        questionsContainer.children().last().addClass('hidden');
        nextBtn.show();

        const question = quizData[currentStep];
        const questionHTML = `
            <div class="mb-3">
                <h5>${currentStep + 1}. ${question.question}</h5>
                ${buildOptions(question.options)}
            </div>
        `;
        questionsContainer.append(questionHTML);

        if (currentStep === 0) {
            startTimer();
        }
    }

    function subtractTime() {
        let currentQuestion = quizData[currentStep];
        let timePenalty = 7;
    
        if (currentQuestion && collectUserAnswers()[currentStep] !== currentQuestion.correctAnswer) {
            let currentTime = parseInt(timerDisplay.text().replace("Time: ", ""), 10);
            let newTime = Math.max(0, currentTime - timePenalty);
            timerDisplay.text(`Time: ${newTime}s`);
        }
    }
    

    function buildOptions(options) {
        return options.map((option, index) => {
            return `<div class="form-check">
                        <input class="form-check-input" type="radio" name="q${currentStep}" value="${option}">
                        <label class="form-check-label">${option}</label>
                    </div>`;
        }).join('');
    }

    function showResult() {
        questionsContainer.children().last().addClass('hidden');
        nextBtn.hide();
        const userAnswers = collectUserAnswers();
        let score = 0;

        quizData.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                score++;
            }
        });

        restartBtn.show();

        const resultHTML = `<h5>Thanks for taking the quiz! Your score is: ${score} out of ${quizData.length}</h5>`;
        resultsContainer.html(resultHTML);
        displayHighScores();
        stopTimer();
    }

    function collectUserAnswers() {
        const userAnswers = [];

        for (let i = 0; i < quizData.length; i++) {
            const selectedOption = $(`input[name='q${i}']:checked`).val();
            userAnswers.push(selectedOption);
        }

        return userAnswers;
    }

    function startTimer() {
        let timeLeft = parseInt(timerDisplay.text().replace("Time: ", ""), 10) || 30;
    
        timer = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft--;
                timerDisplay.show();
                timerDisplay.text(`Time: ${timeLeft}s`);
            } else {
                showResult();
                stopTimer();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timerDisplay.text(``);
    }

    function displayHighScores() {
        highScoreContainer.show();
        highScoreContainer.empty();
        submitScoreBtn.show();
        initialsInput.show();

        const sortedHighScores = highScores.sort((a, b) => b.score - a.score);

        for (let i = 0; i < Math.min(sortedHighScores.length, 5); i++) {
            const highScore = sortedHighScores[i];
            const highScoreHTML = `<p>${highScore.initials}: ${highScore.score}</p>`;
            highScoreContainer.append(highScoreHTML);
        }
    }

    function saveHighScore(initials, score) {
        const newHighScore = { initials, score };
        highScores.push(newHighScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    submitScoreBtn.on("click", function () {
        const initials = initialsInput.val().toUpperCase();
        const score = calculateScore();

        if (initials && score >= 0) {
            saveHighScore(initials, score);
            displayHighScores();
            highScoreContainer.show();
            submitScoreBtn.hide();
            initialsInput.hide();
        }
    });

    function calculateScore() {
        const userAnswers = collectUserAnswers();
        let score = 0;

        quizData.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                score++;
            }
        });

        return score;
    }


    nextBtn.on("click", function () {
        if (currentStep < quizData.length - 1) {
            subtractTime();
            clearInterval(timer);
            currentStep++;
            buildQuiz();
            startTimer();
        } else {
            showResult();
        }
    });

    startBtn.on("click", function () {
        startBtn.hide();
        title.hide();
        description.hide();
        buildQuiz();
    });

    restartBtn.on("click", function () {
        currentStep = 0;
        resultsContainer.empty();
        restartBtn.hide();
        startBtn.show();
        title.show();
        description.show();
        highScoreContainer.hide();
        submitScoreBtn.hide();
        initialsInput.hide();
        initialsInput.val("");
        stopTimer();
        timerDisplay.hide();
    });

});