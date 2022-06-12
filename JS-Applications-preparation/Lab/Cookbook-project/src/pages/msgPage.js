import { hideContent } from "../router.js";
import { changeActiveBtnStyle } from "../utilities.js";
import { renderHome } from "./home.js";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";


const rootElem = document.querySelector('.root');
const msgPage = rootElem.querySelector('.msg');
const mainNav = document.querySelector('nav');

const redirectTo = {
    login: renderLogin,
    register: renderRegister
}

function redirect(path) {
    changeActiveBtnStyle(mainNav, document.querySelector(`nav a[href="/${path}"]`));
    return path == undefined ? renderHome() : redirectTo[path]();
}

export function renderMessage(msg, redirectPath) {
    msgPage.style.display = 'block';

    if (msg) {
        msgPage.textContent = msg;

        setTimeout(() => {
            msgPage.style.display = 'none';
            hideContent();
            redirect(redirectPath);
        }, 2000);

    } else {
        msgPage.textContent = 'Error';
        setTimeout(() => {
            msgPage.style.display = 'none';
            hideContent();
            redirect(redirectPath);
        }, 2000);
    }
}