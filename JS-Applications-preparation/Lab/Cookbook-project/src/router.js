import { renderHome } from "./pages/home.js";
import { renderCreate } from "./pages/create.js";
import { logout } from "./pages/logout.js";
import { renderLogin } from "./pages/login.js";
import { renderRegister } from "./pages/register.js";
import { renderError } from "./pages/404.js";

const pages = {
    '/': renderHome,
    '/create': renderCreate,
    '/logout': logout,
    '/login': renderLogin,
    '/register': renderRegister,
}

const rootElem = document.querySelector('.root');
export function hideContent() {
    [...rootElem.querySelectorAll('article')].forEach(e => e.style.display = 'none');

}
export function router(rout) {
    hideContent();

    const renderer = pages[rout] || renderError;
    renderer();
}