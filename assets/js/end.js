
const userName = document.querySelector('#userName');
const saveButton = document.querySelector('#saveButton');
const recentScore =localStorage.getItem('recentScore');
const finalScore = document.querySelector('#finalScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) ||[];
const MAX_HIGH_SCORES= 5 ;

finalScore.innerText = recentScore;

userName.addEventListener("keyup",() =>{
    saveButton.disabled = !userName.value;
});

function saveScore (e) {
    e.preventDefault();

    const score = {
        score: recentScore,
        name: userName.value
    };

    highScores.push(score);
    highScores.sort((a,b) => {
        return b.score - a.score;
    });
    highScores.splice(5);

    localStorage.setItem('highScores',JSON.stringify(highScores));
    window.location.assign('/Quiz-App/index.html');
};

 
