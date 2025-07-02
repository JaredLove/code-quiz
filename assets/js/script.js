const quizEl = document.getElementById("quizContent");
const btnEl = document.getElementById("btn");
const quizContainer = document.getElementById("quizContent");
const startQuizCon = document.getElementById("startQuizContainer");
const quizContent = document.getElementById("quizContentContainer");





    //score and question index
let score = 0;
let currentQuestionIndex = 0;
let quizDiv;

    //timer variables
let timeLeft = 5;
let intervalId;

    // array of question objects with choices and answer
const quiz = [
    {
        question: "Inside which HTML element do we put the JavaScript file?",
        choices: ["< javascript >", "< scripting >", "< js >", "< script >"],
        correctChoice: "D"
    },
        {
        question: `What is the correct syntax for referring to an external script called "abc.js"?`,
        choices: ["< script name='abc.js' >", "< script src='abc.js' >", " < script href='abc.js' >","< script url='abc.js' >"],
        correctChoice: "B"
    },
        {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["alert('Hello World')", "alertBox('Hello World')", "msg('Hello World')", "msgBox('Hello World')"],
        correctChoice: "A"
    }
]


const quizStart = function(quiz){
    quizDiv = document.createElement("form");
    quizDiv.className = "quiz-form";
    quizDiv.setAttribute("autocomplete", "off");
    quizDiv.innerHTML = `<div id="quiz-container">
                            <h3>Q${currentQuestionIndex + 1}: ${quiz.question}</h3>
                            <div class = "quizContent">
                                <input type="radio" id="A" name="answer" value="A" />
                                <label for="A">${quiz.choices[0]}</label>

                                <input type="radio" id="B" name="answer" value="B"  />
                                <label for="B">${quiz.choices[1]}</label>

                                <input type="radio" id="C" name="answer" value="C"  />
                                <label for="C">${quiz.choices[2]}</label>

                                <input type="radio" id="D" name="answer" value="D"  />
                                <label for="D">${quiz.choices[3]}</label>

                                <button class="btn" type="submit">Next</button>
                            </div>
                        </div>`;

    quizDiv.addEventListener("submit", function(e){
        quizSubmitHandler(e, quizDiv);
    });
    quizContent.appendChild(quizDiv);
}

const quizSubmitHandler = function(event, quizDiv){
    if(event){
        event.preventDefault();
    }

    const selectedRadio = quizDiv.querySelector(`input[name='answer']:checked`);
    if(!selectedRadio){
        alert("Please choose an answer");
    }

    const selected = document.querySelector(`input[name='answer']:checked`).value;
    if(selected !== quiz[currentQuestionIndex].correctChoice ){
        alert("Not the correct answer, try again!");
    }else{
        if(selected === quiz[currentQuestionIndex].correctChoice ){
            score += 1;
        }
        quizDiv.remove();
        currentQuestionIndex++;
        if(currentQuestionIndex >= quiz.length){
            clearInterval(intervalId);
            final(event);
        }else{
            quizStart(quiz[currentQuestionIndex]);
        }
    }


}

const final = function(event){
    clearInterval(intervalId);
    if(event){
        event.preventDefault();
    }
    alert(score);
    let playAgain = confirm("Would you like to play again?");
    if(playAgain){
        startQuiz();
    }else{
        startQuizCon.removeAttribute("class", "disabled");
        startQuizCon.setAttribute("class", "startQuizContainer"); 
    }
}


const startTimer = function(){
            //timer
    const timer = document.getElementById("time");
    timeLeft = 5;
    timer.innerHTML = `Time left: ${timeLeft}s`;
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        timeLeft--;
        timer.innerHTML = `Time left: ${timeLeft}s`;

        if(timeLeft <= 0){
        clearInterval(intervalId);
        quizDiv.remove();
        final();
    }
    }, 1000)
}
const startQuiz = function(){
        clearInterval(intervalId);
        startQuizCon.setAttribute("class", "disabled");
        currentQuestionIndex = 0;
        score = 0;
        startTimer();
        quizStart(quiz[currentQuestionIndex]);

}


    //listening for a click to start the quiz with a callback function to startQuiz
btnEl.addEventListener("click", startQuiz);

