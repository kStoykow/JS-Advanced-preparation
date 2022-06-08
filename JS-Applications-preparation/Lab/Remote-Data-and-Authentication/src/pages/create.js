import { updateAuth } from "../auth.js";

const rootElem = document.querySelector('.root');
const createElem = rootElem.querySelector('.create-recipe-page');

export function renderCreate() {
    updateAuth();
    createElem.style.display = 'block';
}