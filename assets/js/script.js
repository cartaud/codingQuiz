//targeting all html elements that I will need
let timer = document.querySelector("#time");
let startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startingQuiz);
let container = document.querySelector('#container')
let question = document.createElement('div');
let options = document.createElement('div');
let message = document.createElement('div');
message.setAttribute('id', 'message');
let messageP = document.createElement('p');
let hr = document.createElement('hr');
let msgContainer = document.querySelector('#msgContainer');

question.classList.add('question');
options.classList.add('options');

//array of all quiz questions and the different options and their value
let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {option: "1. strings", value: false},
            {option: "2. booleans", value: false},
            {option: "3. alerts", value: true},
            {option: "4. numbers", value: false}
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: [
            {option: "1. quotes", value: false},
            {option: "2. curly brackets", value: false},
            {option: "3. parentheses", value: true},
            {option: "4. square brackets", value: false}
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: [
            {option: "1. numbers and strings", value: false},
            {option: "2. other arrays", value: false},
            {option: "3. booleans", value: false},
            {option: "4. all of the above", value: true}
        ]
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            {option: "1. commas", value: false},
            {option: "2. curly brackets", value: false},
            {option: "3. quotes", value: true},
            {option: "4. parentheses", value: false}
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            {option: "1. JavaScript", value: false},
            {option: "2. terminal / bash", value: false},
            {option: "3. for loops", value: false},
            {option: "4. console log", value: true}
        ]
    },
]
//initializing variables
let questionX = 0;
let time = 75;
let correct = 0;

//when button is pressed, the timer starts and the required html elements get appended to container
function startingQuiz() {
    container.innerHTML = '';
    countDown();
    container.append(question);
    container.append(options);
    msgContainer.append(message);
    message.append(hr);
    message.append(messageP);
    showQuestion();
}
//neatly display each question one at a time until user chooses an answer
function showQuestion() {
    
    options.innerHTML = '';
    question.innerHTML = questions[questionX].question;
    for (let i=0;i<4;i++) {
        var btn = document.createElement('button');
        options.append(btn);
        btn.classList.add('answer');
        btn.setAttribute('data-value', questions[questionX].answers[i].value)
        btn.textContent = questions[questionX].answers[i].option;
        btn.addEventListener('click', next)
    }
    //when user chooses an answer, this function determines if that value is true or false (right or wrong)
    function next() {
        questionX++ //keeps track of current question number
        let timeMsg = 2;
        if (this.attributes[1].value == 'true') { //if user selects the right answer, this runs
            correct = correct + 5; //increases user score by 5 when they get question right
            message.style.display = 'block';
            messageP.textContent = 'Correct!'; 
            let timeMsgInterval = setInterval(function() { //displays "Correct!" on screen for two seconds"
                timeMsg--;
                if (timeMsg == 0 ) {
                    clearInterval(timeMsgInterval);
                    messageP.textContent = '';
                    message.style.display = 'none';
                }
            }, 1000)
            if (questionX >= questions.length ) { //if user answered the last question, endQuiz function will run
                endQuiz()
            }
            else { //if quiz is not over, display the next question
                showQuestion();
            }
        }
        else { //if user chooses the wrong answer, this will run
            messageP.textContent = 'Wrong!';
            time = time - 10; //subtract 10 seconds from timer when user get question wrong
            message.style.display = 'block';
             
            let timeMsgInterval = setInterval(function() { //displays "Wrong!" on screen for two seconds"
                timeMsg--;
                if (timeMsg == 0 ) {
                    clearInterval(timeMsgInterval);
                    messageP.textContent = '';
                    message.style.display = 'none';
                }
            }, 1000)
            if (questionX >= questions.length ) {
                endQuiz()
            }
            else {
                showQuestion();
            }
        }
    }
}
//stores array of objects that contains user score and initials for each round
var scoreData = JSON.parse(localStorage.getItem('scoreData')) || []; 
function endQuiz() { //when quiz is over, this will run
    let score = time + correct; //calculates user score based off of remaining time and amount they got right
    container.innerHTML = `<h2 style='font-size: 24px'>All done!</h2><p style='text-align: left;'>your final score is ${score}.</p><form>Enter initials:<input id="initialInput" type='text' maxLength='3'><button id='submit'>Submit</button>`;
    document.querySelector('#submit').addEventListener("click", function(event) {
        event.preventDefault();
        let initial = document.querySelector('#initialInput').value.toUpperCase();
        scoreData[scoreData.length] = {score, initial} //creates new entry in scoreData for this current round
        scoreData.sort(function(a,b) {return a.score - b.score;}).reverse(); //sorts array from highest score to lowest
        localStorage.setItem('scoreData', JSON.stringify(scoreData)); //stores the sorted array in local
        window.open('https://cartaud.github.io/codingQuiz/assets/scores/scores.html', '_self'); //opens up scoreboard page
    })
}

function countDown() { //Timer for the quiz
    timer.textContent = time;
    let timeInterval = setInterval(function() {
    time--;
    timer.textContent = time; 
    if (questionX >= questions.length ) { //if last question is answered, stop timer
        clearInterval(timeInterval);
    }
    else if (time == 0) { //if timer gets to zero, stop timer
        timer.textContent = time;
        clearInterval(timeInterval);
    }
    }, 1000)
}