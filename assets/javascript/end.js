const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// update the final score displayed on the page
finalScore.innerText = mostRecentScore;

// add an event listener to the save score button
saveScoreBtn.addEventListener('click', function(event) {
  event.preventDefault(); // prevent the form from submitting

  // create a new score object with the username and score
  const score = {
    score: mostRecentScore,
    name: username.value
  };

  // add the new score object to the high scores array
  highScores.push(score);

  // sort the high scores array by score (highest to lowest)
  highScores.sort(function(a, b) {
    return b.score - a.score;
  });

  // only keep the top 5 high scores
  highScores.splice(5);

  // update the high scores in localStorage
  localStorage.setItem('highScores', JSON.stringify(highScores));

  // redirect to the leaderboard page
  window.location.assign('./leaderboard.html');
});

