
const userName = document.querySelector('#userName');
const saveButton = document.querySelector('#saveButton');
const recentScore =localStorage.getItem('recentScore');
const finalScore = document.querySelector('#finalScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) ||[];
const MAX_HIGH_SCORES= 5 ;

finalScore.innerText = recentScore;

/*add eventlistener to enable the save button before type in initials*/
userName.addEventListener("keyup",() =>{
    saveButton.disabled = !userName.value;
});

/*add click eventlistener to call the function*/
saveButton.addEventListener("click", function(event){

    event.preventDefault();

    const score = {
        score: recentScore,
        name: userName.value
    };
    
    /*create new array*/
    highScores.push(score);
    /*sort top 5 high scores*/
    highScores.sort((a,b) => {
        return b.score - a.score;
    });
    highScores.splice(5);

    localStorage.setItem('highScores',JSON.stringify(highScores));
    /*return to home page*/
    window.location.assign('/Quiz-App/index.html');
});

 
