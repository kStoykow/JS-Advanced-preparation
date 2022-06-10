import { updateAuth } from "../auth.js";
const rootElem = document.querySelector('.root');
const registerElem = rootElem.querySelector('.register-page');

export function renderRegister() {
    registerElem.style.display = 'block';
}