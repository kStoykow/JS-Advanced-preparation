import { changeActiveBtnStyle } from "./utilities.js";
import { router } from './router.js';
import { renderHome } from "./pages/home.js";
import { updateAuth } from "./auth.js";

const main = document.querySelector('main');
const mainNav = document.querySelector('nav');
const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');

userNav.style.display = 'inline';
guestNav.style.display = 'inline';

updateAuth();
renderHome();

document.querySelector('nav').addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.nodeName == 'A') {
        const url = new URL(e.target.href);
        // updateAuth();

        router(url.pathname);
        changeActiveBtnStyle(mainNav, e.target);
    }
});