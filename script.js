const questions = [
    {
        question: "Which country has the largest population?",
        answers: [
            { text: "USA", correct: false},
            { text: "India", correct: false},
            { text: "China", correct: true},
            { text: "UK", correct: false},
        ]
    },
    {
        question: "Highest grossing anime film?",
        answers: [
            { text: "Demon Slayer: Mugen Train", correct: true},
            { text: "Pokemon: The First Movie", correct: false},
            { text: "Jujutsu Kaisen 0", correct: false},
            { text: "Spirited Away", correct: false},
        ]
    },
    {
        question: "Slowest animal in the world?",
        answers: [
            { text: "Giant Tortoise", correct: false},
            { text: "Banana slug", correct: false},
            { text: "Manatee", correct: false},
            { text: "Three toed sloth", correct: true},
        ]
    },
    {
        question: "Slowest Pokemon?",
        answers: [
            { text: "Slugma", correct: false},
            { text: "Wooper", correct: false},
            { text: "Shuckle", correct: true},
            { text: "Trapinch", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextBtn");

letcurrentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + 
    currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of 
    ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();