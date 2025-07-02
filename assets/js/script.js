const quizEl = document.getElementById("quizContent");
const btnEl = document.getElementById("btn");
const quizContainer = document.getElementById("quizContent");
const startQuizCon = document.getElementById("startQuizContainer");
const quizContent = document.getElementById("quizContentContainer");






let score = 0;
let currentQuestionIndex = 0;    
let timer = 60000;

const quiz = [
    {
        question: "Choose the Rat1.",
        choices: ["Rat", "Cheese", "Toast"],
        correctChoice: "A"
    },
        {
        question: "Choose the Rat2.",
        choices: ["Rat", "Cheese", "Toast"],
        correctChoice: "A"
    },
        {
        question: "Choose the Rat3.",
        choices: ["Rat", "Cheese", "Toast"],
        correctChoice: "A"
    }
]

const quizStart = function(quiz){
    let quizDiv = document.createElement("form");
    quizDiv.className = "quiz-form";
    quizDiv.innerHTML = `<div id="quiz-container">
                            <h3>${quiz.question}</h3>
                            <div>
                                <input type="radio" id="A" name="answer" value="A" />
                                <label for="A">${quiz.choices[0]}</label>

                                <input type="radio" id="B" name="answer" value="B"  />
                                <label for="B">${quiz.choices[1]}</label>

                                <input type="radio" id="C" name="answer" value="C"  />
                                <label for="C">${quiz.choices[2]}</label>
                                <button class="btn" type="submit">Next</button>
                            </div>
                        </div>`;

    quizContent.appendChild(quizDiv);
    quizDiv.addEventListener("submit", function(e){
        quizSubmitHandler(e, quizDiv);
    });
    currentQuestionIndex++;
    console.log(currentQuestionIndex);
}

const quizSubmitHandler = function(event, quizDiv ){
    event.preventDefault();
    const selected = document.querySelector(`input[name='answer']:checked`).value;
    console.log(selected);
    quizDiv.innerHTML = "";
    if(currentQuestionIndex >= quiz.length){
        final();
    }else{
        quizStart(quiz[currentQuestionIndex]);
    }

}

const final = function(){
    alert("You win!");
}

const startQuiz = function(){
    startQuizCon.setAttribute("class", "disabled");
    quizStart(quiz[currentQuestionIndex]);
}


    //listening for a click to start the quiz with a callback function to startQuiz
btnEl.addEventListener("click", startQuiz);

