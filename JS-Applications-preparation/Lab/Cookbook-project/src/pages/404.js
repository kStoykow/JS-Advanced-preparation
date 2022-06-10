import { renderHome } from "./home.js";
import { renderLogin } from "./login.js";

const rootElem = document.querySelector('.root');
const errorPage = rootElem.querySelector('.error');

export function renderError(msg) {

    errorPage.style.display = 'block';

    if (msg) {
        errorPage.textContent = msg;
        setTimeout(() => {
            errorPage.style.display = 'none';
            renderLogin();
        }, 2000);

    } else {
        errorPage.textContent = 'Error';
        setTimeout(() => {
            errorPage.style.display = 'none';
            renderHome();
        }, 2000);
    }
}