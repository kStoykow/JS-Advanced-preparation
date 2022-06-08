import { updateAuth } from "../auth.js";
const rootElem = document.querySelector('.root');
const registerElem = rootElem.querySelector('.register-page');

export function renderRegister() {
    updateAuth();
    registerElem.style.display = 'block';
}