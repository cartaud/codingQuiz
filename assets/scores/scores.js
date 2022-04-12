var scoreList = document.querySelector('#scoreList');
let backBtn = document.querySelector('#back');
let clearBtn = document.querySelector('#clear')

function renderScores(scoreData) {
    console.log(scoreData)
    for (let i=0; i<scoreData.length;i++) {
        var score = scoreData[i].score;
        var initial = scoreData[i].initial;
        var list = document.createElement('p')
        list.textContent = `${i+1}.${initial} - ${score}`;
        scoreList.append(list);
    }
}

function init() {
    var scoreData = JSON.parse(localStorage.getItem('scoreData'));
    renderScores(scoreData);
}

backBtn.addEventListener('click', function() {
    window.open('/Users/chadd/UCSD-bootcamp/projects/codingQuiz/index.html', '_self');
})

clearBtn.addEventListener('click', function() {
    localStorage.clear();
    scoreList.innerHTML = '';
})

init()

const data = [ {name: 'Bob', age: 22 }, { name: 'Jason', age:33 }];
const newData = data.sort( compare('name') )
console.log(newData);
function compare(prop) {
    return function (a,b) {
    console.log(prop) // outputs -> name
    return -1; // sort stuff
  }
}