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
    const resultsContainer = $("#results-container");
    let currentStep = 0;

    function buildQuiz() {
        questionsContainer.children().last().addClass('hidden-question');

        const question = quizData[currentStep];
        const questionHTML = `
            <div class="mb-3">
                <h5>${currentStep + 1}. ${question.question}</h5>
                ${buildOptions(question.options)}
            </div>
        `;
        questionsContainer.append(questionHTML);
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
        const userAnswers = collectUserAnswers();
        let score = 0;

        quizData.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                score++;
            }
        });

        const resultHTML = `<p>Your score: ${score} out of ${quizData.length}</p>`;
        resultsContainer.html(resultHTML);
    }

    function collectUserAnswers() {
        const userAnswers = [];

        for (let i = 0; i < quizData.length; i++) {
            const selectedOption = $(`input[name='q${i}']:checked`).val();
            userAnswers.push(selectedOption);
        }

        return userAnswers;
    }

    nextBtn.on("click", function () {
        if (currentStep < quizData.length - 1) {
            currentStep++;
            buildQuiz();
        } else {
            showResult();
        }
    });

    buildQuiz();
});