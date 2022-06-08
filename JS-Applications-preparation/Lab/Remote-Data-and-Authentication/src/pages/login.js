import { updateAuth } from "../auth.js";

const rootElem = document.querySelector('.root');
const loginElem = rootElem.querySelector('.login-page');

export function renderLogin() {
    loginElem.style.display = 'block';

    localStorage.setItem('user', 'qwe'); //TO MAKE REAL
    updateAuth();
}