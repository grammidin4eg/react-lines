/*типы*/ 
const TYPES = {
    NONE: 'none',
    BALL: 'ball',
    SMALL_BALL: 'small'
};

const COLORS = {
    RED: 'red',
    GREEN: 'green',
    CYAN: 'cyan',
    YELLOW: 'yellow',
    PURPLE: 'purple'
};

const all_colors = [COLORS.RED, COLORS.GREEN, COLORS.CYAN, COLORS.YELLOW, COLORS.PURPLE];

const DEFAULT_TYPE = TYPES.NONE;
const DEFAULT_COLOR = COLORS.RED;

/*модель*/
let model;
function createModel() {
    clearRootElement();
    model = []
    for (let x = 0; x < 10; x++) {
        const row = [];
        for (let y = 0; y < 10; y++) {
            row.push({
                color: DEFAULT_COLOR,
                type: DEFAULT_TYPE,
                selected: false,
                render: createCell()
            })
        }
        model.push(row);
    }
    console.log('create model', model);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    return all_colors[getRandomInt(0, all_colors.length)];
}

function getRandomPlace() {
    const randX = getRandomInt(0, 10);
    const randY = getRandomInt(0, 10);
    console.log('random', randX, randY);
    return isEmptyCell(randX, randY) ? {x: randX, y: randY} : getRandomPlace();
}

function isEmptyCell(x, y) {
    return model[x][y].type === TYPES.NONE;
}

function putBallTo(x, y) {
    model[x][y].type = TYPES.BALL;
    model[x][y].color = getRandomColor();
    renderCell(model[x][y]);
}

function putSmallBallTo(x, y) {
    model[x][y].type = TYPES.SMALL_BALL;
    model[x][y].color = getRandomColor();
    renderCell(model[x][y]);
}

function selectCell(x, y, selected = true) {
    model[x][y].selected = selected;
    renderCell(model[x][y]);
}

function growUpBalls() {
    model.forEach(row => {
        row.forEach(cell => {
            if (cell.type === TYPES.SMALL_BALL) {
                cell.type = TYPES.BALL;
                renderCell(cell);
            }
        });
    });
}

function renderCell(cell) {
    cell.render(cell.type,  cell.color, cell.selected)
}