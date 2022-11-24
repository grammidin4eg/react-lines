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
const CELL_COUNT = 10;

/*модель*/
let model;
function createModel() {
    clearRootElement();
    model = []
    for (let x = 0; x < CELL_COUNT; x++) {
        const row = [];
        for (let y = 0; y < CELL_COUNT; y++) {
            row.push({
                x,
                y,
                color: DEFAULT_COLOR,
                type: DEFAULT_TYPE,
                selected: false,
                render: createCell(getClickHandler(x, y))
            })
        }
        model.push(row);
    }
    console.log('create model', model);
}

function getClickHandler(x, y) {
    return (event) => {
        handleCellClick(event, model[x][y])
    };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    return all_colors[getRandomInt(0, all_colors.length)];
}

function getRandomPlace() {
    const randX = getRandomInt(0, CELL_COUNT);
    const randY = getRandomInt(0, CELL_COUNT);
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

function selectCell(cell, selected = true) {
    cell.selected = selected;
    renderCell(cell);
}

function selectCellXY(x, y, selected = true) {
    selectCell(model[x][y]);
}

function forEach(func) {
    model.forEach(row => row.forEach(cell => func(cell)));
}

function growUpBalls() {
    forEach((cell) => {
        if (cell.type === TYPES.SMALL_BALL) {
            cell.type = TYPES.BALL;
            renderCell(cell);
        }
    });
}

function cloneCell(cell1, cell2) {
    console.log('clone', cell1, cell2);
    cell1.color = cell2.color;
    cell1.type = cell2.type;
    cell1.selected = cell2.selected;
    renderCell(cell1);
}

function clearCell(cell) {
    cell.color = DEFAULT_COLOR;
    cell.type = DEFAULT_TYPE;
    cell.selected = false;
    renderCell(cell);
}

function moveBallTo(cell, x, y) {
    cloneCell(model[x][y], cell);
    clearCell(cell);
}

function renderCell(cell) {
    cell.render(cell.type,  cell.color, cell.selected)
}

function clearSelected() {
    forEach((cell) => {
        if (cell.selected) {
            cell.selected = false;
            renderCell(cell);
        }
    });
}

function selectPaths(cell, dX, dY) {
    const x = cell.x + dX;
    const y = cell.y + dY;
    console.log('selectPaths', cell, dX, dY)
    if (x < CELL_COUNT && x >= 0 && y >= 0 && y < CELL_COUNT 
        && (model[x][y].type === TYPES.NONE || model[x][y].type === TYPES.SMALL_BALL) 
        && !model[x][y].selected) {
        selectCellXY(x, y);
        selectPaths(model[x][y], dX, dY);
        selectAllPaths(model[x][y])
    }
}

function selectAllPaths(cell) {
    selectPaths(cell, 1, 0);
    selectPaths(cell, -1, 0);
    selectPaths(cell, 0, 1);
    selectPaths(cell, 0, -1);
}