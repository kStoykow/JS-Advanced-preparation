const baseElem = document.querySelector('.root');
const loginElem = baseElem.querySelector('.login-page');

export function renderLogin() {
    loginElem.style.display = 'block';
}