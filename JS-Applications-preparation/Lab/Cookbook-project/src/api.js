import * as req from "./services.js";
import { renderMessage } from "./pages/msgPage.js";
import { renderHome } from "./pages/home.js";
import { updateAuth, getToken } from "./auth.js";
import { changeActiveBtnStyle } from './utilities.js';

const baseUrl = 'http://localhost:3030';
const loginUrl = `${baseUrl}/users/login`;
const logoutUrl = `${baseUrl}/users/logout`;
const recipesUrl = `${baseUrl}/data/recipes`;
const registerUrl = `${baseUrl}/users/register`;
const guestRecipesUrl = `${baseUrl}/jsonstore/cookbook/recipes`;
const guestRecipeDetailsUrl = `${baseUrl}/jsonstore/cookbook/details`;

const rootElem = document.querySelector('.root');
const mainNav = document.querySelector('nav');
const msgPage = rootElem.querySelector('.msg');


export const loadRecipes = () => {
    let token = getToken();
    if (!token) {
        return req.get(guestRecipesUrl)
            .then(data => Object.values(data))
            .catch(err => console.log(err));
    }
    return req.get(recipesUrl)
        .then(data => Object.values(data))
        .catch(err => console.log(err));
}

export const getRecipeById = (id) => {
    let token = getToken();
    if (!token) {
        return req.get(`${guestRecipeDetailsUrl}/${id}`)
            .catch(err => console.log(err));
    } else {
        return req.get(`${recipesUrl}/${id}`)
            .catch(err => console.log(err));
    }

}

export const login = (email, password) =>
    req.post(loginUrl, { email, password })
        .then(res => {
            if (res.code != 403) {
                let user = { username: res.username, token: res.accessToken };
                localStorage.setItem('user', JSON.stringify(user));
                updateAuth();
                renderHome();
                changeActiveBtnStyle(mainNav, document.querySelector('nav a[href="/"]'));

            } else {
                throw new Error('Wrong Email or Password. Please try again.');
            }
        })
        .catch(err => renderMessage(err.message, 'login'));


export let logout = () =>
    req.get(logoutUrl)
        .then(res => {
            if (res.ok) {
                msgPage.style.display = 'block';
                msgPage.textContent = 'Successfully Logged out';

                localStorage.removeItem('user');
                updateAuth();
                changeActiveBtnStyle(mainNav, document.querySelector(`nav a[href="/"]`));

                setTimeout(() => {
                    msgPage.style.display = 'none';
                    renderHome();
                }, 1500);
            }
        });

export const register = (email, password, repeat) => {
    return req.post(registerUrl, { email, password, repeat })
        .then(res => {
            if (res.code == 409) {
                throw new Error('Email already exists!');
            }

            if (res.password != res.repeat) {
                throw new Error('Passwords must match!');
            }

            renderMessage('Successfully registration.', 'login');
        })
        .catch(err => renderMessage(err.message, 'register'));
}

export const createNewRecipe = (data) => req.post(recipesUrl, data).then(renderHome());
