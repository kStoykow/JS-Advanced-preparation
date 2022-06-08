import { renderHome } from "./pages/home.js";
import { renderCreate } from "./pages/create.js";
import { renderLogout } from "./pages/logout.js";
import { renderLogin } from "./pages/login.js";
import { renderRegister } from "./pages/register.js";

const pages = {
    '/': renderHome,
    '/create': renderCreate,
    '/logout': renderLogout,
    '/login': renderLogin,
    '/register': renderRegister,
}
const errorPage = document.querySelector('.error');
function renderError() {
    errorPage.style.display = 'block';
}

export function router(rout) {
    if (pages[rout] == undefined) {
        renderError()
    }
    pages[rout]();
}