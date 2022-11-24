const STATE = {
    WAITING: 1,
    SELECTED: 2
}

let gameState = STATE.WAITING;

function startGame() {
    console.log('start game');
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
    growUpBalls();
    genSmallBalls();
}

function handleCellClick(event, cell) {
    console.log('!!! click', event, cell.type);
    if ((gameState === STATE.SELECTED) 
        && (cell.type === TYPES.NONE || cell.type === TYPES.SMALL_BALL) && cell.selected) {
        moveBallTo(selectedBall, cell.x, cell.y);
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