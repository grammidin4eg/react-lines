const STATE = {
    WAITING: 1,
    SELECTED: 2,
    STOP: 3
}

let gameState = STATE.STOP;

function startGame() {
    console.log('start game');
    clearScore();
    createModel();
    for (let i = 0; i<5; i++) {
        const place = getRandomPlace();
        putBallTo(place.x, place.y);
    }
    genSmallBalls();
    gameState = STATE.WAITING;
}

function genSmallBalls() {
    for (let i = 0; i<3; i++) {
        const place = getRandomPlace();
        putSmallBallTo(place.x, place.y);
    }
}

let selectedBall = null;

function nextStep() {
    gameState = STATE.WAITING;
    selectedBall = false;
    clearSelected();
    addScore(growUpBalls());
    genSmallBalls();
    if (calcFreeCells() <= 3) {
        gameState = STATE.STOP;
        showModal();
    }
}

function handleCellClick(event, cell) {
    if ((gameState === STATE.SELECTED) 
        && (cell.type === TYPES.NONE || cell.type === TYPES.SMALL_BALL) && cell.selected) {
        moveBallTo(selectedBall, cell.x, cell.y);
        addScore(checkLine(cell));
        nextStep();
    } else if (cell.type === TYPES.BALL) {
        if (cell.selected) {
            selectedBall = null;
            gameState = STATE.WAITING;
            clearSelected();
        } else {
            selectedBall = cell;
            gameState = STATE.SELECTED;
            clearSelected();
            selectCell(cell);
            selectAllPaths(cell);
        }
    }
}

createModel();