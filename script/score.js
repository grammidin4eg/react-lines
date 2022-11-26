const scoreElement = document.getElementById('score');
let scoreValue = 0;


function renderScore() {
    scoreElement.textContent = String(scoreValue);
}

function clearScore() {
    scoreValue = 0;
    renderScore();
}

function addScore(value) {
    if (value) {
        scoreValue += value;
        renderScore();
    }
}