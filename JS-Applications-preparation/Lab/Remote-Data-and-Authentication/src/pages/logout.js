import { updateAuth } from "../auth.js";

const rootElem = document.querySelector('.root');
const errorPage = rootElem.querySelector('.error');

export function renderLogout() {
    localStorage.removeItem('user', 'qwe') //TO MAKE REAL
    updateAuth();

    errorPage.style.display = 'block';
    errorPage.textContent = 'Successfully Logged out';
}