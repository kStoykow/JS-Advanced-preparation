import { changeActiveBtnStyle } from "./utilities.js";
import { router } from './router.js';
import { renderHome } from "./pages/home.js";
import { updateAuth } from "./auth.js";

const mainNav = document.querySelector('nav');

updateAuth();
renderHome();

mainNav.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.nodeName == 'A') {
        const url = new URL(e.target.href);

        router(url.pathname);
        changeActiveBtnStyle(mainNav, e.target);
    }
});