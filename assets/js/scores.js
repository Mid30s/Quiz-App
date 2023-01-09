const highScores = JSON.parse(localStorage.getItem('highScores')) ||[]
const top5List =document.querySelector('#top5List')

top5List.innerHTML =
highScores.map (score =>{
    return `<li class="high-score">${score.name} - ${score.score} </li>`
}).join('');
