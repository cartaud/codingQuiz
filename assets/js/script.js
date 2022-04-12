let timer = document.querySelector("#time");
let start = document.querySelector(".one")
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
let questionX = 0;
let time = 75;
let correct = 0;
// let scores = JSON.parse(localStorage.getItem('storedScores')) || [];
// let initials = JSON.parse(localStorage.getItem('storedInitials')) || [];

function startingQuiz() {
    remove()
    countDown()
    container.append(question);
    container.append(options);
    msgContainer.append(message);
    message.append(hr);
    message.append(messageP);
    showQuestion();
}

function showQuestion() {
    // question global variable for looping through 
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
    
    function next() {
        questionX++
        let timeMsg = 2;
        if (this.attributes[1].value == 'true') {
            correct = correct + 5;
            message.style.display = 'block';
            messageP.textContent = 'Correct!'; 
            let timeMsgInterval = setInterval(function() {
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
        else {
            messageP.textContent = 'Wrong!';
            time = time - 14;
            message.style.display = 'block';
             
            let timeMsgInterval = setInterval(function() {
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
var scoreData = JSON.parse(localStorage.getItem('scoreData')) || [];
console.log(scoreData)
function endQuiz() {
    let score = time + correct;
    container.innerHTML = `<h2 style='font-size: 24px'>All done!</h2><p style='text-align: left;'>your final score is ${score}.</p><form>Enter initials:<input id="initialInput" type='text' maxLength='3'><button id='submit'>Submit</button>`;
    document.querySelector('#submit').addEventListener("click", function(event) {
        event.preventDefault();
        let initial = document.querySelector('#initialInput').value.toUpperCase();
        scoreData[scoreData.length] = {score, initial}
        scoreData.sort(function(a,b) {return a.score - b.score;}).reverse();
        localStorage.setItem('scoreData', JSON.stringify(scoreData));
        window.open('./assets/scores/scores.html', '_self');
    })
}
// scores.push(score)
// initials.push(initial);
// localStorage.setItem('storedScores', JSON.stringify(scores));
// localStorage.setItem('storedInitials', JSON.stringify(initials));

function remove() {
    let child = container.lastElementChild;
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
}

function countDown() {
    timer.textContent = time;
    let timeInterval = setInterval(function() {
    time--;
    timer.textContent = time; 
    if (questionX >= questions.length ) {
        clearInterval(timeInterval);
    }
    else if (time == 0) {
        timer.textContent = time;
        clearInterval(timeInterval);
    }
    }, 1000)
}