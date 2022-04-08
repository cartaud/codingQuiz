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
        question: "Commonly used data types DO include:",
        answers: [
            {option: "1. strings", value: false},
            {option: "2. booleans", value: false},
            {option: "3. alerts", value: true},
            {option: "4. numbers", value: false}
        ]
    }
]

function startingQuiz() {
    remove()
    countDown()
    container.append(question);
    container.append(options);
    let i=0
    while (i < questions.length) {
        question.textContent = questions[i].question;
        for (let j=0;j<4;j++){
            let btn = document.createElement('button');
            options.append(btn);
            btn.classList.add('answer');
            btn.textContent = 'kill ';
        }
        
    }
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