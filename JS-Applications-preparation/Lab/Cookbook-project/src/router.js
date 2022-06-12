// import { logout } from "./api.js";
import { renderLogout } from "./pages/logout.js";
import { renderHome } from "./pages/home.js";
import { renderCreate } from "./pages/create.js";
import { renderLogin } from "./pages/login.js";
import { renderRegister } from "./pages/register.js";
import { renderMessage } from "./pages/msgPage.js";

const pages = {
    '/': renderHome,
    '/create': renderCreate,
    '/logout': renderLogout,
    '/login': renderLogin,
    '/register': renderRegister,
}

const rootElem = document.querySelector('.root');
export function hideContent() {
    [...rootElem.querySelectorAll('article')].forEach(e => e.style.display = 'none');

}
export function router(rout) {
    hideContent();

    const renderer = pages[rout] || renderMessage;
    renderer();
}