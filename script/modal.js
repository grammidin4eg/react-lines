const modal = document.getElementById('modal');
const modalButton = modal.getElementsByClassName('modal__button')[0];


modalButton.addEventListener('click', () => {
    modal.className='hide-modal';
    startGame();
});