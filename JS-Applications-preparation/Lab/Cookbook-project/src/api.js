import * as req from "./services.js"
import { renderError } from "./pages/404.js";
import { renderHome } from "./pages/home.js";
import { updateAuth, getToken } from "./auth.js";
import { createInitRecipeCards, changeActiveBtnStyle } from './utilities.js';

const baseUrl = 'http://localhost:3030';
const recipesUrl = `${baseUrl}/data/recipes`;
const guestRecipes = `${baseUrl}/jsonstore/cookbook/recipes`;
const loginUrl = `${baseUrl}/users/login`;
const logoutUrl = `${baseUrl}/users/logout`;
const registerUrl = `${baseUrl}/users/register`;
const rootElem = document.querySelector('.root');
const mainNav = document.querySelector('nav');
const errorPage = rootElem.querySelector('.error');


export const loadRecipes = () => {
    let token = getToken();
    if (!token) {
        return req.get(guestRecipes)
            .then(data => Object.values(data))
            .then(recipes => recipes.forEach(e => rootElem.appendChild(createInitRecipeCards(e))))
            .catch(e => console.log(e));
    }
    return req.get(recipesUrl)
        .then(data => Object.values(data))
        .then(recipes => recipes.forEach(e => rootElem.appendChild(createInitRecipeCards(e))))
        .catch(e => console.log(e));
}

export const getRecipeById = (id) =>
    fetch(`${recipesUrl}/${id}`)
        .catch(err => console.log(err));


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
        .catch(e => renderError(e.message, 'login'));


export let logout = () =>
    req.get(logoutUrl)
        .then(res => {
            if (res.ok) {
                errorPage.style.display = 'block';
                errorPage.textContent = 'Successfully Logged out';

                localStorage.removeItem('user');
                updateAuth();

                setTimeout(() => {
                    errorPage.style.display = 'none';
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

        })
        .catch(e => renderError(e.message, 'register'));
}

export const createNewRecipe = (data) => req.post(recipesUrl, data).then(renderHome());
