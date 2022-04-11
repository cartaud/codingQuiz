var scoreList = document.querySelector('#scoreList');
let backBtn = document.querySelector('#back');
let clearBtn = document.querySelector('#clear')

var scores = [];
var initials = [];


//How do I keep the previous score/initial once the new one takes its place in the local storage
//assign each one to a different variable?? or is there a method?

//How do I get the window to open on same window? 

function renderScores() {
    
    for (let i=0; i<scores.length;i++) {
        var score = scores[i];
        var initial = initials[i]
        var list = document.createElement('li')
        list.textContent = `${initial} -${score}`;
        list.setAttribute('data-index', i);
        scoreList.append(list);
    }
}

function init() {
    var storedScores = localStorage.getItem('storedScores');
    var storedInitials = JSON.parse(localStorage.getItem('storedInitials'));
    if (storedScores != null) {
        scores.push(storedScores);
        initials.push(storedInitials);
    }
    renderScores();
}

backBtn.addEventListener('click', function() {
    window.open('/Users/chadd/UCSD-bootcamp/projects/codingQuiz/index.html', '_self');
})

clearBtn.addEventListener('click', function() {
    localStorage.clear();
    scoreList.innerHTML = '';
})

init()

