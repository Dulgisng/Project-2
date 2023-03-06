const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const userScore = JSON.parse(localStorage.getItem('userScore')) || {}

// Check if the user has a score to add to the leaderboard
if (Object.keys(userScore).length !== 0) {
  highScores.push(userScore)
  localStorage.setItem('highScores', JSON.stringify(highScores))
}

highScoresList.innerHTML = highScores
  .sort((a, b) => b.score - a.score)
  .map(score => {
    return `<li class="high-scores">${score.name} - ${score.score}</li>`
  }).join('')
