let timer = document.querySelector("#time");
let start = document.querySelector(".one")
let startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startingQuiz);
let container = document.querySelector('#container')
let question = document.createElement('div');
let options = document.createElement('div');


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

function startingQuiz() {
    remove()
    countDown()
    container.append(question);
    container.append(options);
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
        if (questionX >= questions.length ) {
            endQuiz()
        }
        else if (this.attributes[1].value == 'true') {
            console.log('u right');
            showQuestion();
        }
        else {
            console.log('u wrong');
            showQuestion();
        }
    }
}

function endQuiz() {
    remove();
    console.log('you finished!')
}


function remove() {
    let child = container.lastElementChild;
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
}

function countDown() {
    let time = 75;
    timer.textContent = time;
    let timeInterval = setInterval(function() {
    time--;
    timer.textContent = time; 
    
    if (time == 0) {
        timer.textContent = time;
        clearInterval(timeInterval);
       
    }

    }, 1000)
}