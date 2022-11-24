const root = document.getElementById('root');

function clearRootElement() {
    root.innerHTML = '';
}

function createCell(clickHandler) {
    const newCell = document.createElement('div');
    setClasses(newCell);
    root.appendChild(newCell);
    // console.log('createCell', newCell, root)
    newCell.addEventListener('click', clickHandler);
    return (type, color, selected) => {
        setClasses(newCell, type, color, selected);
    };
}

function setClasses(element, type=DEFAULT_TYPE, color=DEFAULT_COLOR, selected=false) {
    element.className = `cell type-${type} color-${color} ${selected ? 'selected' : ''}`;
}