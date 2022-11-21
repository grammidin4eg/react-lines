function startGame() {
    console.log('start game');
    createModel();
    for (let i = 0; i<5; i++) {
        const place = getRandomPlace();
        putBallTo(place.x, place.y);
    }
    genSmallBalls();
}

function genSmallBalls() {
    for (let i = 0; i<3; i++) {
        const place = getRandomPlace();
        putSmallBallTo(place.x, place.y);
    }
}

createModel();