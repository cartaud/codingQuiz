let timer = document.querySelector("#time");
let start = document.querySelector(".one")
let startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startingQuiz);

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

function startingQuiz() {
    document.removeChild
    countDown()
}

