import { renderHome } from "./home.js";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";

const rootElem = document.querySelector('.root');
const errorPage = rootElem.querySelector('.error');

const redirectTo = {
    login: renderLogin,
    register: renderRegister
}

function redirect(path) {
    return path == undefined ? renderHome() : redirectTo[path];
}

export function renderError(msg, redirectPath) {
    errorPage.style.display = 'block';

    if (msg) {
        errorPage.textContent = msg;
        redirectTo[redirectPath]
        setTimeout(() => {
            errorPage.style.display = 'none';
            redirect(redirectPath);
        }, 2000);

    } else {
        errorPage.textContent = 'Error';
        setTimeout(() => {
            errorPage.style.display = 'none';
            redirect(redirectPath);
        }, 2000);
    }
}