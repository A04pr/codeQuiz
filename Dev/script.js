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
    const quizContainer = $("#questions");
    const answerBtn = $("#answerBtn");
    const resultContainer = $("#results");

    function buildQuiz() {
        quizData.forEach((question, index) => {
            const questionHTML = `
                <div class="mb-3">
                    <h5>${index + 1}. ${question.question}</h5>
                    ${buildAnswers(question.options, index)}
                </div>
            `;
            quizContainer.append(questionHTML);
        });
    }
    
    function buildAnswers(options, questionIndex) {
        return options.map((option, index) => {
            return `<div class="form-check">
                        <input class="form-check-input" type="radio" name="q${questionIndex}" value="${option}">
                        <label class="form-check-label">${option}</label>
                    </div>`;
        }).join('');
    }

    function showScore() {
        const userResponse = collectResponses();
        let score = 0;

        quizData.forEach((question, index) => {
            if (question.correctAnswer === userResponse[index]) {
                score++;
            }
        });

        const resultHTML = `<p>Your score: ${score} out of ${quizData.length}</p>`;
        resultContainer.html(resultHTML);
    }

    function collectResponses() {
        const userResponse = [];

        quizData.forEach((question, index) => {
            const selectedOption = $(`input[name='q${index}']:checked`).val();
            userResponse.push(selectedOption);
        });

        return userResponse;
    }

    answerBtn.on("click", function () {
        showScore();
    });

    buildQuiz();
});