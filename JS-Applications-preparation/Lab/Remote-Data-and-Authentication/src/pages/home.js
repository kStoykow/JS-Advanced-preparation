const baseElem = document.querySelector('.root');
const homeElem = baseElem.querySelector('.home');

export function renderHome() {
    homeElem.style.display = 'block';
}