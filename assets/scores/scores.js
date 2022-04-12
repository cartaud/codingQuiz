var scoreList = document.querySelector('#scoreList');
let backBtn = document.querySelector('#back');
let clearBtn = document.querySelector('#clear')

function renderScores(scoreData) {
    for (let i=0; i<scoreData.length;i++) { //loops for amount of data entries in storedData
        var score = scoreData[i].score; //assigns score and initial data value to var
        var initial = scoreData[i].initial;
        var list = document.createElement('p')
        list.textContent = `${i+1}.${initial} - ${score}`; //creates list displaying each score and initial  
        scoreList.append(list);
    }
}

function init() {
    var scoreData = JSON.parse(localStorage.getItem('scoreData')); //retrieves stored data from local
    renderScores(scoreData);
}

backBtn.addEventListener('click', function() { //sends user back to quiz page
    window.open('https://cartaud.github.io/codingQuiz/', '_self');
})

clearBtn.addEventListener('click', function() { //clears local storage and scoreboard list
    localStorage.clear();
    scoreList.innerHTML = '';
})

init() //initiates 
