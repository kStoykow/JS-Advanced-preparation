import { login } from "../api.js";
import { updateAuth } from "../auth.js";

const rootElem = document.querySelector('.root');
const loginElem = rootElem.querySelector('.login-page');
const formElem = loginElem.querySelector('.login-page form');

formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    login(loginData.email, loginData.password);
});


export function renderLogin() {
    loginElem.style.display = 'block';
}