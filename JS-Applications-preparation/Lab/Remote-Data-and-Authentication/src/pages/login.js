import { updateAuth } from "../auth.js";
import { renderError } from "./404.js";
import { renderHome } from "./home.js";

const rootElem = document.querySelector('.root');
const loginElem = rootElem.querySelector('.login-page');
const formElem = loginElem.querySelector('.login-page form');

formElem.addEventListener('submit', login);

export function login(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    fetch('http://localhost:3030/users/login',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        .then(res => res.json())
        .then(res => {
            if (res.code != 403) {
                let user = { username: res.username, token: res.accessToken };
                localStorage.setItem(res.username, JSON.stringify(user));
                updateAuth(user);
                renderHome();
            } else {
                renderError('Wrong Email or Password. Please try again.');
            }
        });
}


export function renderLogin() {
    loginElem.style.display = 'block';
}