const baseElem = document.querySelector('.root');
const createElem = baseElem.querySelector('.create-recipe-page');

export function renderCreate() {
    createElem.style.display = 'block';
}